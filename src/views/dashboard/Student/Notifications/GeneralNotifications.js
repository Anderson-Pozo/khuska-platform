import React, { useEffect } from 'react';

import { Paper, Avatar, Grid } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { uiStyles } from './Notifications.styles';
import MessageDark from 'components/message/MessageDark';
import { collGenNoti } from 'store/collections';
import { getDocuments } from 'config/firebaseEvents';
import { titles, inputLabels } from './Notifications.texts';
import User1 from 'assets/images/profile/profile-picture-6.jpg';

//Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GeneralNotifications = () => {
  const [dataList, setDataList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = async () => {
    const list = [];
    const querySnapshot = await getDocuments(collGenNoti);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setDataList(list);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <ToastContainer />
      {dataList.length > 0 ? (
        <Paper sx={uiStyles.paper}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell key="id-col1" align="left" style={{ minWidth: 60, fontWeight: 'bold' }}>
                    {inputLabels.tableCol1}
                  </TableCell>
                  <TableCell key="id-col2" align="left" style={{ minWidth: 200, fontWeight: 'bold' }}>
                    {inputLabels.tableCol2}
                  </TableCell>
                  <TableCell key="id-col3" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {inputLabels.tableCol3}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                  <TableRow hover key={r.id}>
                    <TableCell align="left">
                      <Avatar src={r.avatar || User1} color="inherit" style={{ width: 28, height: 28 }} />
                    </TableCell>
                    <TableCell align="left">{r.message}</TableCell>
                    <TableCell align="left">{r.createAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage={titles.rowsPerPage}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={titles.noRecordsYet} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default GeneralNotifications;
