export type SSEMessage = {
    id?: string;
    data: string;
    event_type?: string;
    retry?: number;
};