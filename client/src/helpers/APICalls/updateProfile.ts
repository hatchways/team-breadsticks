import { IApiResponse } from './../../interface/Requests';
import { DateRange } from '@mui/lab/DateRangePicker';
import { Profiles } from '../../interface/Profile';
import axios from 'axios';

interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
  credentials?: RequestCredentials;
}

export interface RangeSchema {
  sunday: DateRange<Date>;
  monday: DateRange<Date>;
  tuesday: DateRange<Date>;
  wednesday: DateRange<Date>;
  thursday: DateRange<Date>;
  friday: DateRange<Date>;
  saturday: DateRange<Date>;
}

export interface Props {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
  birth?: string;
  description?: string;
  availability?: RangeSchema;
  hourlyWage?: string;
}

interface ProfileApiDataSuccess {
  updatedProfile?: any;
}

interface ProfileApiData {
  error?: { message: string };
  success?: ProfileApiDataSuccess;
}

export const patchProfile = async (data: Props, profileId?: string): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return await fetch(`/profile/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const updateProFile = async (profile: Profiles): Promise<IApiResponse> => {
  // console.log(profile, 'profile');
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  };

  return await fetch(`/profile/update-profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
  // return await axios.post(`/profile/update-profile`, { profile });
};

export const getProfile = async (userId: string | undefined): Promise<{ _id: string; profile: Profiles }> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profile/get_profile/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
