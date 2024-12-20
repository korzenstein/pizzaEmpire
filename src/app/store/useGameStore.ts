import { create } from "zustand";

interface Player {
  playerID: number;
  name: string
}

interface GameStore {
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  resetGame: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  selectedPlayer: null,
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  resetGame: () => set({ selectedPlayer: null }),
}));

export default useGameStore;
