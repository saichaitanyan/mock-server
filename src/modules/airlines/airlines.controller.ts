import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { Airlines } from './airlines-model';
import { AirlinesService } from './airlines.service';

@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) { }

  @Get('/listAll')
  async getAirlinesList() {
    Logger.log('Fetch airlines list');
    return this.airlinesService.fetchAirlinesList();
  }

  @Post('/')
  async insertAirlinesData(@Body() requestBody: Airlines) {
    Logger.log('insert airlines data');
    const response = this.airlinesService.insertAirlineDetails(requestBody);
    return response;
  }
}
