import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MackolikController } from './mackolik/mackolik.controller';
import { MackolikService } from './mackolik/mackolik.service';
import { MackolikModule } from './mackolik/mackolik.module';

@Module({
  imports: [MackolikModule],
  controllers: [AppController, MackolikController],
  providers: [AppService, MackolikService],
})
export class AppModule {}
