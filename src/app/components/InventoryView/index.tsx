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

  useEffect(() => {
    if (selectedPlayer) getInventory();
  }, [selectedPlayer]);

  const handleBuyIngredient = async (ingredient: string) => {
    if (!selectedPlayer) {
      return null;
    }

    try {
      const updatedInventory = await inventoryAPI.buyIngredient(
        selectedPlayer.playerID,
        ingredient // Only send the ingredient
      );

      console.log(updatedInventory);
      if (updatedInventory) {
        getInventory();
      }
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
          field="cost"
          header="Cost"
          body={(rowData) => `$${rowData.cost}`}
        />
        <Column
          header="Actions"
          body={(rowData) => (
            <Button
              label="Buy"
              icon="pi pi-shopping-cart"
              className="p-button-success"
              onClick={() => handleBuyIngredient(rowData.ingredient)}
            />
          )}
        />
      </DataTable>
    </Card>
  );
}
