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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Edit, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Status } from '../Process/process';
import { FinancialRecord } from './financialRecords';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Financeiro',
        href: '/financial-records',
    },
];

type PageProps = {
    financialRecords: FinancialRecord[];
    statuses: Status[];
    success?: string;
    error?: string;
};

type FormDataProps = {
    id_status: string;
};

export default function FinancialRecords() {
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

    const handleDeleteFinancialRecord = (id: number) => {
        destroy(`/financial-records/${id}`);
    };

    const handleUpdateStatus = (id: number, id_status: string) => {
        router.put(
            `/financial-records/${id}/toggle-status`,
            { id_status },
            {
                preserveScroll: true,
            },
        );
    };

    console.log(props.financialRecords);

    const columns: ColumnDef<FinancialRecord>[] = [
        {
            accessorKey: 'id_type',
            header: 'Tipo',
            cell: ({ row }) => {
                const record = row.original;
                return <p>{record.type.description}</p>;
            },
        },
        {
            accessorKey: 'id_process',
            header: 'Processo',
            cell: ({ row }) => {
                return <p>{row?.original?.process?.number}</p>;
            },
        },
        {
            accessorKey: 'id_category',
            header: 'Categoria',
            cell: ({ row }) => {
                return <p>{row.original.category.description}</p>;
            },
        },
        {
            accessorKey: 'description',
            header: 'Descrição',
        },
        {
            accessorKey: 'value',
            header: 'Valor',
            cell: ({ row }) => {
                return <p>R$ {row.original.value}</p>;
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Data',
            cell: ({ row }) => {
                const date = row.original.created_at;
                const parsed = parseISO(date); // "2025-09-21"
                const parsedDate = format(parsed, 'dd/MM/yyyy'); // "21/09/2025"
                return <p>{parsedDate}</p>;
            },
        },
        {
            id: 'id',
            header: 'Status',
            cell: ({ row }) => {
                const record = row.original;

                return (
                    <div className="w-30">
                        <Select
                            value={record.id_status.toString()}
                            onValueChange={(value) => {
                                handleUpdateStatus(record.id, value);
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
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
                const record = row.original;

                return (
                    <div className="flex gap-2">
                        <div className="flex items-center">
                            <Button
                                variant={'ghost'}
                                size="icon"
                                onClick={() =>
                                    get(`/financial-records/${record.id}/edit`)
                                }
                            >
                                <Edit></Edit>
                            </Button>
                        </div>
                        <AlertDialog>
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
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Tem certeza?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Remover o registro {record.id}?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            handleDeleteFinancialRecord(
                                                record.id,
                                            )
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
            <Head title="Financeiro" />

            <div className="my-4 mb-0 ml-4">
                <Link href={'/financial-records/create'}>
                    <Button className="text-md cursor-pointer bg-green-600 font-bold shadow-lg hover:bg-green-700">
                        Adicionar registro financeiro
                    </Button>
                </Link>
            </div>
            <div className="m-4 mt-0">
                <DataTable
                    columns={columns}
                    data={props.financialRecords}
                    searchFields={[
                        'process',
                        'type',
                        'category',
                        'status',
                        'description',
                    ]}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
