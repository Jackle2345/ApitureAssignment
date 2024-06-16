import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Account } from './objects/Account.dto';
import { PatchBody } from './objects/PatchBody.dto';

@Controller('accounts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAccounts(): Promise<Account[]> {
    return this.appService.getAccounts();
  }

  @Get(':accountId')
  async getAccount(@Param('accountId') id : string, @Query('unmasked') unmasked: boolean): Promise<Account> {
    return this.validateAccount(await this.appService.getAccount(id, unmasked), id);
  }

  @Patch(':accountId')
  async patchAccount(@Param('accountId') id : string, @Body() patchAccountBody: PatchBody) : Promise<Account> {
    if (!patchAccountBody || !patchAccountBody.name) {
      throw new HttpException('Name is required attribute in request body', HttpStatus.BAD_REQUEST);
    }
    if (patchAccountBody.name.length < 1 || patchAccountBody.name.length > 128) {
      throw new HttpException('Account name must be of length at least 1 and no more than 128', HttpStatus.BAD_REQUEST);
    }
    return this.validateAccount(await this.appService.patchAccount(patchAccountBody, id), id);
  }

  validateAccount(accountReturn : Account, id: string) : Account {
    if (!accountReturn) {
      throw new HttpException('No results found for account id: ' + id, HttpStatus.NOT_FOUND);
    }
    return accountReturn;
  }
}
