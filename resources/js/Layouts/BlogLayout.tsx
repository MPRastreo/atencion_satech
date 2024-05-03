import BlogFooter from '@/Components/BlogFooter';
import BlogNav from '@/Components/BlogNav';
import { Category } from '@/types/global';
import { PropsWithChildren } from 'react';
import moment from 'moment/min/moment-with-locales';
import { Toaster } from '@/Components/ui/toaster';
import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { ArrowUp } from 'lucide-react';

const useScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { isVisible, handleClick };
}

const BlogLayout = ({ categories, children }: PropsWithChildren<{ categories: Category[] }>) => {
    moment().locale('es')

    const { isVisible, handleClick } = useScrollToTop();

    return (
        <>
            <div className="flex flex-col h-screen justify-between">
                <BlogNav categories={categories} />
                <main className={`my-5 ${route().current('content.detail') ? 'mb-5 mt-0' : ''}`}>
                    {children}
                </main>
                {isVisible &&
                    <div className="fixed bottom-4 right-4 z-50">
                        <button
                            type='button'
                            className="animate-bounce rounded-full bg-primary-foreground py-4 px-4 shadow-lg hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={handleClick}
                        >
                            <ArrowUp className='h-5 w-5' />
                        </button>
                    </div>
                }
                <BlogFooter />
            </div>
            <Toaster />
        </>
    );
}

export default BlogLayout;