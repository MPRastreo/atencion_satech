import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Category } from '@/types/global';

import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Separator } from '@/Components/ui/separator';


const BlogFooter = () => {
    return (
        <>
            <footer className="py-6 md:px-8 md:py-0">
                
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="https://twitter.com/shadcn"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            shadcn
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="https://github.com/shadcn-ui/ui"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </footer>
        </>
    );
}

export default BlogFooter;
