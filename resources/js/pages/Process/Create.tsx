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
import { Save } from 'lucide-react';
import { Type } from '../FinancialRecord/financialRecords';
import { Process, Status } from './process';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Processos',
        href: '/processes',
    },
    {
        title: 'Adicionar Processo',
        href: '/processes/create',
    },
];

export default function Create({
    process,
    statuses,
    types,
}: {
    process: Process;
    statuses: Status[];
    types: Type[];
}) {
    const { data, setData, post, errors, setError } = useForm({
        number: process?.number || '',
        description: process?.description || '',
        id_status: process?.id_status || '',
        id_type: process?.id_type || '',
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (process) {
            post(`/processes/${process.id}`);
        } else {
            post('/processes');
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adicionar Carro" />
            <Card className="m-6">
                <CardHeader className="font-serif text-2xl font-bold">
                    Adicionar novo processo
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-2">
                            <div className="mb-4 flex w-60 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Número do processo
                                </Label>
                                <Input
                                    placeholder="Informe o número"
                                    value={data.number}
                                    onChange={(e) => {
                                        setData('number', e.target.value);
                                        setError('number', '');
                                    }}
                                />
                                <InputError
                                    message={errors.number}
                                ></InputError>
                            </div>
                            <div className="mb-4 flex w-60 flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Descrição
                                </Label>
                                <Input
                                    placeholder="Informe uma descrição"
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
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex w-60 flex-col gap-2">
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
                                        <SelectValue placeholder="Selecione o status" />
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
                            <div className="flex w-60 flex-col gap-2">
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
                                        <SelectValue placeholder="Selecione o tipo" />
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
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 cursor-pointer bg-green-700"
                        >
                            <Save />
                            Salvar processo
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
