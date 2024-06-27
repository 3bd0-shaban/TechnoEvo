import { iUser } from '@/types/iUser';
import { create } from 'zustand';

type State = {
  local: string;
  accessToken: string;
  user: iUser;
};

type Actions = {
  setCredentials: (user: iUser, accessToken: string) => void;
  LogOut: () => void;
  setLocal: (value: string) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  local: '',
  accessToken: '',
  user: {},
  setCredentials: (user: iUser, accessToken: string) => {
    set({ accessToken, user });
  },
  LogOut: () => {
    set({ accessToken: '', user: {} });
  },
  setLocal: (local: string) => {
    set({ local });
  },
}));
