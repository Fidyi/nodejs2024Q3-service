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
export class Artist {
  @ApiProperty({
    example: 'artist-uuid',
    description: 'Unique identifier of the artist',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Artist Name', description: 'Name of the artist' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Genre of the artist',
    description: 'Genre of the artist',
  })
  @Column()
  genre: string;

  @OneToMany(() => Favorite, (favorite) => favorite.artist)
  favorites: Favorite[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
