import { PhishingAttemptStatus } from 'src/consts/';
import { Phishing } from '../../../common/schemas/';

export class PhishingDto {
  id: string;
  email: string;
  content: string;
  status: PhishingAttemptStatus; 

  constructor(phishing: Phishing) {
    this.id = phishing.id;
    this.email = phishing.email;
    this.content = phishing.content;
    this.status = phishing.status as PhishingAttemptStatus; 
  }
}
