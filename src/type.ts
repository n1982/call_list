interface IPartnerData {
    id: string;
    name: string;
    phone: string;
}

interface ICallResult {
    type: string;
    title: string;
    tooltip: string;
}

interface IStage {
    person_name: string;
    person_surname: string,
    person_mango_phone: string;
    duration: number;
    disconnect_reason: string;
}

interface IAnswer {
    message: string;
    from_support: number;
    support_read_status: number;
    person_read_status: number;
}

interface IAbuse {
    date: Date,
    person_name: string;
    message: string;
    support_read_status: number;
    support_answer_status: number;
    answers: Array<IAnswer>
}

type ErrorsType = "noerrors" | "noscript" | "timeover" | "notavailable" | "noanswer" | "subscribercompleted"

export interface ICall {
    id: number;
    partnership_id: string;
    partner_data: IPartnerData;
    date: Date;
    date_notime: Date;
    time: number;
    from_number: string;
    from_extension: string;
    to_number: string;
    to_extension: string;
    is_skilla: number;
    status: 'Дозвонился' | "Не дозвонился";
    record: string;
    line_number: string;
    line_name: string;
    in_out: 1 | 0 | undefined;
    from_site: number;
    source: string;
    errors: ErrorsType[];
    disconnect_reason: string;
    results: ICallResult[];
    stages: IStage[];
    abuse: IAbuse;
    contact_name: string;
    contact_company: string;
    person_id: 4042,
    person_name: string;
    person_surname: string;
    person_avatar: string;
}

export interface apiResponse {
    total_rows: number;
    results: ICall[]
}