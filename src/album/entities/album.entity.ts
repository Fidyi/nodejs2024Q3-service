import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Album {
  @ApiProperty({ example: 'album-uuid', description: 'Unique identifier of the album' })
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

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
