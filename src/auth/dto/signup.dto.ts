import { IsString, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
