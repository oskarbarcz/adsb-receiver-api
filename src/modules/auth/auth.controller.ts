import {
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGuard, AdminGuard } from '../../core/http/auth/guard';
import { UnauthorizedResponse } from '../../core/http/response/unauthorized.response';

@ApiTags('auth')
@Controller('/api/v1/auth-check')
export class AuthController {
  constructor() {}

  @ApiOperation({ summary: 'Check admin auth token validity' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Post('/admin')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async checkAdminToken(): Promise<void> {}

  @ApiOperation({ summary: 'Check client auth token validity' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Post('/client')
  @UseGuards(ClientGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async checkClient(): Promise<void> {}
}
