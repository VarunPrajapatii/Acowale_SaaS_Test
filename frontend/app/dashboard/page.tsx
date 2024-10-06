"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ItemList from "@/components/ItemList";
import ItemForm from "@/components/ItemForm";
import {
  Item,
  ItemsResponse,
  AddItemResponse,
  UpdateItemResponse,
} from "@/types";

const Dashboard = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [editableItemId, setEditableItemId] = useState<number | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<string>("");
  const [editedName, setEditedName] = useState<string>("");
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthAndFetchItems = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/user/validate-token`,
            { token }
          );

          if (res.status === 200) {
            const itemsResponse = await axios.get<ItemsResponse>(
              `${process.env.BACKEND_URL}/api/item?page=${currentPage}&limit=10`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setItems(itemsResponse.data.items);
            setTotalPages(itemsResponse.data.totalPages);
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.error("Token validation or item fetching failed", error);
          router.push("/login");
        }
      }
      setLoading(false);
    };

    checkAuthAndFetchItems();
  }, [router, currentPage]);

  const onEdit = (item: Item) => {
    setEditableItemId(item.id);
    setEditedName(item.name);
    setEditedQuantity(item.quantity.toString());
  };

  const handleChange = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put<UpdateItemResponse>(
        `${process.env.BACKEND_URL}/api/item/${itemId}`,
        {
          name: editedName,
          image: "",
          quantity: parseInt(editedQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const updatedItem = res.data.updatedItem;
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setEditableItemId(null);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post<AddItemResponse>(
        `${process.env.BACKEND_URL}/api/item`,
        {
          name: newItemName,
          image: "",
          quantity: parseInt(newItemQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        const newItem = res.data.item;
        setItems((prevItems) => [newItem, ...prevItems]);
        setNewItemName("");
        setNewItemQuantity("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${process.env.BACKEND_URL}/api/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const PaginationControls = () => (
    <div className="flex justify-between mt-4 mb-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-4">
      <h1 className="text-6xl font-bold mb-8">Acowale SaaS Test</h1>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h2>
        <button
          className="bg-red-500 text-white h-10 rounded-2xl mb-4 ml-60 px-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <ItemForm
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        handleAddItem={handleAddItem}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PaginationControls />

          <ItemList
            items={items}
            editableItemId={editableItemId}
            onEdit={onEdit}
            onDelete={handleDeleteItem}
            editedName={editedName}
            setEditedName={setEditedName}
            editedQuantity={editedQuantity}
            setEditedQuantity={setEditedQuantity}
            handleChange={handleChange}
          />

          <PaginationControls />
        </>
      )}
    </div>
  );
};

export default Dashboard;
