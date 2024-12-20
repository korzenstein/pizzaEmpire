import { create } from "zustand";

const useGameStore = create((set) => ({
  selectedPlayer: null,
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  resetGame: () => set({ selectedPlayer: null }),
}));

export default useGameStore;
