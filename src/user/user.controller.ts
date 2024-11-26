import { UserService } from './user.service';
import { validate as isUuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @Get()
  getAllUsers() {
    console.log('Получен запрос на получение всех пользователей');
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the user' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiBadRequestResponse({ description: 'Invalid user ID format.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been created.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the user' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, description: 'User password updated.' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or user ID format.',
  })
  @ApiForbiddenResponse({ description: 'Old password is incorrect.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userService.update(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the user' })
  @ApiNoContentResponse({ description: 'User has been deleted.' })
  @ApiBadRequestResponse({ description: 'Invalid user ID format.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    this.userService.delete(id);
  }
}
