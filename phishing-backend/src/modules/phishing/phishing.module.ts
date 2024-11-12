import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Phishing, PhishingSchema, User, UserSchema } from '../../common/schemas/';
import { MailModule } from '../mail/mail.module';
import { PhishingRepository, UserRepository } from 'src/common/repositories';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      { name: Phishing.name, schema: PhishingSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService, PhishingRepository, UserRepository],
})
export class PhishingModule {}
