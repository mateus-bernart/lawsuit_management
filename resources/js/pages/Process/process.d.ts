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
    initial_cause_value: number;
    final_cause_value: number;
    initial_fee_value: number;
    final_fee_value: number;
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
