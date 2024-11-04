import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Patch,
  Put,
  Delete,
  Headers,
  Ip,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id/:optional?')
  //   public getUsers(@Param() params: any, @Query() query: any) {
  public getUsers(@Param('id') id: any, @Query('limit') limit: any) {
    console.log(id);
    console.log(limit);
    return `You send a get resuest to /users `;
  }

  @Post()
  public createUsers(
    @Body() body: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(body);
    console.log(ip);
    console.log(headers);

    return 'You send a post resuest to /users';
  }

  //   @Post()
  //   public createUsers(@Req() req: Request) {
  //     console.log(req.body);
  //     return 'You send a post resuest to /users';
  //   }
}
