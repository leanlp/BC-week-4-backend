import { Controller, Get, Param } from '@nestjs/common';
import { ContractFactory, ethers } from 'ethers';
import { AppService } from './app.service';
import { Body, Post, Query } from '@nestjs/common/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("token-address")
  getTokenAddress(){
    return { result: this.appService.getTokenAddress() };
  }

  @Post('request-tokens')
  async requestTokens(@Body() body: any): Promise<any> {
    return {result: this.appService.requestTokens(body)};
    }

  // @Post('request-tokens')
  // async requestTokens(@Param('address') address: string): Promise<any> {
  //   return this.appService.requestTokens(address);
  // }
}




  // @Get('last-block')
  // getBlockLast(): Promise<ethers.providers.Block> {
  //   return this.appService.getBlock();
  // }
  // @Get(`Block/:hash`)
  // getBlock(@Param(`hash`) hash: string): Promise<ethers.providers.Block> {
  //   return this.appService.getBlock(hash);
  // }
  // @Get(`totalSupply/:address`)
  // getTotalSupply(@Param(`address`) address: string): Promise<number> {
  //   return this.appService.getTotalSupply(address);
  // }
  // @Get(`Allowance`)
  // getAllowance(
  //   @Query(`address`) address: string, // the query good method, most ingraty
  //   @Query(`from`) from: string, 
  //   @Query(`to`) to: string,
  //   ): Promise<number> {
  //   return this.appService.getAllowance(address, from, to);
  // }

  // @Get("patment-order/:id")
  // getPaymentOrder(@Param("id") id: number): any {
  //   return this.appService.paymentOrders[id];
  // }
  // @Post("payment-order")
  // createPaymentOrder(@Body() body: CreatePaymentOrderDto): number {
  //   return this.appService.createPaymentOrder(body.value, body.secret)
  // }
  // @Post("request-payment")
  // requestPaymentOrder(@Body() body: RequestPaymentOrderDto): Promise<any> {
  //   return this.appService.requestPaymentOrder(body.id, body.secret, body.receiver);
   
  // }
  // provider(provider: any) {
  //   throw new Error('Method not implemented.');
  // }



