import { Injectable, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from './passenger-model';
@Injectable()
export class PassengerService {
  constructor(
    @InjectModel('Passenger') private readonly passengerModel: Model<Passenger>) { }

  /**
   * insert passenger details
   * @param requestBody: Passenger
   */
  public async insertPassengerDetails(requestBody: Passenger): Promise<any> {
    const responseBody = {
      success: false,
      message: 'Unable to insert Passenger data.',
    };
    try {
      const newPassengerData = new this.passengerModel(requestBody);
      const result = await newPassengerData.save();
      if (result) {
        responseBody.message = 'Created passenger data successfully';
        responseBody.success = true;
      }
    } catch (error) {
      Logger.error('Error while creating passenger data', error);
      responseBody.message = error.message;
    }
    Logger.debug(JSON.stringify(responseBody));
    return { response: responseBody };
  }

  public async getPassengerDetailsById(passengerId: string): Promise<any> {
    const responseBody = {
      success: false,
      message: 'Unable to fetch Passenger details by id.',
      data: {}
    };

    try {
      // const _passengerDetails = await this.passengerModel.findById({ _id: passengerId }).exec();
      const _passengerDetails = await this.passengerModel.aggregate([
        { $sort: { productName: 1 } },
        {
          $lookup: {
            from: 'airlines',
            localField: 'airlineId',
            foreignField: '_id',
            as: 'airlines',
            // check point for airlines
            pipeline: [
              { $sort: { name: 1 } }
            ]
          }
        }
      ])
      if (_passengerDetails) {
        responseBody.success = true;
        responseBody.message = 'Found Passenger details';
        responseBody.data = _passengerDetails[0];
      }
    } catch (error) {
      Logger.error('Error while fetching passenger details', error);
      responseBody.message = error.message;
    }
    Logger.debug(JSON.stringify(responseBody));
    return { response: responseBody };
  }

  public async getPassengerDetails(): Promise<any> {
    const responseBody = {
      success: false,
      message: 'Unable to fetch Passenger details.',
      data: []
    };

    try {
      const _passengerDetails = await this.passengerModel.find().exec();
      if (_passengerDetails) {
        responseBody.success = true;
        responseBody.message = 'Found Passenger details';
        responseBody.data = _passengerDetails;

        const passengersDetailsList = await this.passengerModel.aggregate([
          { $sort: { productName: 1 } },
          {
            $lookup: {
              from: 'airlines',
              localField: 'airlineId',
              foreignField: '_id',
              as: 'airlines',
              // check point for airlines
              pipeline: [
                { $sort: { name: 1 } }
              ]
            }
          }
        ])
        if (passengersDetailsList.length > 0) {
          responseBody.message = 'Passenger details found';
          responseBody.success = true;
          responseBody.data = passengersDetailsList;
        }
        return { response: responseBody };
      }
    } catch (error) {
      Logger.error('Error while fetching passenger details', error);
      responseBody.message = error.message;
    }
    Logger.debug(JSON.stringify(responseBody));
    return { response: responseBody };
  }

  public async updatePassengerDetails(requestBody: Passenger): Promise<any> {
    const responseBody = { success: false, message: 'Unable to update passenger details.' };
    try {
      const { _id } = requestBody;
      const doc = await this.passengerModel.findOneAndUpdate({ _id }, requestBody, { new: true });

      responseBody.message = 'Updated passenger details successfully';
      responseBody.success = true;
    } catch (error) {
      Logger.error('Error while updating passenger details', error);
    }
    Logger.log(JSON.stringify(responseBody));
    return { response: responseBody };
  }

  public async deletePassenger(passengerId: string): Promise<any> {
    const responseBody = { success: false, message: 'Unable to delete passenger details.' };
    try {
      const product = await this.passengerModel.findByIdAndDelete({ _id: passengerId }).exec();
      if (product) {
        responseBody.success = true;
        responseBody.message = 'Deleted passenger details successfully';
      } else {
        throw new NotFoundException;
      }

    } catch (error) {
      Logger.error('Error while deleting passenger details', error);
    }
    Logger.log(JSON.stringify(responseBody));
    return { response: responseBody };
  }
}
