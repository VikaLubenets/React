export enum Item {
  Climate = 'default',
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export enum Product {
  ID = 'id',
  TITLE = 'Title',
  DESCRIPTION = 'Description',
  PRICE = 'Price',
  DISCOUNT_PERCENTAGE = 'Discount',
  RATING = 'Rating',
  STOCK = 'Stock',
  BRAND = 'Brand',
  CATEGORY = 'Category',
  THUMBNAIL = 'Thumbnail',
  IMAGES = 'Images',
}

export interface IProductList {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
