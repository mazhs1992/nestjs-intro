import { Injectable } from '@nestjs/common';
import { PaginationsQueryDto } from '../dtos/paginations-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationsQueryDto,
    repository: Repository<T>,
  ) {
    const resutls = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    return resutls;
  }
}
