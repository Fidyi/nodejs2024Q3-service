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
export class User {
  @ApiProperty({
    example: 'user-uuid',
    description: 'Unique identifier of the user',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @Column()
  password: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the user',
  })
  @Column({ unique: true })
  email: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
