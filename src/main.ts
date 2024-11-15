import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//CORS
const run = async () => {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: ['https://localhost:4200'],
  // });
  await app.listen(PORT, () => console.log(`Running http://localhost:${PORT}`));
};

run();
