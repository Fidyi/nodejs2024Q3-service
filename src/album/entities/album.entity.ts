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
export class Album {
  @ApiProperty({
    example: 'album-uuid',
    description: 'Unique identifier of the album',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Album Title', description: 'Title of the album' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Artist Name', description: 'Name of the artist' })
  @Column()
  artist: string;

  @ApiProperty({ example: 2023, description: 'Release year of the album' })
  @Column('int')
  releaseYear: number;

  @OneToMany(() => Favorite, (favorite) => favorite.album)
  favorites: Favorite[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
