import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  duration: number;
}
