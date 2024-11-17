import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    return {
      artists: this.favorites.artists
        .map((id) => this.artistService.findById(id))
        .filter((artist) => artist !== undefined),
      albums: this.favorites.albums
        .map((id) => this.albumService.findById(id))
        .filter((album) => album !== undefined),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.findById(id))
        .filter((track) => track !== undefined),
    };
  }

  addTrack(id: string): boolean {
    const track = this.trackService.findById(id);
    if (!track) {
      return false;
    }
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
    return true;
  }

  removeTrack(id: string): boolean {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.tracks.splice(index, 1);
    return true;
  }

  addAlbum(id: string): boolean {
    const album = this.albumService.findById(id);
    if (!album) {
      return false;
    }
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
    return true;
  }

  removeAlbum(id: string): boolean {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.albums.splice(index, 1);
    return true;
  }

  addArtist(id: string): boolean {
    const artist = this.artistService.findById(id);
    if (!artist) {
      return false;
    }
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
    return true;
  }

  removeArtist(id: string): boolean {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favorites.artists.splice(index, 1);
    return true;
  }
}
