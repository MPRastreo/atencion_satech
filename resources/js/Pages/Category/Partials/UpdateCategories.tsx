import { Button, buttonVariants } from '@/Components/ui/button';
import { useToast } from '@/Components/ui/use-toast';
import { handlePut } from '@/utils/api-utils';
import * as UIDialog from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import * as UIForm from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from '@/Components/ui/textarea';
import { ToastAction } from '@/Components/ui/toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Category } from '@/types/global';
import { BadgeCheckIcon } from 'lucide-react';
import axios from 'axios';

const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 3 caracteres",
    }),
    description: z.string().min(10, {
        message: "La descripción debe tener al menos 10 caracteres",
    }),
})

const UpdateCategory = ({ auth, category }: PageProps<{ category: Category }>) => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category.name,
            description: category.description
        },
    })

    const updateRecord = async (values: z.infer<typeof formSchema>) => {
        try {
            const { name, description } = values;
            const { id } = category;
            const data: object =
            {
                name: name,
                description: description
            };

            form.reset();

            const response: any = await handlePut(id, data, "categories");

            if (response["success"]) {
                location.href = route("categories.index");
                return;
            }

            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, intente de nuevo más tarde",
            });
        }
        catch (error) {
            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, tuvimos un error de conexión con el servidor",
            });
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categoria - {category.name}</h2>}
        >
            <Head title="Categorias - Editar" />

            <div className="py-8 pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-full">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Editar registro
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Modifica la información, guarda y actualiza para visualizar los cambios                                </p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="flex flex-col">
                                    <UIForm.Form {...form}>
                                        <form onSubmit={form.handleSubmit(updateRecord)} className="space-y-4">
                                            <UIForm.FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Nombre de la categoria</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Input placeholder="Comandos plataforma" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIForm.FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Descripción</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Textarea placeholder="Sección informativa acerca de los comandos disponibles en plataforma" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIDialog.DialogFooter>
                                                <Link href={route("categories.index")} className={buttonVariants({ variant: "link" })}>Regresar</Link>
                                                <Button type="submit">Guardar cambios&nbsp;&nbsp;<BadgeCheckIcon className='h-3.5 w-3.5' /></Button>
                                            </UIDialog.DialogFooter>
                                        </form>
                                    </UIForm.Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default UpdateCategory;