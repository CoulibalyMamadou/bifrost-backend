import { Model } from 'mongoose'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { LayerInterface } from './interface/layer.interface'
import { LAYER_MODEL } from '../constant/constant'
import {
  CreateLayerDto,
  LayerSearchDto,
  LayerUpdateDto,
} from './dto/create-layer.dto'

@Injectable()
export class LayerService {
  constructor(
    @Inject(LAYER_MODEL)
    private layerModel: Model<LayerInterface>,
  ) {}

  async create(createLayerDto: CreateLayerDto): Promise<LayerInterface> {
    const createdLayer = new this.layerModel(createLayerDto)
    return createdLayer.save()
  }

  async findAll(): Promise<LayerInterface[]> {
    return this.layerModel.find().exec()
  }

  async findOne(layerSearch: LayerSearchDto): Promise<LayerInterface> {
    return this.layerModel.findById(layerSearch._id).exec()
  }

  // Layer Crud
  async updateLayer(
    layerId: string,
    updateData: LayerUpdateDto,
  ): Promise<LayerInterface> {
    const layer = this.layerModel.findByIdAndUpdate(
      layerId,
      {
        $set: updateData,
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Layer update')
    return layer
  }

  // Document Crud
  async deleteLayer(layerId: string): Promise<LayerInterface> {
    const layer = this.layerModel.findByIdAndDelete(layerId)
    // const data = createdDocument.save();
    Logger.log('Layer delete')
    return layer
  }
}
