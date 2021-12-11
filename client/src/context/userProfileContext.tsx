/* eslint-disable prettier/prettier */
import { useState, useContext, createContext, FunctionComponent } from 'react';
import { Profile } from '../interface/Profile';

interface UserProfile {
  handleUserProfile: (userProfile: Profile) => void;
  userProfile: Profile | undefined;
}

export const UserProfileContext = createContext<UserProfile>({
  handleUserProfile: () => null,
  userProfile: undefined,
});

export const UserProfileProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [userProfile, setUserProfile] = useState<Profile | undefined>(undefined);

  const handleUserProfile = (userProfile: Profile | undefined) => {
    setUserProfile(userProfile);
  };

  return (
    <UserProfileContext.Provider value={{ handleUserProfile, userProfile }}>{children}</UserProfileContext.Provider>
  );
};

export function useUserProfile(): UserProfile {
  return useContext(UserProfileContext);
}
