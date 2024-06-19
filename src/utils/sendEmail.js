import emailjs from '@emailjs/browser';
import { fullDate } from './validations';
import { genConst } from 'store/constant';
const SERVICE_ID = 'service_wzkb9kh';
const TEMPLATE_WELCOME_ID = 'template_2jruacg';
const PUBLIC_ID = 'zObPv7PPx0SSdJhg4';

emailjs.init({
  publicKey: PUBLIC_ID,
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: 10000
  }
});

export function sendWelcomeEmail(mail, userName) {
  emailjs
    .send(SERVICE_ID, TEMPLATE_WELCOME_ID, {
      title: 'BIENVENIDO A KHUSKA!',
      subTitle: 'JUNTOS HACIA LA CONSTRUCCIÓN DE UN FUTURO PROSPERO',
      userName: userName,
      message: 'Nos alegra que estés aquí. KHUSKA tiene una comunidad en crecimiento y muy comprometida con llegar al éxito',
      startDate: fullDate(),
      subject: 'Bienvenido a KHUSKA',
      mail: mail
    })
    .then((response) => {
      console.log(response.status, response.text);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function sendPaymentEmail(mail, userName) {
  emailjs
    .send(SERVICE_ID, TEMPLATE_WELCOME_ID, {
      title: 'Ha ',
      subTitle: 'JUNTOS HACIA LA CONSTRUCCIÓN DE UN FUTURO PROSPERO',
      userName: userName,
      message: 'Nos alegra que estés aquí. KHUSKA tiene una comunidad en crecimiento y muy comprometida con llegar al éxito',
      startDate: fullDate(),
      subject: 'Recibo de su pago a KHUSKA',
      mail: mail
    })
    .then((response) => {
      console.log(response.status, response.text);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function sendSubscriptionEmail(mail, userName, type, startDate, endDate) {
  emailjs
    .send(SERVICE_ID, TEMPLATE_WELCOME_ID, {
      title: 'Tu suscripción KHUSKA ',
      userName: userName,
      message:
        'Aquí encontrarás la información de pago de tu suscripción que procesamos el día de hoy. El pago procesado corresponde al período detallado a continuación. Tu suscripción a KHUSKA no se renovará automáticamente.',
      subMessage: 'Prepárate para disfrutar de todos los beneficios.',
      title2: 'Detalles de la suscripción',
      message2: 'Tu suscripción se generó a través de: khuska.es',
      type: type == 1 ? 'Estandar (30 días)' : 'Plus (1 año)',
      total: type == 1 ? 'Total $ ' + genConst.CONST_MONTH_VALUE : 'Total $ ' + genConst.CONST_YEAR_VALUE,
      startDate: startDate,
      endDate: endDate,
      subject: 'Recibo de su pago a KHUSKA',
      footer: '¡Estamos aquí para ayudar!',
      support: 'Si tienes alguna pregunta, no dudes en contactarnos!',
      mail: mail
    })
    .then((response) => {
      console.log(response.status, response.text);
    })
    .catch((error) => {
      console.log(error);
    });
}

export const sendKhuskaEmail = (mail, name, message, title) => {
  const object = {
    mail: mail,
    userName: name,
    message: message,
    title: title
  };
  emailjs.send(SERVICE_ID, TEMPLATE_WELCOME_ID, object).then(
    (response) => {
      console.log(response.status, response.text);
    },
    (error) => {
      console.log(error);
    }
  );
};

export const sendRegisterKhuskaEmail = (mail, name) => {
  const message = 'Ahora formas parte de la Red de Mercadeo KHUSKA.';
  const object = {
    mail: mail,
    userName: name,
    message: message,
    subMessage: '',
    title: 'Bienvenido a KHUSKA',
    subTitle: ''
  };
  emailjs.send(SERVICE_ID, TEMPLATE_WELCOME_ID, object).then(
    (response) => {
      console.log(response.status, response.text);
    },
    (error) => {
      console.log(error);
    }
  );
};

export const sendPaymentSubKhuskaEmail = (mail, name, type, total, startDate, endDate) => {
  const message = 'Desde hoy podrás disfrutar de todos los beneficios que disponemos para ti, ya eres parte de la mejor Red de Mercadeo.';
  const message2 =
    'Aquí encontrarás la información de pago de tu suscripción que procesamos el ' +
    startDate +
    '. Tu suscripción a KHUSKA no se renovará automáticamente a menos que vuelvas a realizar la suscripción.';
  const object = {
    mail: mail,
    userName: name,
    message: message,
    subMessage: '',
    title: 'Suscripción KHUSKA',
    subTitle: 'Bienvenido',
    title2: 'Detalles de la Suscripción',
    message2: message2,
    type: type,
    total: '$ ' + total,
    startDate: 'Fecha Inicio: ' + startDate,
    endDate: 'Fecha Fin: ' + endDate
  };
  emailjs.send(SERVICE_ID, TEMPLATE_WELCOME_ID, object).then(
    (response) => {
      console.log(response.status, response.text);
    },
    (error) => {
      console.log(error);
    }
  );
};
