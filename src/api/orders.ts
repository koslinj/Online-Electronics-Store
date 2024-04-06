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

export const fetchOrdersPaginable = async (currentPage: number, pageSize: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/orders?page=${currentPage - 1}&size=${pageSize}`);
    const rawData = response.data.content as any[]
    const data: Order[] = rawData.map(item => ({ ...item, createdAt: new Date(item.createdAt * 1000) }))
    return { data: data, total: response.data.totalElements }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};