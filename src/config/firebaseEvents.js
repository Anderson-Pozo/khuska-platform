//Firebase
import { db, authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, setDoc, doc, updateDoc, deleteDoc, getDocs, addDoc, where, query } from 'firebase/firestore';
import {
  collAdminUsers,
  collBusiness,
  collChat,
  collFav,
  collGenNoti,
  collInbox,
  collIncomes,
  collKhuskaBenefit,
  collLog,
  collMail,
  collMessage,
  collNotifications,
  collPayment,
  collProducts,
  collSettings,
  collSubscription,
  collUserAddress,
  collUserBenefit,
  collUserBillData,
  collUserPaymentMethod,
  collUserPhone,
  collUsers,
  collUsrNoti,
  collVoucher
} from 'store/collections';
import { genConst, process } from 'store/constant';
import { labels } from 'store/labels';
import { generateId } from 'utils/idGenerator';
import { fullDate, generateDate, shortDate } from 'utils/validations';

//Encontrar Sesión activa
export function isSessionActive(navigate) {
  onAuthStateChanged(authentication, async (user) => {
    if (user) {
      const q = query(collection(db, collUsers), where('id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().profile == genConst.CONST_PRO_DEF) {
          navigate('/app/dashboard');
        } else {
          navigate('/main/dashboard');
        }
      });
    } else {
      navigate('/auth/signin');
    }
  });
}
//Encontrar Id de Usuario Sesión
export function getUserId() {
  let userId = null;
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      userId = user.uid;
    }
  });
  return userId;
}
//Buscar si existe Referido
export async function isExistUserReferalEmail(value) {
  let result = null;
  const q = query(collection(db, collUsers), where('email', '==', value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result = doc.data().ownReferal;
  });
  return result;
}
export async function isExistUserReferalCode(value) {
  let result = null;
  const q = query(collection(db, collUsers), where('ownReferal', '==', value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result = doc.data().ownReferal;
  });
  return result;
}
//Buscar si existe Usuario
export async function isExistUser(id) {
  let isExist = false;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    isExist = true;
  } else {
    isExist = false;
  }
  return isExist;
}
//CRUD FUNCTIONS
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
export function createLogRecord(table, process, object) {
  const idLog = generateId(10);
  const logObject = {
    id: idLog,
    process: process,
    createAt: fullDate(),
    state: genConst.CONST_STATE_AC,
    object: object
  };
  return setDoc(doc(db, table, idLog), logObject);
}
export function createSystemNotification(object) {
  return addDoc(collection(db, collUsrNoti), object);
}
export function createLogRecordWithId(idRecord, object) {
  return setDoc(doc(db, collLog, idRecord), object);
}
export function createGlobalNotification(message, subject) {
  const object = {
    id: generateId(6),
    from: labels.notiAdmin,
    date: generateDate(),
    message: message,
    subject: subject,
    state: genConst.CONST_NOTIF_NL
  };
  return addDoc(collection(db, collGenNoti), object);
}
//Obtener Datos Perfil de Usuario por ID
export async function getProfileUser(id) {
  let profile = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    profile = doc.data().profile;
  });
  return profile;
}
//Obtener Padre de Hijo
export async function getDad(code) {
  let data = null;
  const q = query(collection(db, collUsers), where('ownReferal', '==', code));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
  }
  return data;
}
//Obtener Datos Perfil de Usuario Administrador por ID
export async function getProfileUserAdmin(id) {
  let profile = null;
  const q = query(collection(db, collAdminUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    profile = doc.data().profile;
  });
  return profile;
}
//Obtener Telefono de Usuario
export async function getPhoneUser(id) {
  let phone = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    phone = doc.data().phone;
  });
  return phone;
}
//Obtener el Estado de una Usuario por ID
export async function getSubscribeStateUser(id) {
  let state = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    state = doc.data().state;
  });
  return state;
}
//Obtener el estado de la Subscripción de un Usuario por ID
export async function getUserSubscription(id) {
  let state = null;
  const q = query(collection(db, collSubscription), where('idUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    state = doc.data().state;
  });
  return state;
}
//Obtener la fecha de la Subscripción de un Usuario por ID
export async function getUserSubscriptionEndDate(id) {
  let date = null;
  const q = query(collection(db, collSubscription), where('idUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    date = doc.data().endDateFormat;
  });
  return date;
}
//Obtener la fecha de la Subscripción de un Usuario por ID
export async function getUserSubscriptionStartDate(id) {
  let date = null;
  const q = query(collection(db, collSubscription), where('idUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    date = doc.data().startDate;
  });
  return date;
}
//Obtener datos de la Subscripción de un Usuario por ID
export async function getUserDataSubscription(id) {
  let data = null;
  const q = query(collection(db, collSubscription), where('idUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
}
//Obtner el Negocio por Id
export async function getBusinessById(id) {
  let data = [];
  const q = query(collection(db, collBusiness), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner el Usuario por Id
export async function getUserById(id) {
  let data = [];
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner el Producto por Id
export async function getProductById(id) {
  let data = [];
  const q = query(collection(db, collProducts), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//
export async function getFavoritesByProductIdAndUserId(id, userId) {
  let data = [];
  const q = query(collection(db, collFav), where('productId', '==', id), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner el Producto por Id Usuario
export async function getProductByUserId(id) {
  let data = [];
  const q = query(collection(db, collProducts), where('userId', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//LISTAS
//Obtenemos la lista de Usuarios
export const getUsersData = async () => {
  const list = [];
  const querySnapshot = await getDocs(collection(db, collUsers));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
};
//Obtenemos la lista de Productos
export const getProducts = async () => {
  const list = [];
  const querySnapshot = await getDocs(collection(db, collProducts));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
};
//Obtenemos la lista de Productos por categoria
export async function getProductsByCategory(id) {
  let data = [];
  const q = query(collection(db, collProducts), where('category', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//
export const getGeneralNotifications = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collGenNoti);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
export async function getUserNotifications(id) {
  const list = [];
  const q = query(collection(db, collNotifications), where('idUser', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}
export async function getUserNotificationsUnread(id) {
  const list = [];
  const q = query(collection(db, collNotifications), where('idUser', '==', id), where('state', '==', 0));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}
export const getBenefits = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collKhuskaBenefit);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
export const getAllUserBenefits = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collUserBenefit);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
export const getAllPayments = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collPayment);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
export const getUserBenefits = async (id) => {
  const list = [];
  const q = query(collection(db, collUserBenefit), where('idRefer', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
export async function getMail() {
  const list = [];
  const querySnapshot = await getDocuments(collMail);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}
//Obtenemos la lista de Usuarios Administradores
export const getAdminUsersData = async () => {
  const list = [];
  const q = query(collection(db, collUsers), where('profile', '==', genConst.CONST_PRO_ADM));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
//Obtenemos la lista de Usuarios Administradores
export const getUsersList = async () => {
  const list = [];
  const q = query(collection(db, collUsers), where('profile', '==', genConst.CONST_PRO_DEF));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
//Obtenemos datos de Usuario por codigo
export const getUsersDataByCode = async (code) => {
  const list = [];
  const q = query(collection(db, collUsers), where('ownReferal', '==', code));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
//Obtener lista de Negocios
export async function getBusinessList() {
  const list = [];
  const querySnapshot = await getDocs(collection(db, collBusiness));
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
    list.sort((a, b) => a.name.localeCompare(b.name));
  });
  return list;
}
//Obtener lista de Productos
export async function getProductsByBusiness(id) {
  const list = [];
  const q = query(collection(db, collProducts), where('idBusiness', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}
//Obtenemos la Lista de Comprobantes
export const getVouchers = async () => {
  const list = [];
  const querySnapshot = await getDocuments(collVoucher);
  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};
//Obtenemos el nombre y apellido de Usuario por ID
export async function getUserName(id) {
  let name = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    name = doc.data().name + ' ' + doc.data().lastName;
  });
  return name;
}
//Obtenemos el nombre y apellido de Usuario por ID
export async function getUserNameByCode(code) {
  let name = null;
  const q = query(collection(db, collUsers), where('ownReferal', '==', code));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    name = doc.data().name + ' ' + doc.data().lastName;
  });
  return name;
}
//Total beneficio por usuario Cancelado
export async function getTotalCancelBenefitByUserId(id) {
  let total = 0;
  const q = query(collection(db, collUserBenefit), where('idRefer', '==', id), where('state', '==', genConst.CONST_BEN_CAN));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      total = total + doc.data().total;
    });
  }
  return total;
}
//Total beneficio por usuario Pagado
export async function getTotalPaidBenefitByUserId(id) {
  let total = 0;
  const q = query(collection(db, collUserBenefit), where('idRefer', '==', id), where('state', '==', genConst.CONST_BEN_PAI));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      total = total + doc.data().total;
    });
  }
  return total;
}
//Total beneficio por Pendiente
export async function getTotalPendinBenefitByUserId(id) {
  let total = 0;
  const q = query(collection(db, collUserBenefit), where('idRefer', '==', id), where('state', '==', genConst.CONST_BEN_PEN));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      total = total + doc.data().total;
    });
  }
  return total;
}
//Total Beneficio
export async function getTotalBenefit() {
  let total = 0;
  const querySnapshot = await getDocuments(collKhuskaBenefit);
  querySnapshot.forEach((doc) => {
    total = total + doc.data().total;
  });
  return total;
}
//Total Pendiente
export async function getTotalBenefitPending() {
  let total = 0;
  const q = query(collection(db, collUserBenefit), where('state', '==', genConst.CONST_BEN_PEN));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      total = total + doc.data().total;
    });
  }
  return total;
}
//Total Pagado
export async function getTotalBenefitPay() {
  let total = 0;
  const q = query(collection(db, collUserBenefit), where('state', '==', genConst.CONST_BEN_PAI));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      total = total + doc.data().total;
    });
  }
  return total;
}
//Total Ingresos
export async function getTotalPayments() {
  let total = 0;
  const querySnapshot = await getDocuments(collPayment);
  querySnapshot.forEach((doc) => {
    total = total + doc.data().total;
  });
  return total;
}
export async function getBusinessListByUser(id) {
  let data = [];
  const q = query(collection(db, collBusiness), where('userId', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Lista Categorias
export async function getCategories() {
  let data = [];
  const q = query(collection(db, collSettings), where('type', '==', 'CAT'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    data.sort((a, b) => a.value.localeCompare(b.value));
  });
  return data;
}

//Lista Cuentas
export async function getCtaList() {
  let data = [];
  const q = query(collection(db, collSettings), where('type', '==', 'CTAACC'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

//STADISTICS COUNT ITEMS
//Obtenemos cantidad de Usuarios Registrados
export const countUser = async () => {
  const q = query(collection(db, collUsers), where('profile', '==', genConst.CONST_PRO_DEF));
  const querySnapshot = await getDocs(q);
  const count = querySnapshot.size;
  return count;
};
//Obtenemos cantidad de Usuarios Administradores Registrados
export const countAdminUser = async () => {
  const q = query(collection(db, collUsers), where('profile', '==', genConst.CONST_PRO_ADM));
  const querySnapshot = await getDocs(q);
  const count = querySnapshot.size;
  return count;
};
//Obtenemos cantidad de Negocios Registrados
export const countBusiness = async () => {
  const collCount = collection(db, collBusiness);
  const querySnapshot = await getDocs(collCount);
  const count = querySnapshot.size;
  return count;
};
//Obtenemos cantidad de Productos Registrados
export const countProducts = async () => {
  const collCount = collection(db, collProducts);
  const querySnapshot = await getDocs(collCount);
  const count = querySnapshot.size;
  return count;
};
//Obtenemos cantidad de Negocios Registrados por Usuario ID
export async function countBusinessById(id) {
  const q = query(collection(db, collBusiness), where('userId', '==', id));
  const querySnapshot = await getDocs(q);
  const count = querySnapshot.size;
  return count;
}
export async function countBusinessByUserId(id) {
  const q = query(collection(db, collBusiness), where('userId', '==', id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}
//Obtenemos cantidad de Subscripciones Registradas
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
//Obtenemos cantidad de Subscripciones Activas Registradas
export async function countActiveSubscriptions() {
  const q = query(collection(db, collSubscription), where('state', '==', 1));
  const querySnapshot = await getDocs(q);
  const count = querySnapshot.size;
  return count;
}
//LOGIN
//Buscamos si correo corresponde a Administrador
export const getAdmin = async (mail) => {
  let isFind = false;
  const q = query(collection(db, collUsers), where('email', '==', mail), where('profile', '==', genConst.CONST_PRO_ADM));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    isFind = true;
  } else {
    isFind = false;
  }
  return isFind;
};

export async function getUserState(id) {
  let state = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    state = doc.data().state;
  });
  return state;
}

export async function getUserReferalDad(id) {
  let code = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    code = doc.data().refer;
  });
  return code;
}

export async function getUserReferalCode(id) {
  let code = null;
  const q = query(collection(db, collUsers), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    code = doc.data().ownReferal;
  });
  return code;
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
//Message
//Obtner Mensajes por Id Usuario
export async function getMessageByUserId(id) {
  let data = [];
  const q = query(collection(db, collMessage), where('from', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner Mensajes recibidos por Id Usuario
export async function getRecibeMessageByUserId(id) {
  let data = [];
  const q = query(collection(db, collMessage), where('to', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner Mensajes por Id Producto
export async function getMessageByProductId(id) {
  let data = [];
  const q = query(collection(db, collMessage), where('idProduct', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
//Obtner chats por Id de Mensaje
export async function getChatByMessageId(id) {
  let data = [];
  const q = query(collection(db, collChat), where('idMsn', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    data.sort((a, b) => a.createAt - b.createAt);
  });
  return data;
}

//Crear Datos adicionales
export const createUserAditionalData = (uid, email) => {
  //Subscription
  const objSubscription = {
    date: null,
    dateFormat: null,
    description: null,
    emailUser: null,
    endDate: null,
    idUser: uid,
    nameUser: null,
    price: 0,
    refCode: null,
    startDate: null,
    state: genConst.CONST_STATE_IN,
    totalDays: 0
  };
  createDocument(collSubscription, uid, objSubscription);
  //Address
  const userAddress = {
    idUser: uid,
    principal: '',
    secondary: '',
    number: '',
    city: '',
    province: '',
    reference: ''
  };
  createDocument(collUserAddress, uid, userAddress);
  //Phone
  const userPhone = {
    idUser: uid,
    phone: ''
  };
  createDocument(collUserPhone, uid, userPhone);
  //BillData
  const userBillData = {
    idUser: uid,
    name: '',
    ci: '',
    address: '',
    email: '',
    city: '',
    phone: '',
    postal: ''
  };
  createDocument(collUserBillData, uid, userBillData);
  //Payment Data
  const userPaymentData = {
    idUser: uid,
    email: email,
    name: '',
    number: '',
    numberMask: null,
    date: '',
    cvc: '',
    cvcmd5: null
  };
  createDocument(collUserPaymentMethod, uid, userPaymentData);
  //Inbox
  const idMail = generateId(10);
  const inbox = {
    id: idMail,
    idUser: uid,
    to: email,
    from: 'Khuska',
    date: generateDate(),
    shortDate: shortDate(),
    message: 'Bienvenido a Khuska',
    subject: 'Bienvenida'
  };
  createDocument(collInbox, idMail, inbox);
  //Notifications
  const idNot = generateId(10);
  const notifications = {
    id: idNot,
    idUser: uid,
    to: email,
    from: 'Khuska',
    date: generateDate(),
    shortDate: shortDate(),
    message: 'No olvides actualizar tu información de perfil.',
    subject: 'Recuerda',
    state: genConst.CONST_NOTIF_NL
  };
  createDocument(collNotifications, idNot, notifications);
};
//SAVE PAYMENT
export const savePaymentRecord = (id, name, email, total, IVA, SUB) => {
  const idPayment = generateId(10);
  const obj = {
    id: idPayment,
    idUser: id,
    nameUser: name,
    emailUser: email,
    total: total,
    iva: IVA,
    sub: SUB,
    createAt: fullDate()
  };
  createDocument(collPayment, idPayment, obj);
  createLogRecord(collLog, process.LOG_CREATE_TRAN, obj);
};
//SAVE KHUSKA BENEFIT
export const saveKhuskaBenefit = (id, name, email, total) => {
  const idBenefit = generateId(10);
  const obj = {
    id: idBenefit,
    idUser: id,
    nameUser: name,
    emailUser: email,
    total: total,
    createAt: fullDate()
  };
  createDocument(collKhuskaBenefit, idBenefit, obj);
};
//SAVE USER BENEFIT
export const saveUserBenefit = (id, name, email, i, resid, resfullname, resemail, total) => {
  const idBenefit = generateId(10);
  const obj = {
    id: idBenefit,
    idUser: id,
    nameUser: name,
    emailUser: email,
    idRefer: resid,
    nameRefer: resfullname,
    emailRefer: resemail,
    total: total,
    level: i + 1,
    createAt: fullDate(),
    state: genConst.CONST_BEN_PEN
  };
  createDocument(collUserBenefit, idBenefit, obj);
};
