import { create } from "zustand";

type ConfettiI = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfetti = create<ConfettiI>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
