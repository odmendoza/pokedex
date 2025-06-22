import { create } from 'zustand';

type LoadingStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useLoading = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));