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
}: {
    process: Process;
    statuses: Status[];
}) {
    const { data, setData, post, errors, setError } = useForm({
        number: process?.number || '',
        description: process?.description || '',
        id_status: process?.id_status || '',
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
                <CardHeader className="text-1 font-serif font-bold">
                    Adicionar novo processo
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-2">
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>
                                    <span className="text-red-400">* </span>
                                    Número do processo
                                </Label>
                                <Input
                                    placeholder="Informe"
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
                            <div className="mb-4 flex flex-col gap-2">
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
                            <div className="flex flex-col gap-2">
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
                        </div>
                        <Button type="submit" className="mt-4">
                            Salvar processo
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
