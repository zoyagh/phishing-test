import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendPhishingDto, PhishingDto } from './dtos';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
  }

  @Get('click')
  async markClick(@Query('email') email: string) {
    return this.phishingService.attemptClicked(email);
  }

  @Get('attempts')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAttempts() {
    const data = await this.phishingService.getAttempts();
    return data.map((attempt) => new PhishingDto(attempt));
  }
}
