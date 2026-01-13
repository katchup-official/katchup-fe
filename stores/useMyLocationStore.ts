import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MyLocation } from "@/types/place";

type MyLocationState = {
  myLocation: MyLocation | null;

  setMyLocation: (location: MyLocation) => void;
  clearMyLocation: () => void;
};

export const useMyLocationStore = create<MyLocationState>()(
  persist(
    (set) => ({
      myLocation: null,

      setMyLocation: (location) => set({ myLocation: location }),
      clearMyLocation: () => set({ myLocation: null }),
    }),
    {
      name: "my-location-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);