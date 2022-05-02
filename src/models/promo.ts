export type PromoType = 'percentage' | 'fixed';

export interface Promo {
    id: string;
    code: string;
    type: PromoType;
    value: number;
    multipleUse: boolean;
    commences?: Date;
    expires?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface BulkPatchPromo {
    commences?: Date;
    expires?: Date;
}