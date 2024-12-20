"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import useGameStore from "../../store/useGameStore";
import inventoryAPI from "@/app/api/inventory/inventory";

export default function InventoryView() {
  const { selectedPlayer } = useGameStore();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function getInventory() {
      if (!selectedPlayer) {
        return null;
      }
      try {
        const inventoryData = await inventoryAPI.getInventory(
          selectedPlayer?.playerID
        );

        setInventory(inventoryData);
      } catch (err) {
        console.error(err);
      }
    }

    if (selectedPlayer) getInventory();
  }, [selectedPlayer]);

  const handleBuyIngredient = async (ingredient: string, cost: number) => {
    if (!selectedPlayer) {
      return null;
    }
    try {
      const updatedInventory = await inventoryAPI.buyIngredient(
        selectedPlayer.playerID,
        ingredient,
        cost
      );
      setInventory(updatedInventory);
    } catch (error) {
      console.error("Failed to buy ingredient:", error);
    }
  };

  return (
    <Card title={`${selectedPlayer?.name}'s Inventory`}>
      <DataTable value={inventory} responsiveLayout="scroll" stripedRows>
        <Column field="ingredient" header="Ingredient" />
        <Column field="quantity" header="Quantity" />
        <Column
          header="Actions"
          body={(rowData) => (
            <Button
              label="Buy"
              icon="pi pi-shopping-cart"
              className="p-button-success"
              onClick={() => handleBuyIngredient(rowData.ingredient, 5)}
            />
          )}
        />
      </DataTable>
    </Card>
  );
}
