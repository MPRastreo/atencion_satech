import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import AddCategory from './Partials/AddCategory';
import ListCategories from './Partials/ListCategories';
import { Category } from '@/types/global';

const IndexCategories = ({ auth, categories }: PageProps<{ categories: Category[] }>) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categorias</h2>}
        >
            <Head title="Categorias" />

            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="max-w-7xl mx-auto py-2 pt-0 px-4 lg:px-0 mt-0">
                        <AddCategory />
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-full">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Listado de categorias
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    En esta sección se administran las categorias de los videos de ayuda generados hasta el momento.
                                </p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="flex flex-col">
                                    <ListCategories categories={categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default IndexCategories;