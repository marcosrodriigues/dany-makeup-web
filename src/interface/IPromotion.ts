import IProduct from "./IProduct";

interface IPromotion {
    id: number,
    name: string,
    start: Date,
    end: Date
    originalValue: number
    discountType: string
    discount: number
    promotionValue: number
    image_url: string
    description: string
    images: string[],
    products: IProduct[]
}

export default IPromotion;