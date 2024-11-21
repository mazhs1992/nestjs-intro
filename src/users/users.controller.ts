import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'The number of items to return',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'The number of page',
    example: 1,
  })
  @ApiResponse({
    status: 200,
  })
  public getUsers() { // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getUsersParamDto: GetUsersParamDto,
    return this.usersService.findAll();
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('create-many')
  public async createManyUsers(@Body() createUsersDto: CreateUserDto[]) {
    return await this.usersService.createMany(createUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'You send a patch resuest to /users';
  }
}
