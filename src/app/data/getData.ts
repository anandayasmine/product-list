import axios from 'axios';

type GetDataDetail = {
  limit: number,
  products: Array<object>,
  skip: number,
  total: number,
};
type GetData = {
  data: Object
};



export default async function getData() {

  try {
    // 👇️ const data: GetData
    const { data, status } = await axios.get<GetDataDetail>(
      'https://dummyjson.com/products',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    
    // 👇️ "response status is: 200"
    console.log('response status is: ', status);
    
    return JSON.stringify(data);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
