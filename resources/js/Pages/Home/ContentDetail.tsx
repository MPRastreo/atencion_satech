import { Badge } from "@/Components/ui/badge";
import BlogLayout from "@/Layouts/BlogLayout";
import { PageProps } from "@/types";
import { Category, Content } from "@/types/global";
import { Head } from "@inertiajs/react";
import { Video } from "@triyanox/react-video";
import moment from 'moment/min/moment-with-locales';

const ContentDetail = ({ categories, content: { title, description, filepath, created_at, thumbnail, category } }: PageProps<{ categories: Category[], content: Content }>) => {
    return (
        <>
            <Head title={title} />
            <BlogLayout categories={categories}>
                <div className="space-y-3 w-full h-[30rem] relative">
                    <div className="overflow-hidden h-full w-full">
                        {
                            filepath && <Video
                                src={`${route('index')}/${filepath}`}
                                title={title}
                                className="absolute inset-0 w-full h-full rounded-none"
                                showControls={true}
                                autoPlay={false}
                            />
                        }
                    </div>
                </div>
                <div className="px-10 py-5">
                    <div className="space-y-2">
                        <Badge>{category?.name}</Badge>
                        <small className="ps-2 text-sm font-medium leading-none pt-4 truncate">{moment(created_at).locale('es').fromNow()}</small>
                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                            {`${title[0]}${title.substring(1, title.length)}`}
                        </h2>
                        <p className="leading-7">
                            {`${description[0]}${description.substring(1, description.length)}`}
                        </p>
                    </div>
                </div>
            </BlogLayout>
        </>
    );
}

export default ContentDetail;