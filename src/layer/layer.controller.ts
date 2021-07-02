import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateLayerDto, LayerUpdateDto } from './dto/create-layer.dto'
import { LayerService } from './layer.service'

@Controller('layer')
export class LayerController {
  constructor(private layerService: LayerService) {}

  @Get('/')
  async getLayer() {
    return await this.layerService.findAll()
  }

  @Post('/create')
  async addLayer(@Body() createLayerDTO: CreateLayerDto) {
    Logger.warn('layer : ', JSON.stringify(createLayerDTO))
    return await this.layerService.create(createLayerDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateLayer(
    @Param('id') layerId: string,
    @Body() layerPatch: LayerUpdateDto,
  ) {
    Logger.warn('Layer field : ', JSON.stringify(layerId))
    Logger.warn('Layer patch : ', JSON.stringify(layerPatch))
    return await this.layerService.updateLayer(layerId, layerPatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteLayer(@Param('id') layerId: string) {
    Logger.warn('Layer field : ', JSON.stringify(layerId))
    return await this.layerService.deleteLayer(layerId)
  }
}
