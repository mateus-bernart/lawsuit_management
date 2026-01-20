import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    Category,
    FinancialRecord,
    Process,
    Status,
    Type,
} from './financialRecords';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Financeiro',
        href: '/financial-records',
    },
    {
        title: 'Adicionar registro financeiro',
        href: '/financial-records/create',
    },
];

export default function Create({
    financialRecord,
    statuses,
    categories,
    types,
    processes,
}: {
    financialRecord: FinancialRecord;
    statuses: Status[];
    categories: Category[];
    types: Type[];
    processes: Process[];
}) {
    const { data, setData, post, errors, setError } = useForm({
        id_category: financialRecord?.id_category || '',
        id_type: financialRecord?.id_type || '',
        id_process: financialRecord?.id_process || '',
        id_status: financialRecord?.id_status || '',
        value: financialRecord?.value || '',
        description: financialRecord?.description || '',
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (financialRecord) {
            post(`/financial-records/${financialRecord.id}`);
        } else {
            post('/financial-records');
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adicionar Registro Financeiro" />
            <Card className="m-6">
                <CardHeader className="text-1 font-serif font-bold">
                    Adicionar novo registro financeiro
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-2">
                            <div className="mb-4 flex w-70 flex-col gap-2">
                                <Label>Processo</Label>

                                <Select
                                    value={data.id_process.toString()}
                                    onValueChange={(value) => {
                                        setError('id_process', '');
                                        setData('id_process', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            Sem processo
                                        </SelectItem>
                                        {processes?.map((p, index) => (
                                            <SelectItem
                                                key={index}
                                                value={p.id.toString()}
                                            >
                                                {p.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.id_process}
                                ></InputError>
                            </div>
                            <div className="mb-4 flex w-70 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Tipo
                                </Label>

                                <Select
                                    value={data.id_type.toString()}
                                    onValueChange={(value) => {
                                        setError('id_type', '');
                                        setData('id_type', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types?.map((p, index) => (
                                            <SelectItem
                                                key={index}
                                                value={p.id.toString()}
                                            >
                                                {p.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.id_type}
                                ></InputError>
                            </div>
                            <div className="mb-4 flex w-70 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Categoria
                                </Label>

                                <Select
                                    value={data.id_category.toString()}
                                    onValueChange={(value) => {
                                        setError('id_category', '');
                                        setData('id_category', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((p, index) => (
                                            <SelectItem
                                                key={index}
                                                value={p.id.toString()}
                                            >
                                                {p.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.id_category}
                                ></InputError>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex w-70 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Status
                                </Label>

                                <Select
                                    value={data.id_status.toString()}
                                    onValueChange={(value) => {
                                        setError('id_status', '');
                                        setData('id_status', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses?.map((p, index) => (
                                            <SelectItem
                                                key={index}
                                                value={p.id.toString()}
                                            >
                                                {p.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.id_status}
                                ></InputError>
                            </div>
                            <div className="mb-4 flex w-70 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Descrição
                                </Label>
                                <Input
                                    placeholder="Informe"
                                    value={data.description}
                                    onChange={(e) => {
                                        setData('description', e.target.value);
                                        setError('description', '');
                                    }}
                                />
                                <InputError
                                    message={errors.description}
                                ></InputError>
                            </div>
                            <div className="mb-4 flex w-70 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Valor
                                </Label>
                                <Input
                                    placeholder="Informe"
                                    value={data.value}
                                    onChange={(e) => {
                                        setData('value', e.target.value);
                                        setError('value', '');
                                    }}
                                />
                                <InputError message={errors.value}></InputError>
                            </div>
                        </div>
                        <Button type="submit" className="mt-4">
                            Salvar registro financeiro
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
