import moment from 'moment/min/moment-with-locales';
import { PageProps } from '@/types';
import { Category, Content } from '@/types/global';
import BlogLayout from '@/Layouts/BlogLayout';
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Link } from '@inertiajs/react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';

const Home = ({ categories, content }: PageProps<{ categories: Category[], content: Content[] }>) => {
    const filteredCategories: Category[] = categories.slice(0, 4);
    const filteredArticles: Content[] = content.slice(1, 7);
    const { title, thumbnail, description, category }: Content = content[0];

    return (
        <>
            <BlogLayout categories={categories}>
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
                                <div className="pb-8 pt-4 px-6">
                                    <div className="space-y-3 w-full h-72 relative">
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
                                            <div className="space-y-1 lg:hidden absolute p-6 bottom-0 text-white">
                                                <h3 className="font-medium leading-none">{title}</h3>
                                                <p className="text-xs text-slate-300">{description}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm pt-3 hidden lg:block ">
                                            <h3 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 truncate">{title}</h3>
                                            <p className="text-md text-slate-700 truncate">{description}</p>
                                            <Badge variant='secondary'>{`${category?.name[0]}${category?.name.substring(1, category?.name.length)}`}</Badge>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="rounded-xl border bg-card text-card-foreground shadow col-span-5 lg:col-span-4 w-full">
                                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Te podr&iacute;a interesar
                                    </h3>
                                </div>
                                <div className="p-6 pt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-stretch">
                                        {
                                            filteredArticles.map(({ title, thumbnail, created_at }, i) =>
                                                <div key={`${title} - ${i}`} className="space-y-3">
                                                    <span data-state="closed">
                                                        <div className="overflow-hidden rounded-md">
                                                            <img
                                                                alt="Thinking Components"
                                                                loading="lazy"
                                                                height={60}
                                                                decoding="async"
                                                                data-nimg={1}
                                                                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
                                                                src={thumbnail}
                                                                style={{ color: "transparent" }}
                                                            />
                                                        </div>
                                                    </span>
                                                    <div className="space-y-1 text-sm">
                                                        <h3 className="font-medium leading-none truncate">{`${title[0]}${title.substring(1, title.length)}`}</h3>
                                                        <small className="text-xs text-muted-foreground truncate">
                                                            {moment(created_at).locale('es').calendar()}
                                                        </small>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {
                                filteredCategories.map(({ name, slug, description, contents }: Category, i) =>
                                (
                                    <Link key={`${slug} - ${i}`} href={route('category.index', { slug: slug })}>
                                        <Card className='rounded-xl text-card-foreground shadow'>
                                            <CardHeader className='pb-2'>
                                                <div className="flex flex-row items-center justify-between space-y-0">
                                                    <h3 className="tracking-tight text-sm font-medium">
                                                        {
                                                            `${name.toUpperCase()[0]}${name.substring(1, name.length)}`
                                                        }
                                                    </h3>
                                                    <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{contents?.length ?? 0}</div>
                                                <p className="text-xs text-muted-foreground">Art&iacute;culos</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </BlogLayout>
        </>
    );
}

export default Home;
