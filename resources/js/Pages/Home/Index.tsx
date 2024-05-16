import moment from 'moment/min/moment-with-locales';
import { PageProps } from '@/types';
import { Category, Content } from '@/types/global';
import BlogLayout from '@/Layouts/BlogLayout';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/Components/ui/badge';
import HomeCategories from './Partials/HomeCategories';

const Home = ({ categories, content }: PageProps<{ categories: Category[], content: Content[] }>) => {
    const filteredCategories: Category[] = categories.slice(0, 4);
    const filteredArticles: Content[] = content.slice(1, 7);
    const { title, thumbnail, description, category, id }: Content = content[0];

    return (
        <>
            <Head title={ "Inicio" } />
            <BlogLayout categories={categories}>
                <div className='mb-auto px-10 py-5'>
                    <div dir="ltr" data-orientation="horizontal" className="space-y-4">
                        <div
                            data-state="active"
                            data-orientation="horizontal"
                            role="tabpanel"
                            aria-labelledby="radix-:rqu:-trigger-overview"
                            id="radix-:rqu:-content-overview"
                            tabIndex={0}
                            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
                            style={{ animationDuration: "0s" }}
                        >
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-9">
                                <div className="rounded-xl border bg-card text-card-foreground shadow col-span-5">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-0">
                                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                            Últimas actualizaciones
                                        </h3>
                                    </div>
                                    <Link href={route('content.detail', { slug: category?.slug, id: id })}>
                                        <div className="pb-8 pt-4 px-6">
                                            <div className="space-y-3 w-full h-72 2xl:h-96 relative">
                                                <div className="overflow-hidden rounded-md h-full w-full">
                                                    <img
                                                        alt="Thinking Components"
                                                        loading="lazy"
                                                        decoding="async"
                                                        data-nimg={1}
                                                        className="absolute inset-0 w-full h-full object-cover transition-all rounded-lg"
                                                        src={thumbnail}
                                                        style={{ color: "transparent" }}
                                                    />
                                                    <div className="space-y-1 lg:hidden absolute p-6 bottom-0 text-white w-full">
                                                        <h3 className="font-medium leading-none">{title}</h3>
                                                        <p className="text-xs text-slate-300 truncate">{description}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-sm pt-3 hidden lg:block ">
                                                    <h3 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 truncate">{title}</h3>
                                                    <p className="text-md text-slate-700 truncate">{description}</p>
                                                    <Badge variant='secondary'>{`${category?.name[0].toUpperCase()}${category?.name.substring(1, category?.name.length)}`}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="rounded-xl border bg-card text-card-foreground shadow col-span-5 lg:col-span-4 w-full">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                            Te podr&iacute;a interesar
                                        </h3>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-6 place-items-stretch">
                                            {
                                                filteredArticles.map(({ id, title, thumbnail, created_at }, i) =>
                                                    <Link key={`${title} - ${i}`} href={route('content.detail', { slug: category?.slug, id: id })}>
                                                        <div className="space-y-3">
                                                            <span data-state="closed">
                                                                <div className="overflow-hidden rounded-md">
                                                                    <img
                                                                        alt="Thinking Components"
                                                                        loading="lazy"
                                                                        height={60}
                                                                        decoding="async"
                                                                        data-nimg={1}
                                                                        className="h-auto w-auto object-cover transition-all hover:scale-110 aspect-square"
                                                                        src={thumbnail}
                                                                        style={{ color: "transparent" }}
                                                                    />
                                                                </div>
                                                            </span>
                                                            <div className="space-y-1 text-sm">
                                                                <h3 className="font-medium leading-none truncate">{`${title[0]}${title.substring(1, title.length)}`}</h3>
                                                                <small className="text-xs text-muted-foreground truncate">
                                                                    {moment(created_at).locale('es').fromNow()}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <HomeCategories categories={filteredCategories} />
                        </div>
                    </div>

                </div>
            </BlogLayout>
        </>
    );
}

export default Home;
