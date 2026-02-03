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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, Edit, Plus, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Process, Status } from './process';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Processos',
        href: '/process',
    },
];

type PageProps = {
    processes: Process[];
    statuses: Status[];
    success?: string;
    error?: string;
};

type FormDataProps = {
    id_status: string;
};

export default function Processes() {
    const { props } = usePage<PageProps>();
    const {
        delete: destroy,
        processing,
        put,
        post,
        get,
        data,
        setData,
    } = useForm<FormDataProps>();

    useEffect(() => {
        if (props.success || props.error) {
            toast.success(props.success || props.error);
        }
    }, [props, props.success, props.error]);

    const handleDeleteProcess = (id: number) => {
        destroy(`/processes/${id}`);
    };

    const handleUpdateActive = (id: number) => {
        put(`/processes/${id}/toggle-active`, {
            preserveScroll: true,
        });
    };

    const handleUpdateStatus = (id: number, id_status: string) => {
        router.put(
            `/processes/${id}/toggle-status`,
            { id_status },
            {
                preserveScroll: true,
            },
        );
    };

    const columns: ColumnDef<Process>[] = [
        {
            accessorKey: 'number',
            header: 'Número',
            cell: ({ row }) => {
                const process = row.original;
                return <p>{process.number}</p>;
            },
        },
        {
            accessorKey: 'description',
            header: 'Descrição',
        },
        {
            accessorKey: 'type_description',
            header: 'Tipo',
            cell: ({ row }) => {
                return <p>{row.original.type.description}</p>;
            },
        },
        {
            id: 'status_description',
            header: 'Status',
            cell: ({ row }) => {
                const process = row.original;

                return (
                    <div className="w-50">
                        <Select
                            value={process.id_status.toString()}
                            onValueChange={(value) => {
                                handleUpdateStatus(process.id, value);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.statuses?.map((p, index) => (
                                    <SelectItem
                                        key={index}
                                        value={p.id.toString()}
                                    >
                                        {p.description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );
            },
        },
        {
            accessorKey: 'active',
            header: 'Ativo / Inativo',
            cell: ({ row }) => {
                const process = row.original;
                const activeOption =
                    process.active.toString() === '1' ? 'ativo' : 'inativo';
                const activeText =
                    process.active.toString() === '1' ? 'inativo' : 'ativo';
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={
                                    process.active.toString() === '1'
                                        ? 'bg-green-100 hover:bg-green-200 dark:bg-green-300 dark:text-black dark:hover:bg-green-100'
                                        : 'bg-red-100 hover:bg-red-200 dark:bg-red-300 dark:text-black dark:hover:bg-red-100'
                                }
                                style={{ border: 'none' }}
                            >
                                {activeOption}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => handleUpdateActive(process.id)}
                            >
                                {activeText}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
                const process = row.original;

                return (
                    <div className="flex gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={'ghost'}
                                    size="icon"
                                    onClick={() =>
                                        get(`/processes/${process.id}/edit`)
                                    }
                                >
                                    <Edit />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Editar</p>
                            </TooltipContent>
                        </Tooltip>
                        <AlertDialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
                                            size="icon"
                                            disabled={processing}
                                        >
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Excluir</p>
                                </TooltipContent>
                            </Tooltip>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Tem certeza?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Remover o processo {process.number}?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            handleDeleteProcess(process.id)
                                        }
                                    >
                                        Excluir
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Processos" />

            <div className="my-4 mb-0 ml-4">
                <Link href={'/processes/create'}>
                    <Button className="text-md cursor-pointer bg-green-600 shadow-lg hover:bg-green-700">
                        <Plus />
                        Adicionar processo
                    </Button>
                </Link>
            </div>
            <div className="m-4 mt-0">
                <DataTable
                    columns={columns}
                    data={props.processes}
                    searchFields={[
                        'number',
                        'description',
                        'type_description',
                        'status_description',
                    ]}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
