import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { validate as isUuid } from 'uuid';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard('jwt'))
@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const updatedArtist = await this.artistService.update(id, updateArtistDto);
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const deleted = await this.artistService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Artist not found');
    }
  }
}
