import { DateRange } from '@mui/lab/DateRangePicker';

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

const patchProfile = async (data: Props, profileId?: string): Promise<ProfileApiData> => {
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

export default patchProfile;
