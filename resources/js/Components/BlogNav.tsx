import { Category } from '@/types/global';

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { Separator } from '@/Components/ui/separator';
import { Link, Head } from '@inertiajs/react';
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Button } from '@/Components/ui/button';
import { Menu, Package2, Search } from "lucide-react"


interface Props {
    categories: Category[];
}

const BlogNav = ({ categories }: Props) => {

    const components: { title: string; href: string; description: string }[] = categories.map(({ name, description, slug }: Category) => ({ title: `${name.toUpperCase()[0]}${name.substring(1, name.length)}`, description: description, href: slug }));

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/100">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <div className="mr-4 hidden md:flex">
                        <a className="mr-6 flex items-center space-x-2" href="/">
                            <div className="shrink-0 flex items-center">
                                <img src='/assets/img/logo/satech_logo_lg.png' className="block h-8 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </div>
                        </a>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href={route('index')} className='class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"'>
                                        Inicio
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href="https://satech.mx"
                                                    >
                                                        <img src="https://satech.mx/wp-content/uploads/2023/12/cropped-new2-192x192.png" className="h-8 w-8" />
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            SATECH
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Nos especializamos en rastreo satelital, desarrollo e innovación, desarrollo de software, control de combustible y más.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem href="https://app.satech.mx" title="App SATECH">
                                                Soluci&oacute;n multifuncional de seguimiento de flotas por GPS.
                                            </ListItem>
                                            <ListItem href="https://satech.mx/gtrak/" title="GTRAK">
                                                Dispositivo GPS secundario de respaldo.
                                            </ListItem>
                                            <ListItem href="" title="Paro de Motor">
                                                Dispositivo con la capacidad de inmovilizar la unidad.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Blog de ayuda</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <h3 className="text-xl px-6 pt-6 pb-4 font-semibold leading-none tracking-tight">Categorias</h3>
                                        <Separator className="my-2" />
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {components.map(({ title, description, href: slug }) => (
                                                <ListItem
                                                    key={title}
                                                    title={title}
                                                    href={route('category.index', { slug: slug })}
                                                >
                                                    {description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <a className="flex items-center justify-center space-x-2 my-4 mb-6" href="/">
                                <img src='/assets/img/logo/satech_logo_lg.png' className="block h-16 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </a>
                            <Link href={route('index')} className='font-medium hover:underline'>Inicio</Link>
                            <Separator className='my-4 mb-0' />
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Servicios</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc space-y-4 ps-6 text-gray-600">
                                            <li>
                                                <a href="https://satech.mx" className='font-medium hover:underline'>Visita nuestra web</a>
                                            </li>
                                            <li>
                                                <a href="https://app.satech.mx" className='font-medium hover:underline'>App SATECH</a>
                                            </li>
                                            <li>
                                                <a href="https://satech.mx/gtrak" className='font-medium hover:underline'>GTRAK</a>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Blog de ayuda</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc space-y-4 ps-6 text-gray-600">
                                            {
                                                components.map(({ title, href: slug }, i) => (
                                                    <li key={`${title}-${i}`}>
                                                        <Link href={route('category.index', { slug: slug })} className='font-medium hover:underline'>{title}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

        </>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default BlogNav;
