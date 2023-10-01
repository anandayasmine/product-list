import { MainLayout, OrderManagementPage, ProductManagementPage } from '@/app/components'
import { OrderAPI } from '@/app/data/api';
import Router from 'next/router';
import React, { Component, ReactPropTypes } from 'react'

type TProps = {
  message: string
};
type TState = {
  title: string
  id: string | number | undefined | string[];
};
export default class index extends Component<TProps, TState> {

  state: TState = {
    title: 'Order',
    id: ''
  }

  componentDidMount(): void {
    this.setState({
      id: Router.query.id || ''
    })
  }

  async getOrder() {
    return OrderAPI.getData({
      id: (Router.query.id || '')
    }).then((data: any) => {

      const order = JSON.parse(data || '{}')?.products
      return order
    })
  }

  render() {
    const {
      state: {
        title,
        id
      }
    } = this
    return (
      <MainLayout>
        <ProductManagementPage getData={this.getOrder.bind(this)} title={title + (id ? ' ' + id : '')} />
      </MainLayout>
    )
  }
}
