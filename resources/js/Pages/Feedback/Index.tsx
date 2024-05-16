import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Feedback } from '@/types/global';
import ListRecords from './Partials/ListRecords';

const IndexFeedback = ({ auth, records }: PageProps<{ records: Feedback[] }>) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Peticiones</h2>}
        >
            <Head title="Peticiones" />

            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-full">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Listado de peticiones
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    En esta sección se pueden visualizar y administrar las dudas, quejas o sugerencias visitantes del blog de videos.
                                </p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="flex flex-col">
                                    <ListRecords records={records} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default IndexFeedback;
