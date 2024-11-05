import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';

class UserCreateDto {
  //Data Transfer Object
  readonly id?: string;
  readonly name: string;
  readonly age: number;
}

//GET http://localhost:3000/api
@Controller('api')
export class AppController {
  @Get()
  getInfo(): { message: string } {
    return { message: `Hello From Nest` };
  }

  //GET http://localhost:3000/api/user/12/Alex

  @Get('user/:id/:name')
  getInfoAboutUser(
    @Param('id') id: string,
    @Param('name') name: string,
  ): {
    id: string;
    name: string;
  } {
    return {
      id,
      name,
    };
  }

  //GET http://localhost:3000/api/user/12?name=Oleg&age=20
  @Redirect('https://google.com')
  @Get('user/:id')
  getParamAndQuery(
    @Param('id') id: string,
    @Query('name') name: string,
    @Query('age') age: number,
  ) {
    const my_id = Number(id);
    if (isNaN(my_id))
      throw new BadRequestException('Твій ID неможливо привести до Number');
    return {
      id,
      name,
      age,
    };
  }
  //POST http://localhost:3000/api/user
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Post('user')
  createUser(@Body() body: UserCreateDto): UserCreateDto {
    return { ...body, id: Date.now().toString() };
  }
}
