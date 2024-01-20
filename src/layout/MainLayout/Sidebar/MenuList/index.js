import PropTypes from 'prop-types';
// material-ui
import { Typography } from '@mui/material';
// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import menuItemsStudent from 'menu-items-student';

import { genConst } from 'store/constant';

const MenuList = ({ user }) => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsNormalUsers = menuItemsStudent.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{user === genConst.CONST_PRO_ADM ? <>{navItems}</> : <>{navItemsNormalUsers}</>}</>;
};

MenuList.propTypes = {
  user: PropTypes.number
};

export default MenuList;
