import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return value.endsWith('gmail.com');
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Неправильні дані треба такі *@gmail.com`;
  }
}
