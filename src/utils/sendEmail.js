import emailjs from '@emailjs/browser';
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

export const sendWelcomeEmail = (mail, name) => {
  const object = {
    mail: mail,
    name: name
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
