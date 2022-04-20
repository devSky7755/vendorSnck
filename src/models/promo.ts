export type PromoType = 'Percentage' | 'Value';
export type PromoUsageType = 'One time use' | 'Multiple use';

export interface Promo {
    id: string;
    active: boolean;
    code: string;
    type: PromoType;
    value: number;
    usage: PromoUsageType;
    commences?: string;
    expires?: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}