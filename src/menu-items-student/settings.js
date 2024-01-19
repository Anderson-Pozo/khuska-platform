// assets
import { IconMessage, IconSettings, IconBell } from '@tabler/icons';

// constant
const icons = {
  IconMessage,
  IconSettings,
  IconBell
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const settings = {
  id: 'pages',
  title: 'Configuraciones',
  type: 'group',
  children: [
    {
      id: 'messages',
      title: 'Mensajes',
      type: 'item',
      url: '/app/message',
      icon: icons.IconMessage
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      type: 'item',
      url: '/app/notifications',
      icon: icons.IconBell
    }
    /*,
    {
      id: 'settings',
      title: 'Ajustes',
      type: 'item',
      url: '/app/settings',
      icon: icons.IconSettings
    }*/
  ]
};

export default settings;
