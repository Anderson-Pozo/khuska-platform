import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Pagination } from '@mui/material';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

import { collProductComment } from 'store/collections';
import { db } from 'config/firebase';
import { CommentItem } from './CommentItem';
import { loadComments } from 'store/product-comment/actions';

const COMMENTS_PER_PAGE = 5;
export const CommentList = ({ productId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.productComments.comments || []);

  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [lastVisibleDocs, setLastVisibleDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (pageNum = 1) => {
    setLoading(true);
    try {
      // Obtener el total de comentarios
      const totalQuery = query(collection(db, collProductComment), where('productId', '==', productId));
      const totalSnapshot = await getDocs(totalQuery);
      setTotalComments(totalSnapshot.size);

      // Consulta paginada
      let commentsQuery;
      if (pageNum === 1) {
        // Primera página
        commentsQuery = query(
          collection(db, collProductComment),
          where('productId', '==', productId),
          orderBy('createAt', 'desc'),
          limit(COMMENTS_PER_PAGE)
        );
      } else {
        // Páginas subsiguientes
        const startAfterDoc = lastVisibleDocs[pageNum - 2];
        // console.log({ startAfterDoc });
        commentsQuery = query(
          collection(db, collProductComment),
          where('productId', '==', productId),
          orderBy('createAt', 'desc'),
          startAfter(startAfterDoc),
          limit(COMMENTS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(commentsQuery);

      // Guardar el último documento de cada página
      const newLastVisibleDocs = [...lastVisibleDocs];
      newLastVisibleDocs[pageNum - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisibleDocs(newLastVisibleDocs);

      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch(loadComments(fetchedComments));
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      dispatch(loadComments([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(1);
  }, [productId]);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchComments(value);
  };

  if (loading) {
    return <Typography sx={{ mt: 3 }}>Cargando comentarios...</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      {comments.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </Typography>
      ) : (
        <>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={Math.ceil(totalComments / COMMENTS_PER_PAGE)} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}
    </Box>
  );
};

CommentList.propTypes = {
  productId: PropTypes.string
};
