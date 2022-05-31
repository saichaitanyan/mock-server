import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Airlines } from './airlines-model';
@Injectable()
export class AirlinesService {
  constructor(
    @InjectModel('Airlines') private readonly airlinesModel: Model<Airlines>,
  ) {}

  /**
   * fetch airlines list
   * @returns: Promise<Airlines[]>
   */
  public async fetchAirlinesList(): Promise<any> {
    const responseBody = {
      success: false,
      message: 'No airlines data found',
      data: [],
    };
    const airlinesList = await this.airlinesModel.find({}, { __v: 0 }).exec();
    try {
      if (airlinesList.length > 0) {
        responseBody.message = 'Airlines data found';
        responseBody.success = true;
        responseBody.data = airlinesList;
        Logger.debug(responseBody.message);
      }
    } catch (error) {
      Logger.error('Error while fetching airline data', error);
      responseBody.message = error.message;
    }
    Logger.debug(JSON.stringify(responseBody));
    return { response: responseBody };
  }
  /**
   *
   * @param requestBody: Airline
   */
  public async insertAirlineDetails(requestBody: Airlines): Promise<any> {
    const responseBody = {
      success: false,
      message: 'Unable to insert airline data.',
    };
    try {
      const newAirlineData = new this.airlinesModel(requestBody);
      const result = await newAirlineData.save();
      if (result) {
        responseBody.message = 'Created airline data successfully';
        responseBody.success = true;
      }
    } catch (error) {
      Logger.error('Error while creating airline data', error);
      responseBody.message = error.message;
    }
    Logger.debug(JSON.stringify(responseBody));
    return { response: responseBody };
  }
}
