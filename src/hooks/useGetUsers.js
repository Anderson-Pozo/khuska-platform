import { getUsersData } from 'config/firebaseEvents';
import { useState, useEffect } from 'react';

export function useGetUsers() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsersData().then((data) => {
      setUsersList(data);
    });
  }, []);

  return usersList;
}
