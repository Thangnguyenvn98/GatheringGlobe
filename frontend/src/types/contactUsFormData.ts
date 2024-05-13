export interface ContactUsFormData {
  email: string;
  firstName: string;
  lastName: string;
  subject: string;
  description: string;
  attachments: {
    url: string;
  }[];
}
