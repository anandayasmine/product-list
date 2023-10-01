import { CustomerManagementPage, MainLayout } from '@/app/components'
import { CustomerAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'

type TProps = {
  message: string
};
type TState = {
  title: string
};
export default class index extends Component<TProps, TState> {

  state: TState = {
    title: 'Customer List'
  }

  async getCustomer() {
    return CustomerAPI.getData(null).then((data: any) => {

      const customer = JSON.parse(data || '{}')?.users.map((item: any) => {
        return {
          ...item,
          bankNumber: item.bank.cardNumber
        }
      })
      return customer
    })
  }

  async onSubmitForm(formValue:any) {

    CustomerAPI.postData({
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
        <CustomerManagementPage
          getData={this.getCustomer.bind(this)}
          onSubmitForm={this.onSubmitForm.bind(this)}
          title={title}
        />
      </MainLayout>
    )
  }
}
