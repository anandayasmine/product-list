'use client'

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { CustomerAPI, ProductAPI } from '@/app/data/api';
import Link from 'next/link';
import Router from 'next/router';
import { MainLayout } from '@/app/components/layouts'

import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

interface Data {
  id: string
  total: number
  totalProducts: number
  totalQuantity: number
  discountedTotal: number
  userId: string
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  editable?: boolean;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    editable: false,
    label: 'ID',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'totalProducts',
    numeric: true,
    disablePadding: false,
    label: 'Total Products',
  },
  {
    id: 'totalQuantity',
    numeric: true,
    disablePadding: false,
    label: 'Total Quantity',
  },
  {
    id: 'discountedTotal',
    numeric: true,
    disablePadding: false,
    editable: false,
    label: 'Discounted Total',
  },
  {
    id: 'userId',
    numeric: true,
    disablePadding: false,
    editable: false,
    label: 'User Id',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title?: string,
  onSubmitForm?: (formValue:any) => Promise<void>,

}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {

  interface LooseObject {
    [key: string]: any
  }
  const { numSelected, title } = props;

  const [openModalForm, setOpenModalForm] = React.useState(false)
  const [formValue, setFormValue] = React.useState<LooseObject>({})

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        </>
      )}
      <Tooltip title="Add">
        <IconButton color="primary" onClick={() => setOpenModalForm(true)}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={openModalForm}
        onClose={() => setOpenModalForm(false)}
      >
        <Box className='card'>
          <Paper sx={{ maxWidth: '90vw', padding: '1rem', width: '400px' }}>
            <Stack spacing={1}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h5'>Add Customer</Typography>
                <IconButton onClick={() => setOpenModalForm(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              {
                headCells?.map((item) => {
                  if (item.editable != false) {
                    return (
                      <TextField key={'add-item-' + item?.id} label={item.label} variant="outlined"
                        onChange={(e) => {

                          const newFormValue = { ...(formValue || {}) }

                          newFormValue[item.id] = e.target.value
                          console.log("🚀 ~ file: CustomerManagementPage.tsx ~ line 287 ~ headCells?.map ~ newFormValue", newFormValue)

                          setFormValue(newFormValue)

                        }}
                      />
                    )
                  }
                })
              }
              <Button onClick={() => {
                setOpenModalForm(false)
                if (props.onSubmitForm) {

                  props.onSubmitForm(formValue)
                  console.log("🚀 ~ file: CustomerManagementPage.tsx ~ line 296 ~ EnhancedTableToolbar ~ formValue", formValue)
                }
              }} variant='contained'>Submit</Button>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </Toolbar>
  );
}

type TProps = {
  getData: () => Promise<any>,
  onSubmitForm?: (formValue:any) => Promise<void>,
  title?: string,
}

export default function EnhancedTable(props: TProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Array<Data>>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, title: string) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {

    document.querySelector('thead')?.scrollIntoView()

    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (title: string) => selected.indexOf(title) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => {

      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    },
    [order, orderBy, page, rowsPerPage, rows],
  )

  const setData = () => {

    (async () => {

      const data: any = await props.getData()
      setRows(data || [])

    })()
  }


  React.useEffect(() => {

    try {

      setData()

    }
    catch (err) {

      console.log("🚀 ~ file: index.tsx ~ line 340 ~ React.useEffect ~ err", err)

    }

  }, [])

  return (
    <Box className='main-content'>
      <Paper className='container'>
        <EnhancedTableToolbar numSelected={selected.length} title={props.title} onSubmitForm={props.onSubmitForm} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      <a onClick={() => {
                        localStorage.setItem(row.id, JSON.stringify(row))
                        Router.push('/order/' + row?.id)
                      }}>
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align={typeof row.total == 'number' ? 'right' : 'left'}>{row.total}</TableCell>
                    <TableCell align={typeof row.totalProducts == 'number' ? 'right' : 'left'}>{row.totalProducts}</TableCell>
                    <TableCell align={typeof row.totalQuantity == 'number' ? 'right' : 'left'}>{row.totalQuantity}</TableCell>
                    <TableCell align={typeof row.discountedTotal == 'number' ? 'right' : 'left'}>{row.discountedTotal}</TableCell>
                    <TableCell align={typeof row.userId == 'number' ? 'right' : 'left'}>{row.userId}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
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
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className='float-bottom'
        />
      </Paper>
    </Box>
  )
}
