"use client";

import React from "react";
import PlayersChoice from "../PlayerChoice";
import InventoryView from "../InventoryView";
import useGameStore from "@/app/store/useGameStore";
const Game = () => {
  const { selectedPlayer } = useGameStore();

  return <main>{selectedPlayer ? <InventoryView /> : <PlayersChoice />}</main>;
};

export default Game;
