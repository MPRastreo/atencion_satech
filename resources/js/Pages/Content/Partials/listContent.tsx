import { Content, Category } from '@/types/global';
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button, buttonVariants } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { ToastAction } from '@/Components/ui/toast';
import { useToast } from '@/Components/ui/use-toast';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { handleDelete } from '@/utils/api-utils';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface Props {
    contents: Content[];
    categories: Category[];
}

const ListContent = ({ contents, categories }: Props) => {
    const data: Content[] = contents;
    const { toast } = useToast();

    const deleteRecord = async (id: number) => {
        try {
            const response: any = await handleDelete(id, "contents");

            if (response["success"]) {
                toast({
                    title: "¡Éxito!",
                    description: response['data']['message'] ?? "¡Movimeinto éxitoso!"
                })
                return;
            }

            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, intente de nuevo más tarde",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, tuvimos un error de conexión con el servidor",
            });
        }
    }

    const columns: ColumnDef<Content, Category>[] = [
        {
            accessorKey: "category_id",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Categoría
                        <ArrowUpDown className='ml-2 h-4 w-4' />
                    </Button>
                )
            },
            cell: ({ row }) => {
                let categoryId = parseInt(row.getValue("category_id"));
                const category = categories.find(cate => cate.id === categoryId);

                if (category) {
                    return <div className='text-center'>{category.name}</div>;
                }
            }
        }, {
            accessorKey: "title",
            header: "Título",
            cell: ({ row }) => <div className='text-justify'>{row.getValue("title")}</div>,
        }, {
            accessorKey: "description",
            header: "Descripción",
            cell: ({ row }) => <div className='text-justify'>{row.getValue("description")}</div>
        }, {
            accessorKey: "thumbnail",
            header: "Portada",
            cell: ({ row }) => <img src={row.getValue("thumbnail")} alt="" style={{borderRadius: "50%",width: 50,height: 50,}}/>
        }, {
            accessorKey: "filepath",
            header: "Video",
            cell: ({ row }) => <Button variant="outline" className='hover:bg-black hover:text-white'><a href={row.getValue("filepath")} target='_blank'>Visualizar</a></Button>
        }, {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className='h-8 w-8 p-0'>
                                <span className='sr-only'>Abrir men&uacute;</span>
                                <EllipsisIcon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <Button>Modificar</Button>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className='w-full bg-transparent text-black hover:bg-red-500 hover:text-white'>
                                        Eliminar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Est&aacute;s seguro de eliminar este video?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Est&aacute; acci&oacute;n eliminar&aacute; permanentemente el video.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction>Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })

    return (
        <div className="w-full">
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No hay registros aun.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ListContent;
