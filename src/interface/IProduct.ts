import ICategory from './ICategory';

export default interface IProduct {
    id?: number,
    name: string,
    shortDescription: string,
    fullDescription: string,
    value: number,
    amount: number,
    avalable: boolean,
    category: ICategory,
    images: string[]
}