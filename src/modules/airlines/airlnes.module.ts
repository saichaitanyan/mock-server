import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirlinesSchema } from './airlines-model';
import { AirlinesController } from './airlines.controller';
import { AirlinesService } from './airlines.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Airlines', schema: AirlinesSchema }]),
  ],
  providers: [AirlinesService],
  controllers: [AirlinesController],
  exports: [AirlinesService],
})
export class AirlinesModule {}
