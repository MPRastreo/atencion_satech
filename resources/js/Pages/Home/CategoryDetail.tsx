import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import BlogLayout from "@/Layouts/BlogLayout";
import { PageProps } from "@/types";
import { Category, Content } from "@/types/global";
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import moment from 'moment/min/moment-with-locales';
import { Badge } from "@/Components/ui/badge";
import { Search, Info } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

const CategoryDetail = ({ categories, category: { name, description, contents, slug } }: PageProps<{ categories: Category[], category: Category }>) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredContents = contents?.filter(content => {
        return content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            content.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Head title={`${name[0].toUpperCase()}${name.substring(1, name.length)}`} />
            <BlogLayout categories={categories}>
                <div className="mb-auto px-10 py-5">
                    <div className="md:p-4 space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">{`${name[0].toUpperCase()}${name.substring(1, name.length)}`}</h2>
                        <div className="pb-2">
                            <p className="leading-7">
                                {`${description[0].toUpperCase()}${description.substring(1, description.length)}`}
                            </p>
                        </div>
                        {!contents &&
                            <Alert className="w-full space-y-3">
                                <AlertTitle>¡Ups!</AlertTitle>
                                <AlertDescription>
                                    No hay registros en este momento.
                                </AlertDescription>
                            </Alert>
                        }
                        {contents &&
                            <>
                                <div className="relative flex items-center w-full md:w-1/3 py-4">
                                    <Input
                                        className="w-full pl-10 pr-3"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        type="search"
                                        placeholder={`Buscar dentro de ${name.toLowerCase()}`}
                                    />
                                    <Search className="absolute left-0 ml-3.5 w-4 h-4" />
                                </div>
                                {filteredContents?.length === 0 && searchTerm !== "" && (
                                    <Alert className="w-full">
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>¡Lo sentimos!</AlertTitle>
                                        <AlertDescription>
                                            No hay registros que coincidan con {searchTerm}.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {(filteredContents != null && filteredContents?.length > 0) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 gap-8">
                                        {filteredContents?.map(({ id, title, thumbnail, description, created_at }, i) =>
                                            <Link key={`${title} - ${i}`} href={route('content.detail', { slug: slug, id: id })}>
                                                <Card className='transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full'>
                                                    <CardHeader className="p-0 pb-6">
                                                        <div className="overflow-hidden rounded-t-md w-full h-52">
                                                            <img
                                                                alt="Thinking Components"
                                                                loading="lazy"
                                                                decoding="async"
                                                                data-nimg={1}
                                                                className="w-full h-full object-cover"
                                                                src={thumbnail}
                                                                style={{ color: "transparent" }}
                                                            />
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-2">
                                                            <Badge variant='outline'>{moment(created_at).locale('es').format('LL')}</Badge>
                                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tightfont-medium leading-none pt-2">{`${title[0]}${title.substring(1, title.length)}`}</h3>
                                                            <p className="leading-7 text-sm [&:not(:first-child)]:mt-6 truncate">
                                                                {`${description[0]}${description.substring(1, description.length)}`}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </BlogLayout >
        </>
    )
}

export default CategoryDetail;