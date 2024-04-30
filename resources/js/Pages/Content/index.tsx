import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Content } from "@/types/global";

const IndexContent = ({ auth, contents }: PageProps<{ contents: Content[] }>) => {
    return <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contenido</h2>}>
        <Head title="Contenido">
            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="max-w-7xl mx-auto py-2 pt-0 px-4 lg:px-0 mt-0">
    
                    </div>
                </div>
            </div>
        </Head>
    </AuthenticatedLayout>
}
