export interface User {
  _id?: string;
  id?: string;
  email: string;
  username: string;
  isSitter?: boolean;
  profileImg?: string;
  profileId?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
