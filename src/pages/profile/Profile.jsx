import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../providers/AuthProvider';
import { User } from './User';
import { Admin } from './Admin';

export const Profile = () => {
  const [user, setUser] = useState();
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
        console.log(data)

        if (isMounted) {
          setUser(data);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          setToken();
        } else {
          console.log(error.message)
        }
      }
    };

    fetchCategories();

    // Cleanup function to abort the fetch request if the component is unmounted
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [setToken]);

  if (user?.role === "USER") return <User user={user} />
  if (user?.role === "ADMIN") return <Admin />

  return <p>Loading...</p>
};

