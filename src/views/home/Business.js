import React from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput
} from '@mui/material';
import { uiStyles } from 'components/search/styles';
import { useGetBusiness } from 'hooks/useGetBusiness';
import { cities, provinces } from 'store/arrays';
import InputAdornment from '@mui/material/InputAdornment';
import { IconSearch } from '@tabler/icons';

function searchingData(search) {
  return function (x) {
    return (
      x.name.toLowerCase().includes(search) ||
      x.name.toUpperCase().includes(search) ||
      x.city.toLowerCase().includes(search) ||
      x.city.toUpperCase().includes(search) ||
      x.province.toLowerCase().includes(search) ||
      x.province.toUpperCase().includes(search) ||
      !search
    );
  };
}

const Business = () => {
  //let navigate = useNavigate();
  const businessList = useGetBusiness();
  const [search, setSearch] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [province, setProvince] = React.useState(null);

  function handleChangeCity(e) {
    setCity(null);
    console.log(e.target.value);
    const result = cities.find(({ value }) => value === e.target.value);
    console.log(result.name.toLowerCase());
    setCity(e.target.value);
    setSearch(result.name.toLowerCase());
  }

  function handleChangeProvince(e) {
    setProvince(null);
    console.log(e.target.value);
    const result = provinces.find(({ code }) => code === e.target.value);
    console.log(result.name.toLowerCase());
    setProvince(e.target.value);
    setSearch(result.name.toLowerCase());
  }

  return (
    <div style={uiStyles.container}>
      <Box sx={{ p: 0 }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <InputLabel id="name" style={{ textAlign: 'left', color: '#000', marginLeft: 10 }}>
                  Filtrar por nombre de Negocio
                </InputLabel>
                <FormControl fullWidth sx={{ m: 0 }}>
                  <OutlinedInput
                    id="outlined-adornment-search"
                    startAdornment={
                      <InputAdornment position="start">
                        <IconSearch />
                      </InputAdornment>
                    }
                    label="Amount"
                    onChange={(ev) => setSearch(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ p: 0 }}>
                  <InputLabel id="province" style={{ textAlign: 'left', color: '#000' }}>
                    Provincia
                  </InputLabel>
                  <Select
                    labelId="province-select-label"
                    id="province"
                    value={province || 0}
                    label="Provincia"
                    onChange={handleChangeProvince}
                    fullWidth
                    defaultValue={0}
                  >
                    {provinces
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((p, key) => (
                        <MenuItem key={key} value={p.code} style={{ textAlign: 'left' }}>
                          {p.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ p: 0 }}>
                  <InputLabel id="city" style={{ textAlign: 'left', color: '#000' }}>
                    Ciudad
                  </InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city"
                    value={city || 0}
                    label="Ciudad"
                    onChange={handleChangeCity}
                    fullWidth
                    defaultValue={0}
                  >
                    {cities
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((c, key) => (
                        <MenuItem key={key} value={c.value} style={{ textAlign: 'left' }}>
                          {c.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Grid container spacing={0.2}>
            {businessList.filter(searchingData(search)).map((item) => {
              return (
                <Grid key={item.id} item xs={6} sm={6} md={3} lg={2}>
                  <Card sx={{ maxWidth: '100%', height: 270, borderRadius: 3, backgroundColor: '#242526', cursor: 'pointer' }}>
                    <CardMedia sx={{ borderRadius: 3, padding: 0.5 }} component="img" height={194} image={item.logo} alt="Portada img" />
                    <CardContent sx={{ backgroundColor: '#242526', marginTop: -2, paddingLeft: 1, paddingRight: 1 }}>
                      <Typography variant="h5" color="#FFF">
                        {item.name}
                      </Typography>
                      <p
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: '#FFF',
                          fontSize: 11,
                          textOverflow: 'ellipsis',
                          maxWidth: '100%'
                        }}
                      >
                        {item.province + ' ' + item.city}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Business;
