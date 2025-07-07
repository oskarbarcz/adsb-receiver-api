import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PositionStore } from '../../providers/store/position.store';
import { Position } from './entity/position.entity';
import {
  CreatePositionRequest,
  CreatePositionResponse,
} from './dto/position.dto';
import { AdminGuard, ClientGuard } from '../../common/auth/guard';
import { UnauthorizedResponse } from '../../common/response/unauthorized.response';

@ApiTags('position')
@Controller('/api/v1/position')
export class PositionController {
  constructor(private readonly positionStore: PositionStore) {}

  @ApiOperation({ summary: 'Store aircraft position' })
  @ApiBody({ type: CreatePositionRequest })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Post()
  @UseGuards(ClientGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async post(@Body() position: Position): Promise<void> {
    await this.positionStore.set(position);
  }

  @ApiOperation({ summary: 'Store aircraft position' })
  @ApiBody({ type: CreatePositionRequest })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Delete('/:callsign')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async clear(@Param('callsign') callsign: string): Promise<void> {
    await this.positionStore.clearForCallsign(callsign);
  }

  @ApiOperation({ summary: 'Get aircraft position by callsign' })
  @ApiOkResponse({
    type: CreatePositionResponse,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Get('/:callsign')
  async getForCallsign(
    @Param('callsign') callsign: string,
  ): Promise<CreatePositionResponse[]> {
    return this.positionStore.getForCallsign(callsign);
  }
}
