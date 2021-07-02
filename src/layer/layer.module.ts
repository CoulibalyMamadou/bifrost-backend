import { Module } from '@nestjs/common'
import { LayerService } from './layer.service'
import { LayerController } from './layer.controller'
import { DatabaseModule } from '../database/database.module'
import { layerProviders } from './layer.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [LayerController],
  providers: [LayerService, ...layerProviders],
  exports: [...layerProviders],
})
export class LayerModule {}
