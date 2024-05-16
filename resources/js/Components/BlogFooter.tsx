import { Button, buttonVariants } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetTitle, SheetTrigger, SheetHeader } from "@/Components/ui/sheet"
import moment from 'moment/min/moment-with-locales';
import { useToast } from '@/Components/ui/use-toast';
import { handlePost } from '@/utils/api-utils';
import { SendIcon } from 'lucide-react';
import * as UIDialog from "@/Components/ui/dialog";
import * as UIForm from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from '@/Components/ui/textarea';
import { ToastAction } from '@/Components/ui/toast';
import { Link } from "@inertiajs/react";

const formSchema = z.object({
    full_name: z.string().min(5, {
        message: "El nombre debe tener al menos 5 caracteres",
    }),
    phone_number: z.string().min(10, {
        message: "El número de teléfono debe tener al menos 10 caracteres",
    }).regex(/^\+?[0-9\s\-()]{10,}$/, { message: "Formato de número de teléfono inválido" }),
    email: z.string().email({
        message: "El email debe ser un correo electrónico válido",
    }),
    message: z.string().min(20, {
        message: "El mensaje debe tener al menos 20 caracteres",
    }),
});

const BlogFooter = () => {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            phone_number: "",
            email: "",
            message: ""
        },
    })

    const addRecord = async (values: z.infer<typeof formSchema>) => {
        try {
            const { full_name, phone_number, email, message } = values;
            const data: object =
            {
                full_name: full_name,
                phone_number: phone_number.replace(/[^\d]/g, ''),
                email: email,
                message: message
            };
            form.reset();

            const response: any = await handlePost(data, "feedback");

            if (response["success"]) {
                toast({
                    title: "¡Éxito!",
                    description: response['data']['message'] ?? "¡Movimiento éxitoso!",
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
        <>
            <footer className="bg-gray-50 pt-2">
                <div className="mx-auto w-full p-4 py-6 px-10 lg:py-10">
                    <div className="flex justify-between items-center space-x-1">
                        <div>
                            <div className="text-lg font-semibold">Querido visitante…</div>
                            <small className="text-sm leading-none">Si tienes alguna duda, queja o sugerencia, da clic en el siguiente botón y cont&aacute;ctanos.</small>
                        </div>
                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button>
                                        Contacto&nbsp;&nbsp;
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-100 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-200"></span>
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Secci&oacute;n de contacto</SheetTitle>
                                        <SheetDescription className="my-4">
                                            Si tienes alguna duda, queja o sugerencia, llena el siguiente formulario y pronto nos pondremos en contacto contigo.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <UIForm.Form {...form}>
                                        <form onSubmit={form.handleSubmit(addRecord)} className="space-y-4 mt-4">
                                            <UIForm.FormField
                                                control={form.control}
                                                name="full_name"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Nombre completo</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Input placeholder="José Pérez López" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIForm.FormField
                                                control={form.control}
                                                name="phone_number"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Tel&eacute;fono</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Input placeholder="477 834 6877" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIForm.FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Correo Electr&oacute;nico</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Input placeholder="example@satech.mx" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIForm.FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <UIForm.FormItem>
                                                        <UIForm.FormLabel>Mensaje</UIForm.FormLabel>
                                                        <UIForm.FormControl>
                                                            <Textarea placeholder="Necesito información acerca del uso de la App SATECH" {...field} />
                                                        </UIForm.FormControl>
                                                        <UIForm.FormMessage />
                                                    </UIForm.FormItem>
                                                )}
                                            />
                                            <UIDialog.DialogFooter>
                                                <Button type="submit">Enviar&nbsp;<SendIcon className='h-3.5 w-3.5' /></Button>
                                            </UIDialog.DialogFooter>
                                        </form>
                                    </UIForm.Form>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <hr className="my-4 border-gray-200 sm:mx-auto lg:my-6" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center">
                            © {moment().year()}{" "}
                            <a href="https://satech.mx" className="hover:underline">
                                SATECH Rastreo Satelital
                            </a>
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
                            <a href="https://www.facebook.com/Satechrs">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-gray-500 h-4 w-4 duration-200 transition-all hover:scale-110 hover:fill-gray-900">
                                    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@satechmx">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="fill-gray-500 h-4 w-4 duration-200 transition-all hover:scale-110 hover:fill-gray-900">
                                    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@satechoficial">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-gray-500 h-4 w-4 duration-200 transition-all hover:scale-110 hover:fill-gray-900">
                                    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                                </svg>

                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default BlogFooter;
