// assets
import { IconKey, IconBell, IconMail, IconSettings, IconSettings2 } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconBell,
  IconMail,
  IconSettings,
  IconSettings2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Configuraciones',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Parámetros',
      type: 'item',
      url: '/app/settings',
      icon: icons.IconSettings
    }
  ]
};

export default pages;
