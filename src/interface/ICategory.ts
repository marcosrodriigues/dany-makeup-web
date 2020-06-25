export default interface ICategory {
    id: number,
    title: string,
    description: string,
    image_url: string,
    available: boolean,
    qtd_produtos?: number
}