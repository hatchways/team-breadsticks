import { Profile } from './Profile';
export interface Booking {
  ownerId?: Profile;
  sitterId?: Profile;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paid?: boolean;
  _id?: string;
}
export interface RequestApiDataSuccess {
  nextBooking: Booking;
  currentBookings: Booking[];
  pastBookings: Booking[];
}

export interface RequestApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}

export interface NewRequestApiDataSuccess {
  error?: { message: string; existingRequest?: Booking };
  success?: { message: string; newRequest?: Booking };
}
export interface RequestStatusApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}

export interface IApiResponse {
  data: { success?: boolean; error?: { message: string } };
}
