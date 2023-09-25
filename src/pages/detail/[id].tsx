'use client'

import * as React from 'react';
import Router from 'next/router';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

interface dataType {
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: Array<string>
}

export default function CardFunction(props: any) {
  
  const [data, setData] = React.useState<dataType>()

  React.useEffect(() => {

    try {

      const id:string = window.location.pathname.split('/')[2]

      // @ts-ignore
      let fetchData = JSON.parse(localStorage.getItem(id) || "")

      setData(fetchData)

    }
    catch (err) {

      console.log("🚀 ~ file: [id].tsx ~ line 37 ~ React.useEffect ~ err", err)

    }
  }, [])



  return (
    <Card className='main-content'>
      <CardHeader
        title={data?.title}
        subheader={data?.brand}
        avatar={
          <Link href='/'>
            <IconButton aria-label="back" >
              <ArrowBackIosIcon />
            </IconButton>
          </Link>
        }
      />
      <div className='wrap-card-media grid-row'>
        {
          data?.images?.map((item, index) =>
            <CardMedia
              key={'data-image-' + index}
              component="img"
              height="194"
              image={item}
              alt={data?.title + ' ' + index}
            />
          )
        }
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data?.description}
        </Typography>
      </CardContent>
    </Card>
  );
}