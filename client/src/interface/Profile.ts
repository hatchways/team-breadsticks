export type Gender = 'Male' | 'Female' | 'Other';
export type Availability = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Profile {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  photos: string[];
  gender: Gender;
  availability: Availability[];
  isSitter: boolean;
  address: string;
  phone: string;
  description: string;
  birth: string;
  title: string;
  hourlyWage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfile {
  userId?: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  address: string;
  phone: string;
  description: string;
  birth: string;
}

export interface ProfileApiData {
  error?: string;
  profiles?: Profile[];
}
