import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldPassword123',
    description: 'The current password of the user',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'newPassword456',
    description: 'The new password of the user',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
