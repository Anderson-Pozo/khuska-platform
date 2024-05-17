import { useState, useEffect } from 'react';
import { getUserSubscriptionEndDate } from 'config/firebaseEvents';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { calculateStateSubscription } from 'utils/validations';

export function useGetSubscriptionEndDate(id) {
  const [state, setState] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getUserSubscriptionEndDate(user.uid).then((enddate) => {
          setState(calculateStateSubscription(enddate));
        });
      }
    });
  }, [id]);

  return state;
}
