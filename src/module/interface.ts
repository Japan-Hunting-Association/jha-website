export default interface Topic {
    title_en: string
    title_ja: string
    slug: string
    body_en: string
    body_ja: string
    date: Date
    id: number
    category: TopicCategory
}
export default interface Service {
    name_en: string
    name_ja: string
    slug: string
    inAvailable: boolean
    page_url: string
}

export default interface Product {
    name_en: string
    name_ja: string
    slug: string
    release: Date
    onSale: boolean
    page_url: string
}

interface TopicCategory {
    name_en: string,
    name_ja: string
}
