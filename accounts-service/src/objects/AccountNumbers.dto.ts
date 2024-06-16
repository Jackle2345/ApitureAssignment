import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountNumbers {
    @PrimaryGeneratedColumn()
    id: number
    /**
     * @description A partial account number that does not contain all the digits of the full account number. This masked number appears in statements or in user experience presentation. The first character is the mask character and is repeated; this does not indicate that the full account number is the same as the mask length. This value is derived and immutable.
     * @example *************3210
     */
    @Column()
    masked?: string;
    /**
     * @description The full account number. This value only appears when `?unmasked=true` is passed on the `GET` request. It is not included in the summary representation of the account that is included in account collection responses. This value is derived and immutable.
     * @example 9876543210
     */
    @Column()
    full?: string;
}