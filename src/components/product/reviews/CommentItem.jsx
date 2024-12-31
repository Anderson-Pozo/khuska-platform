import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, Rating, Typography } from '@mui/material';

export const CommentItem = ({ comment }) => {
  return (
    <Box mb={2}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar src={comment.user.userLogo} alt={comment.user.userName} />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle2">{comment.user.userName}</Typography>
          <Rating value={comment.rating} readOnly size="small" />
        </Grid>
      </Grid>
      <Typography variant="body2" paragraph sx={{ mb: 0.5 }}>
        {comment.comment}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {comment.createAt}
      </Typography>
    </Box>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};
