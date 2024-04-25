import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/Components/ui/use-toast';
import { handlePost } from '@/utils/api-utils';
import { PlusCircleIcon, BadgeCheckIcon } from 'lucide-react';
import * as UIDialog from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import * as UIForm from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from '@/Components/ui/textarea';

const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    description: z.string().min(10, {
        message: "La descripción debe tener al menos 10 caracteres",
    }),
})

const AddCategory = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    const addRecord = async (values: z.infer<typeof formSchema>) => {
        try {
            const { name, description } = values;
            const data: object =
            {
                name: name,
                description: description
            };

            const response: any = await handlePost(data, "categories");

            if (response["success"]) {
                toast({
                    title: "¡Éxito!",
                    description: response['data']['message'] ?? "¡Movimiento éxitoso!",
                })
                form.reset();
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
        <UIDialog.Dialog>
            <UIDialog.DialogTrigger asChild>
                <Button>Agregar categoria&nbsp;&nbsp;<PlusCircleIcon className="h-3.5 w-3.5"/></Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent className="sm:max-w-[425px]">
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Añadir categoria</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Completa el siguiente formulario para añadir una nueva categoría en el blog de videos de ayuda.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...form}>
                    <form onSubmit={form.handleSubmit(addRecord)} className="space-y-4">
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
                            <Button type="submit">Save changes&nbsp;&nbsp;<BadgeCheckIcon className='h-3.5 w-3.5'/></Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>

    );
}

export default AddCategory;