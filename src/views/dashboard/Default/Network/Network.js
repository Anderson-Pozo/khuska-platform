import React, { useEffect, useState } from 'react';

//Firebase
import { authentication, db } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { collUsers } from 'store/collections';

const Network = () => {
  const [childsList, setChildsList] = useState([]);
  const [userRefer, setUserRefer] = useState(null);
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        const q = query(collection(db, collUsers), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          setUserState(doc.data().state);
          setUserRefer(doc.data().ownReferal);
          const childs = [];
          const q = query(collection(db, collUsers), where('refer', '==', doc.data().ownReferal));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            childs.push(doc.data());
          });
          setChildsList(childs);
        });
      }
    });
  }, []);

  return (
    <div>
      Network - {userState} - {userRefer}
      {childsList.map((child, key) => (
        <div key={key}>{child.name}</div>
      ))}
    </div>
  );
};

export default Network;
