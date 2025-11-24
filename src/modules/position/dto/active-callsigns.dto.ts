import { ApiProperty } from '@nestjs/swagger';

export class GetActiveCallsignsResponse {
  @ApiProperty({
    description: 'List of active callsigns',
    example: ['DLH1234', 'UAL456'],
    type: [String],
  })
  callsigns: string[];
}
