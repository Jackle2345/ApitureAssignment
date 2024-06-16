import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: number
    /**
     * @description The string representation of the exact decimal available balance. For deposit accounts, this reflects the amount that may be used for withdrawals or transfers. This field does not apply to debit accounts such as loans.
     * @example 2850.30
     */
    @Column()
    available?: string;
    /** @description The [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) for this balance. */
    @Column()
    currency?: string;
}