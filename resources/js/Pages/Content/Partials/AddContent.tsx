import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import * as UISelect from "@/Components/ui/select";
import * as useToast from "@/Components/ui/use-toast";
import { handlePost } from "@/utils/api-utils";
import { BadgeCheckIcon, PlusCircleIcon } from "lucide-react";
import * as UIDialog from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import * as UIForm from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resolve } from "path";
import { ToastAction } from "@radix-ui/react-toast";
import { Category } from "@/types/global";

const formSchema = z.object({
    category_id: z.number(),
    title: z.string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El formato del titulo no es valido",
        message: "Ingresa el titulo del contenido"
    }).min(3, "El titulo debe tener al menos 3 caracteres"),
    description: z.string({
        required_error: "La descripción es requerida",
        message: "Ingresa la descripción del contenido"
    }).min(5).max(300),
    thumbnail: z.string({
        required_error: "La portada es requerida",
        message: "Selecciona una imagen para la portada"
    }),
    filepath: z.string({
        required_error: "El video es requerido",
        message: "Carga el video respectivo a la descripción"
    }),
})

interface Props { categories: Category[] }

const AddContent = ({ categories }: Props) => {
    const { toast } = useToast.useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category_id: 0,
            title: "",
            description: "",
            thumbnail: "",
            filepath: ""
        },
    });

    const addRecord = async (values: z.infer<typeof formSchema>) => {
        try {
            const { category_id, title, description, thumbnail, filepath } = values;

            const data: object = {
                category_id: category_id,
                title: title,
                description: description,
                thumbnail: thumbnail,
                filepath: filepath,
            }

            form.reset()

            const response: any = await handlePost(data, "content");

            if (response["success"]) {
                toast({
                    title: "¡Éxito!",
                    description: response["data"]["message"] ?? "¡Movimiento éxitoso!",
                    action: <ToastAction altText="Aceptar" onClick={() => location.reload()}>Aceptar</ToastAction>,
                })
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
                <Button>Agregar contenido&nbsp;&nbsp;<PlusCircleIcon className="h-3.5 w-3.5"></PlusCircleIcon></Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent className="sm:max-w-[425px]">
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Añadir contenido</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Completa el siguiente formulario para añadir un nuevo contenido en el blog de videos de ayuda.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...form}>
                    <form onSubmit={form.handleSubmit(addRecord)} className="space-y-4">
                        <UIForm.FormField control={form.control} name="title" render={({ field }) => (
                            <UIForm.FormItem>
                                <UIForm.FormLabel>T&iacute;tulo del contenido</UIForm.FormLabel>
                                <UIForm.FormControl>
                                    <Input placeholder="Contenido" {...field} />
                                </UIForm.FormControl>
                                <UIForm.FormMessage />
                            </UIForm.FormItem>
                        )} />

                        <UIForm.FormField control={form.control} name="description" render={({ field }) => (
                            <UIForm.FormItem>
                                <UIForm.FormLabel>Descripci&oacute;n del contenido</UIForm.FormLabel>
                                <UIForm.FormControl>
                                    <Input placeholder="Breve descripción del contenido" />
                                </UIForm.FormControl>
                                <UIForm.FormMessage />
                            </UIForm.FormItem>
                        )} />

                        <UIForm.FormField control={form.control} name="category_id" render={({ field }) => (
                            <UIForm.FormItem>
                                <UIForm.FormLabel>Categoria</UIForm.FormLabel>
                                <UIForm.FormControl>
                                    <UISelect.Select>
                                        <UISelect.SelectTrigger className="w-full">
                                            <UISelect.SelectValue placeholder="Seleccionar categoria" />
                                        </UISelect.SelectTrigger>
                                        <UISelect.SelectContent>
                                            <UISelect.SelectGroup>
                                                {categories.map((category, index) => (
                                                    <UISelect.SelectItem key={index} value={category.id.toString()}>{category.name}</UISelect.SelectItem>
                                                ))}
                                            </UISelect.SelectGroup>
                                        </UISelect.SelectContent>
                                    </UISelect.Select>
                                </UIForm.FormControl>
                            </UIForm.FormItem>
                        )} />

                        <UIForm.FormField control={form.control} name="thumbnail" render={({ field }) => (
                            <UIForm.FormItem>
                                <UIForm.FormLabel>Portada del video</UIForm.FormLabel>
                                <UIForm.FormControl>
                                    <Input type="file" placeholder="Portada del video" accept="image/png, image/jpeg, image/webp" />
                                </UIForm.FormControl>
                            </UIForm.FormItem>
                        )} />

                        <UIForm.FormField control={form.control} name="filepath" render={({ field }) => (
                            <UIForm.FormItem>
                                <UIForm.FormLabel>Video </UIForm.FormLabel>
                                <UIForm.FormControl>
                                    <Input type="file" placeholder="Video para soporte" accept="video/mp4" />
                                </UIForm.FormControl>
                            </UIForm.FormItem>
                        )} />

                        <UIDialog.DialogFooter>
                            <Button type="button">Guardar cambios&nbsp;&nbsp;<BadgeCheckIcon className='h-3.5 w-3.5' /></Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>
    );
}

export default AddContent;
