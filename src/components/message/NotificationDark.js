import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, IconButton } from '@mui/material';
// project imports
import MainCard from 'components/cards/MainCard';
// assets
import { IconMessage, IconTrash } from '@tabler/icons';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#3a3b3c',
  color: theme.palette.secondary.light,
  overflow: 'hidden',
  position: 'relative'
}));

const NotificactionDark = ({ message, submessage }) => {
  const theme = useTheme();

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem
            alignItems="center"
            disableGutters
            sx={{ py: 0 }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" sx={{ mr: 1 }}>
                <IconTrash color="#FFF" size={30} />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.secondary.light[800],
                  color: '#fff'
                }}
              >
                <IconMessage />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.2,
                mb: 0.2,
                ml: 4
              }}
              primary={
                <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, textAlign: 'left', color: '#FFF' }}>
                  {message}
                </Typography>
              }
              secondary={
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, textAlign: 'left', color: '#FFF' }}>
                  {submessage}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
};

NotificactionDark.propTypes = {
  message: PropTypes.string,
  submessage: PropTypes.string
};

export default NotificactionDark;
