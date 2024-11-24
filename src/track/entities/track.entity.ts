import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Track {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier of the track' })
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

  @ApiProperty({ example: 300, description: 'Duration of the track in seconds' })
  @Column('int')
  duration: number;

  @ApiProperty({ example: 1, description: 'Version of the track' })
  @Column('int', { default: 1 })
  version: number;

  @ApiProperty({ example: 1609459200000, description: 'Timestamp when the track was created' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ example: 1609459200000, description: 'Timestamp when the track was last updated' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
