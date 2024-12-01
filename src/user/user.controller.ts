import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard('jwt'))
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    try {
      const updatedUser = await this.userService.update(id, updatePasswordDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Old password is incorrect');
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    await this.userService.delete(id);
  }
}
