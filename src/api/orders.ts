import { Order } from "@/types";
import axios from "axios";

export const fetchOrdersByUsername = async (username: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/orders?username=${username}`);
    const arr = response.data as any[]
    const ret: Order[] = arr.map(item => ({ ...item, createdAt: new Date(item.createdAt * 1000) }))
    return ret
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};