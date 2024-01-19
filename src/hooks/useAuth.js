import { useEffect, useState } from 'react';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};
