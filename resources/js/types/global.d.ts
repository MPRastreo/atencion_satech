import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
    contents?: Content[];
}

export interface Content {
    id: number;
    category_id: number;
    title: string;
    description: string;
    thumbnail: string;
    filepath: string;
    created_at: string;
    updated_at: string;
    category?: Category;
}

export interface Feedback
{
    id: number;
    full_name: string;
    phone_number: string;
    message: string;
    seen: boolean;
    created_at: string;
    updated_at: string;
}