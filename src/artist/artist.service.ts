import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  private artists = [];

  findAll() {
    return this.artists;
  }

  findById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      return null;
    }
    const updatedArtist = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  delete(id: string): boolean {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return false;

    this.artists.splice(artistIndex, 1);

    this.albumService.clearArtistId(id);

    this.trackService.clearArtistId(id);

    this.favoritesService.removeArtist(id);

    return true;
  }
}
