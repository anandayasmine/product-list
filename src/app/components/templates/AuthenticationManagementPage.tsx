import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, CardHeader, Skeleton, Stack, Tooltip } from '@mui/material';
import { indigo } from '@mui/material/colors';

type TProps = {
  data: any,
  title: string
}

export default function MediaCard(props: TProps) {

  const {
    data
  } = props

  return (
    <div className='main-content plain'>
      <Card sx={{ maxWidth: 475 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: indigo[50] }} aria-label="recipe" src={data?.image} />
          }
          title={
            <Tooltip title={'Username'}>
              {data?.username}
            </Tooltip>
          }
        >

        </CardHeader>
        <CardContent>
          <Stack>
            <Typography gutterBottom variant="h5" component="div">
              {
                (!data?.firstName) ?
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  :
                  data?.firstName + ' ' + data?.lastName
              }
            </Typography>

          </Stack>

          <TableContainer>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Username
                  </TableCell>
                  <TableCell align="right">{data.username || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Phone
                  </TableCell>
                  <TableCell align="right">{data.phone || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell align="right">{data.email || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Mac Address
                  </TableCell>
                  <TableCell align="right">{data.macAddress || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    User Agent
                  </TableCell>
                  <TableCell align="right">{data.userAgent || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>

                <TableRow sx={{ 'th, td': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    IP Address
                  </TableCell>
                  <TableCell align="right">{data.ip || <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</TableCell>
                </TableRow>


              </TableBody>
            </Table>
          </TableContainer>


        </CardContent>
        <CardActions className='jcontent-end' sx={{ paddingBottom: '1.3rem' }}>
          <Button variant="outlined" size="small" color="error">Delete Account</Button>
          <Button variant="contained" size="small">Logout</Button>
        </CardActions>
      </Card>
    </div>
  );
}
