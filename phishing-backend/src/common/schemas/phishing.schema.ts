import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PhishingAttemptStatus } from 'src/consts/';

export type T_PhishingDoc = Phishing & Document;

@Schema({
  timestamps: true,
})
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({
    type: String,
    enum: PhishingAttemptStatus, 
    default: PhishingAttemptStatus.PENDING,
  })
  status: PhishingAttemptStatus;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
