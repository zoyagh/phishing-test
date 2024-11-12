import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phishing, T_PhishingDoc } from '../schemas/';
import { PhishingAttemptStatus } from 'src/consts/';

@Injectable()
export class PhishingRepository {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingModel: Model<T_PhishingDoc>,
  ) {}

  async findByEmail(email: string): Promise<T_PhishingDoc | null> {
    return this.phishingModel.findOne({ email }).exec();
  }

  async createPhishingAttempt(email: string, content: string, status: string): Promise<T_PhishingDoc> {
    const newPhishingAttempt = new this.phishingModel({
      email,
      status,
      content,
    });
    return await newPhishingAttempt.save();
  }

  async findPendingAttemptByEmail(email: string): Promise<T_PhishingDoc | null> {
    return this.phishingModel.findOne({ email, status: PhishingAttemptStatus.PENDING }).exec();
  }

  async updateAttemptStatus(attemptId: string, status: string): Promise<T_PhishingDoc | null> {
    return this.phishingModel.findByIdAndUpdate(attemptId, { status }, { new: true }).exec();
  }

  async findAllAttempts(): Promise<T_PhishingDoc[]> {
    return this.phishingModel.find().exec();
  }
}
