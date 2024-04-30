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
            <div className="flex flex-col h-screen justify-between">
                <BlogNav categories={categories} />
                <main>
                    {children}
                </main>
                <BlogFooter />
            </div>
        </>
    );
}

export default BlogLayout;