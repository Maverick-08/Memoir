export const BASE_URL = 'http://localhost:3000/api'; 
// http://localhost:3000/api
// https://memoir.dev-projects.site/api

export interface InterviewData {
  companyName: string;
  name: string;
  registrationNumber: number;
  interviewStatus: string;
  compensation?: number;
  roundDetails: Rounds[];
}

export interface Rounds {
  roundName: string;
  roundType: string;
  note?: string;
  questions: Questions[];
}

export interface Questions {
  title: string;
  description: string;
  link?: string;
}