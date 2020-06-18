import ICategory from './ICategory';
import IManufacturer from './IManufacturer';

export default interface IProduct {
    id: number,
    name: string,
    shortDescription: string,
    fullDescription: string,
    value: number,
    amount: number,
    available: boolean,
    categorys: ICategory[],
    manufacturer: IManufacturer,
    mainImage: string,
    images: string[],
    manufacturer_id: number,
}