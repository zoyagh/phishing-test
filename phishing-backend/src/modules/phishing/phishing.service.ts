import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { PhishingRepository, UserRepository } from '../../common/repositories/';
import { PhishingAttemptStatus } from 'src/consts/';
import * as process from 'node:process';

@Injectable()
export class PhishingService {
  private readonly logger = new Logger(PhishingService.name);

  constructor(
    private readonly phishingRepository: PhishingRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: MailService,
  ) {}

  async getAttempts(): Promise<any[]> {
    const attempts = await this.phishingRepository.findAllAttempts();
    this.logger.log(`Fetched phishing simulations`);
    return attempts;
  }

  async sendPhishingEmail(email: string): Promise<void> {
    const existingAttempt = await this.phishingRepository.findByEmail(email);
    if (existingAttempt) {
      this.logger.warn(`Phishing email already sent to ${email}`);
      throw new BadRequestException('Phishing email already sent');
    }

    const user = await this.userRepository.findByEmail(email);
    if(!user){
      throw new NotFoundException('User not found');
    }

    const url = `${process.env.APP_URL}/phishing/click?id=${user.id}`;
    const content = `<p>This is a security awareness test. Please click <a href="${url}">here</a> to verify the result of this simulation.</p>`;

    await this.emailService.sendPhishingEmail(email, content);
    this.logger.log(`Phishing email sent to ${email}`);

    await this.phishingRepository.createPhishingAttempt(email, content, PhishingAttemptStatus.PENDING);
    this.logger.log(`New phishing attempt saved for ${email}`);
  }

  async attemptClicked(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if(!user){
      throw new NotFoundException('User not found');
    }

    const attempt = await this.phishingRepository.findPendingAttemptByEmail(user.email);
    if (!attempt) {
      this.logger.warn(`No pending phishing simulation found for ${user.email}`);
      throw new BadRequestException('No pending phishing simulation found for this email');
    }

    await this.phishingRepository.updateAttemptStatus(attempt.id, PhishingAttemptStatus.CLICKED);
    this.logger.log(`Phishing simulation clicked for ${user.email}`);
  }
}
