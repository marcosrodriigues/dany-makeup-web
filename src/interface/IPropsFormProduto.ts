import IProduct from "./IProduct";
import ICategory from "./ICategory";
import IProductImages from "./IProductImages";

export default interface IPropsFormProduct {
    product?: any,
    categorys?: ICategory[],
    images?: IProductImages[],
    estoques?: any[]
}