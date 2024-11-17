import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  private tracks = [];
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll() {
    return this.tracks;
  }

  findById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return null;
    }
    const updatedTrack = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };
    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  delete(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return false;
    }
    this.tracks.splice(trackIndex, 1);
    this.favoritesService.removeTrack(id);
    return true;
  }
  clearArtistId(artistId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return { ...track, artistId: null };
      }
      return track;
    });
  }

  clearAlbumId(albumId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return { ...track, albumId: null };
      }
      return track;
    });
  }
}
