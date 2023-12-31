import { MainLayout, ProductManagementPage } from '@/app/components'
import { ProductAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'

type TProps = {
  message: string
};
type TState = {
  title: string
};


export default class index extends Component<TProps, TState> {

  state: TState = {
    title: 'Products'
  }

  async getProduct() {
    return ProductAPI.getData(null).then((data: any) => {

      const products = JSON.parse(data || '{}')?.products
      return products
    })
  }
  
  async onSubmitForm(formValue:any) {

    ProductAPI.postData({
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
        <ProductManagementPage getData={this.getProduct.bind(this)} title={title}  onSubmitForm={this.onSubmitForm.bind(this)}/>
      </MainLayout>
    )
  }
}
