"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import useGameStore from "../../store/useGameStore";
import playersAPI from "@/app/api/players/players";

export default function PlayersChoice() {
  const [players, setPlayers] = useState([]);
  const { setSelectedPlayer } = useGameStore();

  useEffect(() => {
    async function getPlayers() {
      try {
        const playersData = await playersAPI.getPlayers();
        setPlayers(playersData);
      } catch (err) {
        console.error(err);
      }
    }

    getPlayers();
  }, []);

  return (
    <Card title="Choose Your Player">
      <DataTable
        value={players}
        responsiveLayout="scroll"
        stripedRows
        selectionMode="single"
        onSelectionChange={(e) => setSelectedPlayer(e.value)}
      >
        <Column field="name" header="Name" />
        <Column
          field="income"
          header="Income"
          body={(data) => `$${data.income.toFixed(2)}`}
        />
      </DataTable>
    </Card>
  );
}
