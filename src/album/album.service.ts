import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
  ) {}
  private albums = [];

  findAll() {
    return this.albums;
  }

  findById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      return null;
    }
    const updatedAlbum = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  delete(id: string): boolean {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return false;

    this.albums.splice(albumIndex, 1);

    this.trackService.clearAlbumId(id);

    this.favoritesService.removeAlbum(id);

    return true;
  }

  clearArtistId(artistId: string): void {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return { ...album, artistId: null };
      }
      return album;
    });
  }
}
