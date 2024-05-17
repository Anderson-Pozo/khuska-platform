import React from 'react';
import { uiStyles } from './styles';
import { Grid, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import a1 from 'assets/images/benefits/1.jpg';
import a2 from 'assets/images/benefits/2.jpg';
import { Link as Scroll } from 'react-scroll';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function About() {
  return (
    <div style={uiStyles.rootImage} id="about">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1} sx={{ marginTop: 10 }}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <center>
                <Card style={uiStyles.rootPlaceCard}>
                  <CardMedia style={{ height: 200 }} image={a1} title="Contemplative Reptile" />
                  <CardContent style={{ height: 150 }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>{'Somos KHUSKA'}</h1>
                    <p style={{ fontSize: '0.8rem', color: '#fff' }}>
                      {
                        'Emprendedores apoyándote a crear, innovar, brindar crecimiento y sostenibilidad en el tiempo para tu negocio y empresa.'
                      }
                    </p>
                  </CardContent>
                </Card>
              </center>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <center>
                <Card style={uiStyles.rootPlaceCard}>
                  <CardMedia style={{ height: 200 }} image={a2} title="Contemplative Reptile" />
                  <CardContent style={{ height: 150 }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>{''}</h1>
                    <p style={{ fontSize: '0.8rem', color: '#fff' }}>
                      {
                        'Institución dedicada a brindar productos y servicios únicos, oportunos y excepcionales que apoyan a emprendedores en la consecución de sus metas.'
                      }
                    </p>
                  </CardContent>
                </Card>
              </center>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <center>
                <Card style={uiStyles.rootPlaceCard}>
                  <CardMedia style={{ height: 200 }} image={a1} title="Contemplative Reptile" />
                  <CardContent style={{ height: 150 }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>{''}</h1>
                    <p style={{ fontSize: '0.8rem', color: '#fff' }}>
                      {
                        'Siendo el conocimiento, la calidad de vida y los valores compartidos; el eje principal para el desarrollo de nuestros colaboradores y de la sociedad en general.'
                      }
                    </p>
                  </CardContent>
                </Card>
              </center>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <center>
                <Scroll to="contacts" smooth={true}>
                  <IconButton>
                    <ExpandMoreIcon style={uiStyles.goDown} />
                  </IconButton>
                </Scroll>
              </center>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
