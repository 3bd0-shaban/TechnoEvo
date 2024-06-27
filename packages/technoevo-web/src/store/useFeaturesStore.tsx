import { create } from 'zustand';
type State = {
  M_Location: boolean;
  keyword: string;
};

type Actions = {
  setKeyword: (value: string) => void;
  setM_Location: (value: boolean) => void;
};

export const useFeaturesStore = create<State & Actions>((set) => ({
  selectedShipping: null,
  selectedShippingLine: null,
  M_Location: false,
  vessels: [],
  keyword: '',

  setKeyword: (keyword: string) => {
    set({ keyword: keyword });
  },

  setM_Location: (isM_Location: boolean) => {
    set({ M_Location: isM_Location });
  },
}));
