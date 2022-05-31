import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environmentConfig } from './environment/environment';
import { AirlinesModule } from './modules/airlines/airlnes.module';
import { PassengerModule } from './modules/passenger/passenger.module';
const connectionUrl = `mongodb://localhost/${environmentConfig.databaseName}`;

@Module({
  imports: [
    MongooseModule.forRoot(connectionUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    AirlinesModule,
    PassengerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
