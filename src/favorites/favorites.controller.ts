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
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const added = this.favoritesService.addTrack(id);
    if (!added) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const removed = this.favoritesService.removeTrack(id);
    if (!removed) {
      throw new NotFoundException('Track not found in favorites');
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const added = this.favoritesService.addAlbum(id);
    if (!added) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const removed = this.favoritesService.removeAlbum(id);
    if (!removed) {
      throw new NotFoundException('Album not found in favorites');
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const added = this.favoritesService.addArtist(id);
    if (!added) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const removed = this.favoritesService.removeArtist(id);
    if (!removed) {
      throw new NotFoundException('Artist not found in favorites');
    }
  }
}
