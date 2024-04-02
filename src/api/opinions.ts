import { Opinion } from "@/types";
import axios from "axios";

export const fetchOpinionsByProductId = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/opinions/${id}`);
    const arr = response.data as any[]
    const ret: Opinion[] = arr.map(item => ({ ...item, createdAt: new Date(item.createdAt * 1000) }))
    return ret
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchOpinionsByUsername = async (username: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/opinions?username=${username}`);
    const arr = response.data as any[]
    const ret: Opinion[] = arr.map(item => ({ ...item, createdAt: new Date(item.createdAt * 1000) }))
    return ret
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};