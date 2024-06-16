import { Injectable } from '@nestjs/common';
import { Account } from './objects/Account.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Equal, Repository, UpdateResult } from 'typeorm';
import { PatchBody } from './objects/PatchBody.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) { }
/**
   * Fetch a representation of this account
   * Return a representation of this account resource. The full accountNumber should not be returned unless the user provides the `?unmasked` query parameter.
   *
   * accountId String The unique identifier of this account. This is an opaque string.
   * unmasked Boolean When requesting an account, the full account number is not included in the response by default, for security reasons. Include this query parameter, with a value of `true`, to request that the response body includes the full account number. (optional)
   * returns account
   **/
  getAccount(accountId : string, unmasked: boolean) : Promise<Account> {
    return this.accountRepository.findOne({
      select: {
        _id: true,
        name: true,
        openedAt: true,
        routingNumber: true,
        accountNumbers: {
          masked: true,
          full: unmasked,
        },
        accountType: true,
        ifxType:true,
        balance: {
          available: true,
          currency: true
        }
      },
      relations: ['accountNumbers', 'balance'],
      where: {
        _id: Equal(`${accountId}`)
      }
    });
  }


  /**
   * Return a collection of accounts
   *
   * returns accounts
   **/
  getAccounts() : Promise<Account[]> {
    return this.accountRepository.find({select: {
      _id: true,
      name: true,
      openedAt: true,
      routingNumber: true,
      accountNumbers: {
        masked: true,
        full: false,
      },
      accountType: true,
      ifxType:true,
      balance: {
        available: true,
        currency: true
      }
    },
      relations: ['accountNumbers', 'balance']
    });
  }

  

  /**
   * Update this account
   * Perform a partial update of this account.
   *
   * body PatchBody 
   * accountId String The unique identifier of this account. This is an opaque string.
   * returns account
   **/
  patchAccount(body : PatchBody, accountId : string) : Promise<Account> {
    return this.accountRepository.save(
      {
        _id: accountId,
        name: body.name
      }
    );
  }

}