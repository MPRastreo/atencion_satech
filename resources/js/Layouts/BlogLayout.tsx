import BlogFooter from '@/Components/BlogFooter';
import BlogNav from '@/Components/BlogNav';
import { Category } from '@/types/global';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import moment from 'moment/min/moment-with-locales';

const BlogLayout = ({ categories, children }: PropsWithChildren<{ categories: Category[] }>) => {
    moment().locale('es')

    return (
        <>
            <Head title="Home" />
            <div className="flex flex-col h-screen justify-between">
                <BlogNav categories={categories} />
                <main className="mb-auto px-10 py-5">
                    {children}
                </main>
                <BlogFooter />
            </div>
        </>
    );
}

export default BlogLayout;