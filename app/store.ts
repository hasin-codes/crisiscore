import { create } from 'zustand'

type Store = {
  speedUnit: string
  setSpeedUnit: (unit: string) => void
}

export const useStore = create<Store>((set: (fn: (state: Store) => Partial<Store>) => void) => ({
  speedUnit: 'E',
  setSpeedUnit: (unit: string) => set((state) => ({ speedUnit: unit })),
}))