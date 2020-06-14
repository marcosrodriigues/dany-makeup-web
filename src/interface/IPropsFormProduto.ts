import IProduct from "./IProduct";
import ICategory from "./ICategory";
import IProductImages from "./IProductImages";

export default interface IPropsFormProduct {
    product?: IProduct,
    categorys?: ICategory[],
    images?: IProductImages[]
}