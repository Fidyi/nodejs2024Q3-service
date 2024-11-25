import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class Track {
  @ApiProperty({
    example: 'track-uuid',
    description: 'Unique identifier of the track',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Track Title', description: 'Title of the track' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Artist Name', description: 'Name of the artist' })
  @Column()
  artist: string;

  @ApiProperty({ example: 'Album Name', description: 'Name of the album' })
  @Column()
  album: string;

  @ApiProperty({
    example: 300,
    description: 'Duration of the track in seconds',
  })
  @Column('int')
  duration: number;

  @ApiProperty({ example: 1, description: 'Version of the track' })
  @Column('int', { default: 1 })
  version: number;

  @OneToMany(() => Favorite, (favorite) => favorite.track)
  favorites: Favorite[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
