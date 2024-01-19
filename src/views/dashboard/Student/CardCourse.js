/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonEarningCard from 'components/cards/Skeleton/EarningCard';
import { IconPlayerPlay } from '@tabler/icons';
import { genConst } from 'store/constant';
import userDefault1 from 'assets/images/profile/gk.png';
import userDefault2 from 'assets/images/profile/so.png';
//import { IconBookmark } from '@tabler/icons';
//import { genConst } from 'store/constant';

const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: '#373a7f',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative'
}));

const CardCourse = ({ isLoading, userId, courseName, courseOwner, id }) => {
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container spacing={1}>
              <Grid item lg={9} md={9} sm={9} xs={9}>
                <Typography sx={{ fontSize: '1.250rem', fontWeight: 500, ml: 2, mr: 1, mt: 1.75, color: '#FFF' }}>{courseName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <center>
                  <p style={{ marginLeft: 18 }}>duración</p>
                  <p hidden>
                    {userId} {courseOwner}
                  </p>
                </center>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={9} sx={{ marginTop: 10 }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: genConst.CONST_CREATE_COLOR, borderRadius: 10, width: '6%', margin: 2 }}
                >
                  <IconPlayerPlay size={25} />
                </Button>
              </Grid>
              <Grid item xs={3} sx={{ marginTop: 10 }}>
                <center>
                  {genConst.CONST_STA_ACT == 1 ? (
                    <Avatar src={userDefault1} color="inherit" style={{ width: 40, height: 40 }} />
                  ) : (
                    <Avatar src={userDefault2} color="inherit" style={{ width: 40, height: 40 }} />
                  )}
                </center>
                <p hidden style={{ marginLeft: 18 }}>
                  {id}
                </p>
                <p hidden>
                  {userId} {courseOwner}
                </p>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

CardCourse.propTypes = {
  isLoading: PropTypes.bool,
  userId: PropTypes.string,
  courseName: PropTypes.string,
  courseOwner: PropTypes.string,
  id: PropTypes.string
};

export default CardCourse;
