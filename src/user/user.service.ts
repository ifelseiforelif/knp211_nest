import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getInfo(): string {
    return `Hello From Nest!`;
  }
}
