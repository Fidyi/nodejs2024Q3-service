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
  UseGuards,
} from '@nestjs/common';

import { validate as isUuid } from 'uuid';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard('jwt'))
@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const deleted = await this.trackService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Track not found');
    }
  }
}
