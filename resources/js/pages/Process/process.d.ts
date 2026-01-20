export type Process = {
    id: number;
    number: string;
    status: Status;
    id_status: number;
    id_type: number;
    type: ProcessType;
    active: boolean;
    description: string;
    created_at: string;
};

type Status = {
    id: number;
    description: string;
    color: string;
};

type ProcessType = {
    id: number;
    description: string;
};
