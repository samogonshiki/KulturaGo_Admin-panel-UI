export interface Category { name: string }

export interface Place {
    address: string
    latitude: number
    longitude: number
}

export interface Photo {
    url: string
    alt_text: string
    is_main: boolean
}

export interface Person {
    name: string
    tag: { name: string }
}

export interface Event {
    id: string
    category: Category
    title: string
    description?: string
    place: Place
    starts_at: string
    ends_at: string
    photos: Photo[]
    people: Person[]
}