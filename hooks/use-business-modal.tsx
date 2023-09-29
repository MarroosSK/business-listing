import { create } from "zustand";

interface useBusinessModalI {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
}

export const useBusinessModal = create<useBusinessModalI>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {},
  setData: (data) =>
    set((state) => ({ ...state, data: { ...state.data, ...data } })),
}));
