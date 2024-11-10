import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    // check TYPEORM for configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'nestjs-blog',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
