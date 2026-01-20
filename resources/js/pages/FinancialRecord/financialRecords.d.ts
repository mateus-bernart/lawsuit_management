import { Process } from '../Process/process';

export type FinancialRecord = {
    id: number;
    id_type: number;
    type: Type;
    id_category: number;
    category: Category;
    id_process: number;
    process: Process;
    id_status: number;
    status: Status;
    value: string;
    description: string;
    created_at: string;
};

type Type = {
    id: number;
    description: string;
};

type Category = {
    id: number;
    description: string;
};

type Process = {
    id: number;
    description: string;
};

type Status = {
    id: number;
    description: string;
    color: string;
};
