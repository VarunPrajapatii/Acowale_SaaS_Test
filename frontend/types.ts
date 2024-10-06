export interface Item {
  id: number;
  name: string;
  quantity: number;
  created_by:string;
}

export interface ItemsResponse {
  items: Item[];
  totalPages: number; 
}

export interface UpdateItemResponse {
  updatedItem: Item;
}

export interface AddItemResponse {
  item: Item;
}