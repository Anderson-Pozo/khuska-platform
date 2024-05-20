import emailjs from '@emailjs/browser';
const SERVICE_ID = 'service_yc38rkh';
const TEMPLATE_ID = 'template_2jruacg';
const PUBLIC_ID = 'zObPv7PPx0SSdJhg4';

emailjs.init({
  publicKey: PUBLIC_ID,
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'userEmail'
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000
  }
});

export const sendWelcomeEmail = (mail, name) => {
  const object = {
    mail: mail,
    name: name
  };
  emailjs.send(SERVICE_ID, TEMPLATE_ID, object).then(
    (response) => {
      console.log(response.status, response.text);
    },
    (error) => {
      console.log(error);
    }
  );
};
