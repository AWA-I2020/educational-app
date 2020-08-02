export interface Notification {
    title: string;
    body: string;
    dateReceived?: Date;
    user_id?: string;
    read?: boolean;
    id?: string;
}
