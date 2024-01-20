//Firebase
import { db, authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, setDoc, doc, updateDoc, deleteDoc, getDocs, addDoc, where, query } from 'firebase/firestore';
import { collAdminUsers, collCourses, collIncomes, collRegUsr, collSubscription, collUsers } from 'store/collections';

export function isSessionActive(navigate) {
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      navigate('/app/dashboard');
    }
  });
}

export function getUserId() {
  let userId = null;
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      userId = user.uid;
    }
  });
  return userId;
}

export async function getProfileUser(id) {
  let profile = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    profile = doc.data().profile;
  });
  return profile;
}

export async function getProfileUserAdmin(id) {
  let profile = null;
  const q = query(collection(db, collAdminUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    profile = doc.data().profile;
  });
  return profile;
}

export async function getSubscribeStateUser(id) {
  let state = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    state = doc.data().state;
  });
  return state;
}

export async function getUserState(id) {
  let state = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    state = doc.data().state;
  });
  return state;
}

export async function getUserData(id) {
  let data = [];
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function getUserChilds(refer) {
  let data = [];
  const q = query(collection(db, collUsers), where('refer', '==', refer));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export const getUsersData = async () => {
  const list = [];
  const querySnapshot = await getDocs(collection(db, collUsers));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
};

export const getAdminUsersData = async () => {
  const list = [];
  const querySnapshot = await getDocs(collection(db, collAdminUsers));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
};

export const getCoursesList = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collCourses);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
};

export async function getCourseData(id) {
  let data = [];
  const q = query(collection(db, collCourses), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function getUserName(id) {
  let name = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    name = doc.data().name;
  });
  return name;
}

export async function getUserCourses(id) {
  let courses = [];
  const q = query(collection(db, collRegUsr), where('idIUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    courses.push(doc.data());
  });
  return courses;
}

export function createDocument(table, idRecord, object) {
  return setDoc(doc(db, table, idRecord), object);
}

export function updateDocument(table, idRecord, object) {
  return updateDoc(doc(db, table, idRecord), object);
}

export function deleteDocument(table, idRecord) {
  return deleteDoc(doc(db, table, idRecord));
}

export function getDocuments(table) {
  return getDocs(collection(db, table));
}

export function createLogRecord(object) {
  return addDoc(collection(db, 'Logs'), object);
}

export function createSystemNotification(object) {
  return addDoc(collection(db, 'UserNotifications'), object);
}

export function createLogRecordWithId(idRecord, object) {
  return setDoc(doc(db, 'Logs', idRecord), object);
}

export const countUser = async () => {
  const usersCollection = collection(db, collUsers);
  const querySnapshot = await getDocs(usersCollection);
  const userCount = querySnapshot.size;
  return userCount;
};

export const countCourses = async () => {
  const coursesCollection = collection(db, collCourses);
  const querySnapshot = await getDocs(coursesCollection);
  const courseCount = querySnapshot.size;
  return courseCount;
};

export const countSubscriptions = async () => {
  const subsCollection = collection(db, collSubscription);
  const querySnapshot = await getDocs(subsCollection);
  const subsCount = querySnapshot.size;
  return subsCount;
};

export const countTotalIncomes = async () => {
  const totalCollection = collection(db, collIncomes);
  const querySnapshot = await getDocs(totalCollection);
  const incomesCount = querySnapshot.size;
  return incomesCount;
};

export const getUserDataObject = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      authentication,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};
