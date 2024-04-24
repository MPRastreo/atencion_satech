import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/Components/ui/use-toast';
import { handleGet } from '@/utils/api-utils';

const IndexCategories = ({ auth, categories }: PageProps<{ categories: object[] }>) =>
{
    const { toast } = useToast();

    const handle = async () =>
    {
        try 
        {            
            const response: any = await handleGet('https://jsonplaceholder.typicode.com/todos');

            if (response["success"]) 
            {
                toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                })
                return;
            }
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            return;
        } 
        catch (error) 
        {
            console.log(error);
        }   
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categorias</h2>}
        >
            <Head title="Categorias" />

            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-full">
                            <h6>Ejemplo petición HTTP Axios</h6>
                            <br></br>
                            <Button onClick={ handle }>Hacer petición</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default IndexCategories;