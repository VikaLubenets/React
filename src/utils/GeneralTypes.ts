export enum Item {
  Climate = 'default',
}

export interface IPlanet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface SwapiData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPlanet[];
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
  TITLE = 'Title: ',
  DESCRIPTION = 'Description: ',
  PRICE = 'Price: ',
  DISCOUNT_PERCENTAGE = 'Discount: ',
  RATING = 'Rating: ',
  STOCK = 'Stock: ',
  BRAND = 'Brand: ',
  CATEGORY = 'Category: ',
  THUMBNAIL = 'Thumbnail: ',
  IMAGES = 'Images: ',
}

export interface IProductList {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
