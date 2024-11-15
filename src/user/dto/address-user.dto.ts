import { IsInt, IsString, Length } from 'class-validator';

export class AddressUserDto {
  @IsString()
  @Length(5, 10)
  readonly street: string;
  @IsInt()
  readonly house: number;
}
