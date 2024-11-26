import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Favorite {
  @ApiProperty({
    example: 'favorite-uuid',
    description: 'Unique identifier of the favorite item',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User who favorited the item' })
  @ManyToOne(() => User, (user) => user.favorites, { eager: true })
  user: User;

  @ApiProperty({ description: 'Track that is favorited', required: false })
  @ManyToOne(() => Track, (track) => track.favorites, {
    nullable: true,
    eager: true,
  })
  track: Track;

  @ApiProperty({ description: 'Album that is favorited', required: false })
  @ManyToOne(() => Album, (album) => album.favorites, {
    nullable: true,
    eager: true,
  })
  album: Album;

  @ApiProperty({ description: 'Artist that is favorited', required: false })
  @ManyToOne(() => Artist, (artist) => artist.favorites, {
    nullable: true,
    eager: true,
  })
  artist: Artist;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
