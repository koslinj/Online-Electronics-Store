import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { User } from './User';
import { Admin } from './Admin';

export const Profile = () => {
  const [user, setUSer] = useState();
  const { setToken } = useAuth()

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user', {
          signal: abortController.signal,
        });

        const data = response.data;

        if (isMounted) {
          setUSer(data);
        }
      } catch (error) {
        if (error.response?.status == 403) {
          setToken();
        } else {
          console.log("NIE TUTAJ")
        }
      }
    };

    fetchCategories();

    // Cleanup function to abort the fetch request if the component is unmounted
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  if (user?.role === "USER") return <User />
  if (user?.role === "ADMIN") return <Admin />

  return <p>Loading...</p>
};

