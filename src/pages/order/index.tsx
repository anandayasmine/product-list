import { MainLayout, OrderManagementPage } from '@/app/components'
import { OrderAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'

type TProps = {
  message: string
};
type TState = {
  title: string
};
export default class index extends Component<TProps, TState> {

  state: TState = {
    title: 'Order'
  }

  async getOrder(){
    return OrderAPI.getData(null).then((data: any) => {

      const order = JSON.parse(data || '{}')?.carts
      return order
    })
  }
  
  async onSubmitForm(formValue:any) {

    OrderAPI.postData({
      body: formValue
    }).then((response: any) => {
    console.log("🚀 ~ file: index.tsx ~ line 35 ~ index ~ onSubmitForm ~ response", response)

      
    })

  }
  render() {
    const {
      state: {
        title
      }
    } = this
    return (
      <MainLayout>
        <OrderManagementPage getData={this.getOrder.bind(this)} title={title} onSubmitForm={this.onSubmitForm.bind(this)}/>
      </MainLayout>
    )
  }
}
