import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Track } from '../../track/entities/track.entity';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Favorite {
  @ApiProperty({ example: 'favorite-uuid', description: 'Unique identifier of the favorite item' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User who favorited the item' })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @ApiProperty({ description: 'Track that is favorited', required: false })
  @ManyToOne(() => Track, (track) => track.id, { nullable: true, eager: true })
  track: Track;

  @ApiProperty({ description: 'Album that is favorited', required: false })
  @ManyToOne(() => Album, (album) => album.id, { nullable: true, eager: true })
  album: Album;

  @ApiProperty({ description: 'Artist that is favorited', required: false })
  @ManyToOne(() => Artist, (artist) => artist.id, { nullable: true, eager: true })
  artist: Artist;

  @CreateDateColumn({ type: 'bigint' })
  createdAt: number;

  @UpdateDateColumn({ type: 'bigint' })
  updatedAt: number;
}