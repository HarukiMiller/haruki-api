import { Get, Controller, Query } from '@nestjs/common';
import { MackolikService } from './mackolik.service';

@Controller('mackolik')
export class MackolikController {
    constructor(private readonly mackolikService: MackolikService) { }
    
    @Get('events')
    async getEventList(): Promise<any> {
        
        return this.mackolikService.getEventList();
    }
    @Get('get-matches')
    async getMatchesForEvent(@Query('event') eventNumber:number): Promise<any> {
        return this.mackolikService.getMatchesForEvent(eventNumber)
    }
}
