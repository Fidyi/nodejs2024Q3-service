import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const added = await this.favoritesService.addTrack(id);
    if (!added) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const removed = await this.favoritesService.removeTrack(id);
    if (!removed) {
      throw new NotFoundException('Track not found in favorites');
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const added = await this.favoritesService.addAlbum(id);
    if (!added) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const removed = await this.favoritesService.removeAlbum(id);
    if (!removed) {
      throw new NotFoundException('Album not found in favorites');
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const added = await this.favoritesService.addArtist(id);
    if (!added) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const removed = await this.favoritesService.removeArtist(id);
    if (!removed) {
      throw new NotFoundException('Artist not found in favorites');
    }
  }
}
