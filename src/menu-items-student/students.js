// assets
import { IconDashboard, IconCalendarEvent, IconBook } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconCalendarEvent, IconBook };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const students = {
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
      id: 'courses',
      title: 'Cursos',
      type: 'item',
      url: '/app/courses',
      icon: icons.IconBook,
      breadcrumbs: false
    }
  ]
};

export default students;
