"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import useGameStore from "../../store/useGameStore";
import playersAPI from "@/app/api/players/players";
import { Button } from "primereact/button";

export default function PlayersChoice() {
  const [players, setPlayers] = useState([]);
  const { setSelectedPlayer } = useGameStore();

  async function getPlayers() {
    try {
      const playersData = await playersAPI.getPlayers();
      setPlayers(playersData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getPlayers();
  }, []);

  const handleGoFundMe = async (playerID: number) => {
    try {
      const response = await playersAPI.goFundMe(playerID);
      if (response) {
        await getPlayers();
      }
    } catch (error) {
      alert(error);
    }
  };

  interface data {
    income: number;
    playerID: number;
  }

  const incomeBodyTemplate = (data: data) => (
    <>
      <span>{`$${data.income.toFixed(2)}`}</span>
      {data.income < 10 && (
        <Button
          label="Go Fund Me"
          icon="pi pi-dollar"
          className="p-button-sm p-button-outlined ml-2"
          onClick={() => handleGoFundMe(data.playerID)}
        />
      )}
    </>
  );

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
        <Column field="income" header="Income" body={incomeBodyTemplate} />
      </DataTable>
    </Card>
  );
}
