import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import CardCourse from './CardCourse';
import AnnouncementDark from './AnnouncementDark';
import { getUserCourses, getUserDataObject } from 'config/firebaseEvents';

const Dashboard = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(false);
    getUserDataObject().then((user) => {
      setUserId(user.uid);
      getUserCourses(user.uid).then((items) => {
        setList(items);
      });
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Typography variant="h3" component="h4" style={{ margin: 15 }}>
        Todos los Cursos
      </Typography>
      <Grid item xs={12}>
        {list.length > 0 ? (
          <Grid container spacing={1}>
            {list.map((cou) => (
              <Grid
                key={cou.id}
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className="course-item"
                onClick={() => {
                  console.log(cou.idCourse);
                  navigate({
                    pathname: '/app/course',
                    search: `?id=${cou.idCourse}`
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                <CardCourse isLoading={isLoading} userId={userId} courseName={cou.courseName} id={cou.idCourse} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AnnouncementDark isLoading={isLoading} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
