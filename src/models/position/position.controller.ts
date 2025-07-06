import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PositionStore } from '../../providers/store/position.store';
import { Position } from './entity/position.entity';
import {
  CreatePositionRequest,
  CreatePositionResponse,
} from './dto/position.dto';

@ApiTags('position')
@Controller('/api/v1/position')
export class PositionController {
  constructor(private readonly positionStore: PositionStore) {}

  @Post()
  @ApiOperation({ summary: 'Store aircraft position' })
  @ApiBody({ type: CreatePositionRequest })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async post(@Body() position: Position): Promise<void> {
    await this.positionStore.set(position);
  }

  @Delete('/:callsign')
  @ApiOperation({ summary: 'Store aircraft position' })
  @ApiBody({ type: CreatePositionRequest })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clear(@Param() callsign: string): Promise<void> {
    await this.positionStore.clearForCallsign(callsign);
  }

  @Get('/:callsign')
  @ApiOperation({ summary: 'Get aircraft position by callsign' })
  @ApiOkResponse({
    type: CreatePositionResponse,
    isArray: true,
  })
  async getForCallsign(
    @Param('callsign') callsign: string,
  ): Promise<CreatePositionResponse[]> {
    return this.positionStore.getForCallsign(callsign);
  }
}
