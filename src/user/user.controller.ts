import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';

class UserCreateDto {
  //Data Transfer Object
  readonly id?: string;
  readonly name: string;
  readonly age: number;
}

//GET http://localhost:3333/api
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getInfo(): string {
    return this.userService.getInfo();
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

  @Get('test/:id') //GET http://localhost:3333/api/test/one
  getTest(@Param('id', ParseIntPipe) id: number): string {
    return `Id: ${id}`;
  }
}
