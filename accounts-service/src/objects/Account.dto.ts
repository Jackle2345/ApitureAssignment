import { Balance } from "./Balance.dto";
import { AccountNumbers } from "./AccountNumbers.dto";
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
    /** @description The unique identifier for this account resource. This is an immutable opaque string. */
    @PrimaryColumn()
    _id?: string;
    /**
     * @description A string which tells the name of the banking product.
     * @example Personal Checking
     */
    @Column()
    name?: string;
    /**
     * @description A string which tells the type of the banking product.
     */
    @Column()
    accountType?: string;
    /** @description A code which identifies the product type. This is one of the [IFX AcctType](https://www.nacha.org/content/ifx-standard) values. */
    @Column()
    ifxType: "DDA" | "SDA";
    /** @description Different representations of the account number. */
    @OneToOne(type => AccountNumbers)
    @JoinColumn()
    accountNumbers?: AccountNumbers;
    /** @description The account balance. */
    @OneToOne(type => Balance)
    @JoinColumn()
    balance?: Balance;
    /**
     * Format: date-time
     * @description The date-time the account was opened. This is an [RFC 3339](https://tools.ietf.org/html/rfc3339) UTC time stamp.
     */
    @Column()
    openedAt?: string;
    /**
     * @description The account routing number which identifies the financial institution (FI). The full routing number is derived from the FI's configuration.
     * @example 021000021
     */
    @Column()
    routingNumber?: string;
  }