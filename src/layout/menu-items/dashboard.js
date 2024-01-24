// assets
import { IconDashboard, IconUsers, IconFriends, IconBell, IconShare, IconBuilding, IconNetwork, IconMoneybag } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUsers, IconFriends, IconBell, IconShare, IconBuilding, IconNetwork, IconMoneybag };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Panel Principal',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Panel Principal',
      type: 'item',
      url: '/app/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'admins',
      title: 'Administradores',
      type: 'item',
      url: '/app/admin-users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Usuarios',
      type: 'item',
      url: '/app/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'clients',
      title: 'Clientes',
      type: 'item',
      url: '/app/clients',
      icon: icons.IconFriends,
      breadcrumbs: false
    },
    {
      id: 'network',
      title: 'Red de Negocios',
      type: 'item',
      url: '/app/network',
      icon: icons.IconNetwork
    },
    {
      id: 'benefits',
      title: 'Beneficios',
      type: 'item',
      url: '/app/benefits',
      icon: icons.IconMoneybag
    },
    {
      id: 'business',
      title: 'Negocios',
      type: 'item',
      url: '/app/business',
      icon: icons.IconBuilding
    },
    {
      id: 'share',
      title: 'Compartir',
      type: 'item',
      url: '/app/share',
      icon: icons.IconShare
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      type: 'item',
      url: '/app/notifications',
      icon: icons.IconBell
    }
  ]
};

export default dashboard;
