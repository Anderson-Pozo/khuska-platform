import React, { useState, useEffect } from 'react';
import MessageDark from 'components/message/MessageDark';

const Message = () => {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    setIsActive(false);
  }, []);
  return <>{isActive ? <div>Mensajes</div> : <MessageDark message={'No tienes mensajes aún!'} submessage={''} />}</>;
};

export default Message;
