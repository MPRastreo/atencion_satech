import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button";
import { Content } from "@/types/global";
import AddContent from "./Partials/AddContent";
import ListContent from "./Partials/ListContent";
import { Category } from "@/types/global";

const IndexContent = ({ auth, contents, categories }: PageProps<{ contents: Content[], categories: Category[] }>) => {
    console.log(categories);
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contenido</h2>}>
            <Head title="Contenido" />
            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="max-w-7xl mx-auto py-2 pt-0 px-4 lg:px-0 mt-0">
                        <AddContent categories={categories} />
                    </div>
                    <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                        <div className='max-w-full'>
                            <div>
                                <h2 className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                                    Listado de contenido
                                </h2>
                                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                                    Ene sta secci&oacute;n  puedes agregar y administrar el contenido para soporte
                                </p>
                            </div>
                            <div className='mt-6 space-y-6'>
                                <div className='flex flex-col'>
                                    <ListContent contents={contents} categories={categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default IndexContent;
