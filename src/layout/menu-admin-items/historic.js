// assets
import { IconFriends, IconUsers, IconFileReport } from '@tabler/icons';

// constant
const icons = { IconFriends, IconUsers, IconFileReport };

const historic = {
  id: 'historic',
  title: 'Históricos y Logs',
  type: 'group',
  children: [
    {
      id: 'logs',
      title: 'Logs',
      type: 'item',
      url: '/main/logs',
      icon: icons.IconFileReport,
      breadcrumbs: false
    }
  ]
};

export default historic;
