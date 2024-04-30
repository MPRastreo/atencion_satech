import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet"
import moment from 'moment/min/moment-with-locales';

const BlogFooter = () => {
    return (
        <>
            <footer className="bg-gray-50 pt-2">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 px-10 lg:py-10">
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
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Secci&oacute;n de contacto</SheetTitle>
                                        <SheetDescription>
                                            Si tienes alguna duda, queja o sugerencia, llena el siguiente formulario y pronto nos pondremos en contacto contigo.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Username
                                            </Label>
                                            <Input id="username" value="@peduarte" className="col-span-3" />
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">Save changes</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <hr className="my-4 border-gray-200 sm:mx-auto lg:my-6" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © {moment().year()}{" "}
                            <a href="https://satech.mx" className="hover:underline">
                                SATECH Rastreo Satelital
                            </a>
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">
                            {/* <a
                                href="#"
                                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 21 16"
                                >
                                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord community</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default BlogFooter;
