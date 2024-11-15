import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { AddressUserDto } from './address-user.dto';
import { Type } from 'class-transformer';
import { CustomValidator } from 'src/validators/custom.validator';

export class CreateUserDto {
  readonly id?: number;
  @IsString()
  readonly name: string;
  @IsEmail({}, { message: 'Це не email' })
  @Validate(CustomValidator)
  readonly email: string;
  @IsInt()
  readonly age: number;

  @Type(() => AddressUserDto)
  @ValidateNested()
  readonly address: AddressUserDto;

  //   @ArrayNotEmpty()
  //   @ArrayMinSize(2)
  //   @ArrayMaxSize(5)
  //   @MinLength(3, {
  //     each: true,
  //     message: 'Tag is too short. Minimal length is $value characters',
  //   })
  //   @MaxLength(50, {
  //     each: true,
  //     message: 'Tag is too long. Maximal length is $value characters',
  //   })
  //   tags: string[];
}
