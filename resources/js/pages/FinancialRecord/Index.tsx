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
import { Badge } from '@/components/ui/badge';
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
import { Category, FinancialRecord, Type } from './financialRecords';

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
    categories: Category[];
    types: Type[];
    success?: string;
    error?: string;
};

type FormDataProps = {
    id_status: string;
};

export default function FinancialRecords() {
    const { props } = usePage<PageProps>();
    const { delete: destroy, processing, get } = useForm<FormDataProps>();

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

    const columns: ColumnDef<FinancialRecord>[] = [
        {
            accessorKey: 'type_description',
            header: 'Tipo',
            cell: ({ row }) => {
                const record = row.original;
                let variant;
                let className;

                switch (row.original.type?.id.toString()) {
                    case '1':
                        variant = 'outline';
                        className = 'bg-green-100 text-green-900';
                        break;
                    case '2':
                        variant = 'outline';
                        className = 'bg-red-100 text-red-900 ';
                        break;
                    default:
                        variant = 'outline';
                        break;
                }
                return (
                    <Badge className={className}>
                        {record.type.description}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'process_number',
            header: 'Processo',
            cell: ({ row }) => {
                return <p>{row?.original?.process?.number}</p>;
            },
        },
        {
            accessorKey: 'category_description',
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
                const record = row.original;
                let className;
                let indicator;

                switch (row.original.type?.id.toString()) {
                    case '1':
                        indicator = '+';
                        className = ' text-green-600';
                        break;
                    case '2':
                        indicator = '-';
                        className = ' text-red-600 ';
                        break;
                }
                return (
                    <p className={className}>
                        {indicator} R$ {record.value}
                    </p>
                );
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
            id: 'status_description',
            header: 'Status',
            cell: ({ row }) => {
                const record = row.original;
                let className;
                let indicator;

                switch (row.original.id_status?.toString()) {
                    case '1':
                        indicator = '+';
                        className =
                            ' bg-yellow-100 text-yellow-600 w-30 rounded-md';
                        break;
                    case '2':
                        indicator = '-';
                        className = ' bg-green-100 text-green-600 w-30 rounded-md';
                        break;
                    case '3':
                        indicator = '-';
                        className = ' bg-red-100 text-red-600 w-30 rounded-md';
                        break;
                }
                return (
                    <div className={className}>
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
                    props={{
                        categories: props.categories,
                        types: props.types,
                    }}
                    data={props.financialRecords}
                    searchFields={[
                        'type_description',
                        'process_number',
                        'category_description',
                        'status_description',
                        'description',
                        'value',
                        'created_at',
                    ]}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
