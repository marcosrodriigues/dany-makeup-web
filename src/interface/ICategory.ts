export default interface ICategory {
    id: number,
    title: string,
    image_url: string,
    available: boolean,
    qtd_produtos?: number
}