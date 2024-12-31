import React from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

import { TextField, Button, Rating, Typography, Avatar, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { createDocument } from 'config/firebaseEvents';
import { collProductComment } from 'store/collections';
import { fullDate } from 'utils/validations';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from 'store/product-comment/actions';

const CommentSchema = Yup.object().shape({
  comment: Yup.string().trim().required('El comentario es obligatorio'),
  rating: Yup.number().required('La calificación es obligatoria').min(1, 'Debes seleccionar una calificación')
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  border: `2px solid ${theme.palette.primary.light}`,
  boxShadow: theme.shadows[2]
}));

export const CommentForm = ({ productId, authUser }) => {
  // console.log({ authUser, productId });
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log({ values, authUser, productId });
    setSubmitting(true);
    try {
      const ide = uuid();
      const productComment = {
        id: ide,
        productId: productId,
        comment: values.comment,
        rating: values.rating,
        user: {
          id: authUser.uid,
          userName: authUser.displayName,
          userLogo: authUser.photoURL
        },
        createAt: fullDate(),
        updateAt: null,
        state: 1
      };
      await createDocument(collProductComment, ide, productComment);
      dispatch(addComment(productComment));
      toast.success('Comentario guardado con éxito');
      resetForm();
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      toast.error('Hubo un error al enviar tu comentario');
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser) {
    return (
      <Box textAlign="center" p={2}>
        <Typography variant="body2">Debes iniciar sesión para dejar un comentario</Typography>
        <Link to="/market/login">
          <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
            Iniciar sesión
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{
        comment: '',
        rating: 0
      }}
      validationSchema={CommentSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ submitForm, isSubmitting, errors, touched, values, handleBlur, handleChange }) => (
        <Form>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              p: 3,
              boxShadow: 1
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <StyledAvatar src={authUser?.photoURL || ''} alt={authUser?.displayName || 'Usuario'} />
              <Box>
                <Typography variant="subtitle1">{authUser?.displayName || 'Usuario '}</Typography>
                <Field
                  name="rating"
                  component={({ field }) => (
                    <Rating
                      name="rating"
                      value={values.rating}
                      onChange={(event, newValue) => {
                        // setRating(newValue);
                        field.onChange({ target: { name: 'rating', value: +newValue } });
                      }}
                    />
                  )}
                />
                {touched.rating && errors.rating && (
                  <Typography color="error" variant="caption">
                    {errors.rating}
                  </Typography>
                )}
              </Box>
            </Stack>
            <TextField
              name="comment"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Escribe tu comentario aquí..."
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.comment && Boolean(errors.comment)}
              helperText={touched.comment && errors.comment ? errors.comment : `${values.comment.length} / 500`}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <Box textAlign="right">
              <Button variant="contained" color="primary" onClick={submitForm} disabled={isSubmitting} size="small">
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

CommentForm.propTypes = {
  productId: PropTypes.string.isRequired,
  authUser: PropTypes.object
};
