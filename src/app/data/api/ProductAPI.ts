import axios from "axios";


type TParams = null | {
  query?: object;
  body?: object;
  id?: string | number;
};

export async function getData(params: TParams) {
  try {
    const { data, status } = await axios.get(
      "https://dummyjson.com/products" + (params?.id ? '/'+params?.id : ''),
      {
        params: params?.query,
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("response status is: ", status);

    return JSON.stringify(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export async function postData(params: TParams) {
  try {
    const { data, status } = await axios.post(
      "https://dummyjson.com/products",
      JSON.stringify(params?.body),

      {
        params: params?.query,
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    console.log("response status is: ", status);

    return JSON.stringify(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
