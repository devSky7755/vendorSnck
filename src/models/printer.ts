export type PrinterStatus = 'Connected' | 'Not Connected';
export type PrintQueueStatus = 'In queue' | 'Printing'

export interface Printer {
    id: number;
    name: string;
    model: string;
    address: string;
    port: number;
    status: PrinterStatus;
    usages: string[];
}

export interface PrintQueue {
    id: string;
    printer_id: number;
    printer_name: string;
    status: PrintQueueStatus;
    timestamp: number;
    time_string: string;
}
