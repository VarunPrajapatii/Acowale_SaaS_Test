import React from "react";

interface ItemFormProps {
  newItemName: string;
  setNewItemName: React.Dispatch<React.SetStateAction<string>>;
  newItemQuantity: string;
  setNewItemQuantity: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: () => Promise<void>;
}

const ItemForm: React.FC<ItemFormProps> = ({
  newItemName,
  setNewItemName,
  newItemQuantity,
  setNewItemQuantity,
  handleAddItem,
}) => {
  return (
    <div className="flex mb-4 pt-10">
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Item Name"
        className="border p-2 rounded-lg mr-2"
      />
      <input
        type="number"
        value={newItemQuantity}
        onChange={(e) => setNewItemQuantity(e.target.value)}
        placeholder="Quantity"
        className="border p-2 rounded-lg mr-2"
      />
      <button
        className="w-48 bg-green-300 h-10 rounded-2xl"
        onClick={handleAddItem}
      >
        Submit
      </button>
    </div>
  );
};

export default ItemForm;
