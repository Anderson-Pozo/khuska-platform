import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Chip, Select, MenuItem } from '@mui/material';
import { uiStyles } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import avatarImg from 'assets/images/profile/profile-picture-6.jpg';
import addImage from 'assets/images/addImage.png';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { getCategories } from 'config/firebaseEvents';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15,
      color: '#FFF'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      color: '#FFF',
      '@media (hover: none)': {
        backgroundColor: '#242526'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      color: '#FFF',
      border: '1px solid #242526'
    },
    '& .MuiInputLabel-outlined': {
      color: '#FFF'
    }
  }
}));

export default function Item() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('idType');
  const classes = useStyles();
  //Variables
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [location, setLocation] = useState('');
  //const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const fileobj = [];

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleSaveProduct = () => {
    const idProduct = generateId(10);
    if (!name || !description || !price || !quantity || !category || !state || !location) {
      console.log('Campos Obligatorios');
    } else {
      const object = {
        id: idProduct,
        name: name,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: category,
        state: state,
        location: location,
        createAt: fullDate()
      };
      console.log(object);
    }
  };

  /*const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage['id'] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };*/

  const handleChange = (event) => {
    let files = event.target.files;
    fileobj.push(files);
    let reader;

    for (var i = 0; i < fileobj[0].length; i++) {
      reader = new FileReader();
      reader.readAsDataURL(fileobj[0][i]);
      reader.onload = (event) => {
        preview.push(event.target.result); // update the array instead of replacing the entire value of preview

        setPreview([...new Set(preview)]); // spread into a new array to trigger rerender
      };
    }
  };

  console.log('images: ', preview);

  const handleChangeCategory = (e) => {
    setCategory(null);
    //const result = categories.find(({ value }) => value === e.target.value);
    setCategory(e.target.value);
    //setSearch(result.name.toLowerCase());
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12} md={5} lg={5} sx={uiStyles.layout}>
            <div style={uiStyles.main}>
              <div style={uiStyles.sidebar}>
                <Typography
                  variant="h3"
                  noWrap
                  component="div"
                  style={{ color: '#FFF', paddingBottom: 20, paddingTop: 20, paddingLeft: 10, fontWeight: 'bold' }}
                >
                  Artículo en Venta
                </Typography>
                <div style={{ width: '100%', height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                  <Chip
                    avatar={<img alt="User" src={avatarImg} />}
                    label={<span style={{ color: '#FFF' }}>Paúl Alejandro Alvarez Corral</span>}
                    variant="outlined"
                  />
                </div>
                <div style={{ width: '100%', height: 240, backgroundColor: 'transparent' }}>
                  Fotos · {preview.length}/10 - Puedes agregar un máximo de 10 fotos.
                  {preview.length == 10 ? <></> : <input type="file" multiple onChange={handleChange} />}
                  <div
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 220,
                      borderWidth: 0.1,
                      borderStyle: 'groove',
                      borderColor: '#3a3b3c',
                      borderRadius: 10,
                      marginTop: 5,
                      cursor: 'pointer',
                      paddingTop: 5,
                      paddingLeft: 10
                    }}
                  >
                    {preview.length > 0 ? (
                      (preview || []).map((url, i) => (
                        <img key={i} style={{ width: 78, height: 95, borderRadius: 12, padding: 2 }} src={url} alt="firebaseImg" />
                      ))
                    ) : (
                      <div>
                        <center>
                          <img src={addImage} alt="addImage" width={60} style={{ marginTop: 20 }} />
                          <p>AGREGAR FOTOS</p>
                          <span>o arrástralas y suéltalas</span>
                        </center>
                      </div>
                    )}
                  </div>
                </div>
                <h4 style={{ marginTop: 40 }}>Obligatorio</h4>
                <span>Proporciona una descripción que sea lo más detallada posible.</span>
                <div style={{ padding: 1, margin: 5 }}>
                  <TextField
                    variant="filled"
                    type="text"
                    className={classes.root}
                    fullWidth
                    label="Título"
                    color="info"
                    onChange={(ev) => setName(ev.target.value)}
                    sx={{ input: { color: '#FFF' } }}
                  />
                  <TextField
                    variant="filled"
                    type="number"
                    className={classes.root}
                    fullWidth
                    label="Precio"
                    color="info"
                    onChange={(ev) => setPrice(ev.target.value)}
                    sx={{ input: { color: '#FFF' } }}
                  />
                  <TextField
                    variant="filled"
                    type="number"
                    className={classes.root}
                    fullWidth
                    label="Cantidad"
                    color="info"
                    onChange={(ev) => setQuantity(ev.target.value)}
                    sx={{ input: { color: '#FFF' } }}
                  />
                  <Select
                    labelId="category"
                    id="category"
                    label="Categoría"
                    className={classes.root}
                    onChange={handleChangeCategory}
                    fullWidth
                    defaultValue={0}
                    style={{ color: 'red' }}
                    inputProps={{
                      MenuProps: {
                        MenuListProps: {
                          sx: {
                            backgroundColor: 'red',
                            color: '#FFF'
                          }
                        }
                      }
                    }}
                  >
                    {categories.map((c, key) => (
                      <MenuItem key={key} value={c.value} style={{ textAlign: 'left' }}>
                        {c.value}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    variant="filled"
                    type="text"
                    className={classes.root}
                    fullWidth
                    label="Estado"
                    color="info"
                    onChange={(ev) => setState(ev.target.value)}
                    sx={{ input: { color: '#FFF' } }}
                  />
                  <TextField
                    variant="filled"
                    className={classes.root}
                    fullWidth
                    label="Descripción"
                    color="info"
                    multiline
                    rows={5}
                    rowsMax={10}
                    inputProps={{ style: { color: '#FFF' } }}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                  <TextField
                    variant="filled"
                    type="text"
                    className={classes.root}
                    fullWidth
                    label="Ubicación"
                    color="info"
                    onChange={(ev) => setLocation(ev.target.value)}
                    sx={{ input: { color: '#FFF' } }}
                  />
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: 10, height: 60 }}
                    onClick={handleSaveProduct}
                  >
                    Siguiente
                  </Button>
                  <h5 style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    Los artículos de KhuskaMarket son públicos, por lo que cualquier persona dentro y fuera de KhuskaMarket puede verlos.
                    Los artículos como animales, drogas, armas, falsificaciones y otros que infringen derechos de propiedad intelectual no
                    están permitidos en KhuskaMarket. Consulta nuestras Políticas de comercio.
                  </h5>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item sm={12} xs={12} md={7} lg={7}>
            <h2>Item: {id}</h2>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
