import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsesrDto: CreateUserDto[]) {
    const newUsers = [];
    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // connect quert runner to datasource
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();
    try {
      for (const user of createUsesrDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successfull, commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if error, rollback transaction
      await queryRunner.rollbackTransaction();
      return error.message;
    } finally {
      // release connection
      await queryRunner.release();
    }

    return newUsers;
  }
}
