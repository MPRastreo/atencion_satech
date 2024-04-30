import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Category } from "@/types/global";
import { Link } from "@inertiajs/react";
import { ArrowUpRightIcon } from "lucide-react";

interface Props {
    categories: Category[];
}

const HomeCategories = ({ categories }: Props) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
                categories.map(({ name, slug, description, contents }: Category, i) =>
                (
                    <Link key={`${slug} - ${i}`} href={route('category.index', { slug: slug })}>
                        <Card className='rounded-xl text-card-foreground shadow transition-all duration-500 hover:scale-105'>
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
    );
}

export default HomeCategories;