import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';

const headCells = [
  {
    label: 'Day',
  },
  {
    label: 'Time',
  },
  {
    label: 'Guests',
  },
  {
    label: '',
  },
];

const ReservationsTableHead = () => (
  <TableHead>
    <TableRow sx={{ backgroundColor: '#FAFAFA' }}>
      {headCells.map((headCell, index) => (
        <TableCell key={index} align='left' padding='normal'>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            {headCell.label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const ReservationsTable = ({ reservations, onCancel, userId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = useMemo(
    () => reservations.filter((reservation) => reservation.userId === userId),
    [reservations, userId],
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage],
  );
  const checkCancelDisabled = (day, time) => {
    const newDay = dayjs(day).hour(dayjs(time).format('H')).minute(0);
    const difference = newDay.diff(dayjs(), 'minute');
    return difference < 60;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <ReservationsTableHead rowCount={rows.length} />
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell align='left'>
                  {dayjs(row.day).format('dddd, MMMM D, YYYY')}
                </TableCell>
                <TableCell align='left'>
                  {dayjs(row.time).format('HH:mm')}
                </TableCell>
                <TableCell align='left'>{row.guests}</TableCell>
                <TableCell align='right'>
                  <Tooltip title='Cancel'>
                    <span>
                      <IconButton
                        disabled={checkCancelDisabled(row.day, row.time)}
                        onClick={() => onCancel(row.id)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ReservationsTable;
