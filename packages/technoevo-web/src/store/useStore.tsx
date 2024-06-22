import { iUser } from '@/types/iUser';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand'
import authSlice from './slices/authSlice'

const useStore = create<iUser>()((...a) => ({
  ...authSlice(...a)
}));
export default useStore;


if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}