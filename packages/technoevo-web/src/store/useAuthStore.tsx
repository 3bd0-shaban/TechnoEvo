import { iUser } from '@/types/iUser';
import { create } from 'zustand';

type State = {
  local: string;
  access_token: string;
  user: iUser;
};

type Actions = {
  setCredentials: (user: iUser, access_token: string) => void;
  LogOut: () => void;
  setLocal: (value: string) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  local: '',
  access_token: '',
  user: {},
  setCredentials: (user: iUser, access_token: string) => {
    set({ access_token, user });
  },
  LogOut: () => {
    set({ access_token: '', user: {} });
  },
  setLocal: (local: string) => {
    set({ local });
  },
}));
