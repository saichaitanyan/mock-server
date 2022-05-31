import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerSchema } from './passenger-model';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Passenger', schema: PassengerSchema }]),
  ],
  providers: [PassengerService],
  controllers: [PassengerController],
  exports: [PassengerService],
})
export class PassengerModule {}
