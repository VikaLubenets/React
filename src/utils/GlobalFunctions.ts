import { BASE_URL } from './Constants';
import { IProductList } from './GeneralTypes';

export async function getProductData(itemId: number) {
  try {
    const url = `${BASE_URL}/${itemId}`;
    const productDataResponse = await fetch(url);
    const data = await productDataResponse.json();
    return data;
  } catch (error) {
    console.log('Error with fetching data for product details: ', error);
  }
}

export async function getData(url: string) {
  try {
    const response = await fetch(url);
    const data: IProductList = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}
