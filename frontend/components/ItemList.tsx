
import React from "react";
import { Item } from "@/types";

interface ItemListProps {
  items: Item[];
  editableItemId: number | null;
  onEdit: (item: Item) => void;
  onDelete: (itemId: number) => void;
  editedName: string;
  setEditedName: React.Dispatch<React.SetStateAction<string>>;
  editedQuantity: string;
  setEditedQuantity: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (itemId: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  editableItemId,
  onEdit,
  onDelete,
  editedName,
  setEditedName,
  editedQuantity,
  setEditedQuantity,
  handleChange,
}) => {
  return (
    <div className="w-full">
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow-lg flex justify-between"
          >
            {editableItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border p-2 rounded-lg mr-2"
                />
                <input
                  type="number"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(e.target.value)}
                  className="border p-2 rounded-lg mr-2"
                />
                <button
                  className="w-48 bg-blue-300 h-10 rounded-2xl"
                  onClick={() => handleChange(item.id)}
                >
                  Change
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Admin: {item.created_by}</p>
                <div className="flex">
                  <button
                    className="w-48 bg-gray-300 h-10 rounded-2xl mr-2"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-48 bg-red-500 h-10 rounded-2xl text-white"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default ItemList;
