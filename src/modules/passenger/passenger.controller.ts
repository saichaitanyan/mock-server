import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  HttpCode,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Passenger } from './passenger-model';
import { PassengerService } from './passenger.service';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) { }

  @Post('/')
  async insertAirlinesData(@Body() requestBody: Passenger) {
    Logger.log('insert passenger data');
    const response = this.passengerService.insertPassengerDetails(requestBody);
    return response;
  }

  @Get('/:id')
  async getPassengerDetailsById(@Param('id') id: string) {
    Logger.log(`fetch passenger details by id ${id}`);
    const response = this.passengerService.getPassengerDetailsById(id);
    return response;
  }
  @Get('/')
  async getAllPassengerDetails() {
    Logger.log(`fetch all passenger details`);
    const response = this.passengerService.getPassengerDetails();
    return response;
  }
  @Put('/')
  async updatePassengerDetailsById(@Body() requestBody: Passenger) {
    Logger.log('update passenger details by id');
    const response = this.passengerService.updatePassengerDetails(requestBody);
    return response;
  }
  @Delete('/:id')
  async deletePassengerDetailsById(@Param('id') id: string) {
    Logger.log(`delete passenger details by id ${id}`);
    const response = this.passengerService.deletePassenger(id);
    return response;
  }
}
