import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { validate as isUuid } from 'uuid';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = this.trackService.findById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const updatedTrack = this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const deleted = this.trackService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Track not found');
    }
  }
}
