import { FetchOptions } from '../../interface/FetchOptions';
import { CreateProfile, Profile, ProfileApiData } from '../../interface/Profile';

interface SearchProps {
  city?: string;
  searchStartDate?: string;
  searchEndDate?: string;
}

export async function getProfileDetail(profileId: string): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function createProfile(profileInfo: CreateProfile): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileInfo),
    credentials: 'include',
  };

  return await fetch('/profile', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function getMyProfile(): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch('/profile/my-profile', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function searchSitters({ city, searchStartDate, searchEndDate }: SearchProps): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(
    `/profile/?city=${city}&searchStartDate=${searchStartDate}&searchEndDate=${searchEndDate}`,
    fetchOptions,
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateProfile(profileId: string, profileInfo: Profile): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileInfo),
    credentials: 'include',
  };
  return await fetch(`/profile/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
