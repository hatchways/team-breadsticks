import { RequestApiData, RequestStatusApiData, NewRequestApiDataSuccess } from '../../interface/Requests';
import { FetchOptions } from '../../interface/FetchOptions';

export const createRequest = async (
  profileId: string,
  sitterProfileId: string,
  startDate: Date,
  endDate: Date,
): Promise<NewRequestApiDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sitterProfileId, profileId, startDate, endDate }),
    credentials: 'include',
  };

  try {
    const fetchData = await fetch(`/request`, fetchOptions);
    return await fetchData.json();
  } catch (e) {
    return { error: { message: 'Unable to connect to server. Please try again' } };
  }
};

export const getRequests = async (): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const timeStamp = new Date().getTime();
  try {
    const fetchData = await fetch(`/request/${timeStamp}`, fetchOptions);
    const { success } = await fetchData.json();
    return success;
  } catch (e) {
    return { error: { message: 'Unable to connect to server. Please try again' } };
  }
};

export const updateStatus = async (status: string, requestId: string | undefined): Promise<RequestStatusApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, requestId }),
    credentials: 'include',
  };

  try {
    const fetchData = await fetch(`/request`, fetchOptions);
    return await fetchData.json();
  } catch (e) {
    return { error: { message: 'Unable to connect to server. Please try again' } };
  }
};
