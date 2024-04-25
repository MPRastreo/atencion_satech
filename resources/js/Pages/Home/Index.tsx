import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Category } from '@/types/global';
import HomeNav from './Partials/HomeNav';
import HomeFooter from './Partials/HomeFooter';

const Home = ({ categories }: PageProps<{ categories: Category[] }>) => {

    return (
        <>
            <Head title="Home" />
            <div className="flex flex-col h-screen justify-between">
                <HomeNav categories={categories} />
                <main className="mb-auto px-10">Content</main>
                <HomeFooter />
            </div>
        </>
    );
}

export default Home;
