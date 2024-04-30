import BlogFooter from '@/Components/BlogFooter';
import BlogNav from '@/Components/BlogNav';
import { Category } from '@/types/global';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import moment from 'moment/min/moment-with-locales';
import { Toaster } from '@/Components/ui/toaster';

const BlogLayout = ({ categories, children }: PropsWithChildren<{ categories: Category[] }>) => {
    moment().locale('es')

    return (
        <>
            <div className="flex flex-col h-screen justify-between">
                <BlogNav categories={categories} />
                <main className='my-5'>
                    {children}
                </main>
                <BlogFooter />
            </div>
            <Toaster />
        </>
    );
}

export default BlogLayout;