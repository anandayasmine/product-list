import { AuthenticationManagementPage, MainLayout } from '@/app/components'
import { CustomerAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'

type TProps = {
  message: string
};
type TState = {
  title: string,
  data: object | {
    id: string
    image: string
    firstName: string
    lastName: string
    username: string
    phone: string
    bankNumber: string
    macAddress: string
  }
};
export default class index extends Component<TProps, TState> {

  state: TState = {
    title: '',
    data: {}
  }

  async getUser() {
    return CustomerAPI.getData({
      id: 1
    }).then((data: any) => {

      const customer = JSON.parse(data || '{}')
      return customer
    })
  }

  async componentDidMount(): Promise<void> {
    const data = await this.getUser()
    console.log("🚀 ~ file: index.tsx ~ line 40 ~ index ~ componentDidMount ~ data", data)

    await this.setState({
      data,
      title: data?.firstName
    })

  }

  render() {
    const {
      state: {
        title,
        data
      }
    } = this
    return (
      <MainLayout>
        <AuthenticationManagementPage data={data} title={title} />
      </MainLayout>
    )
  }
}
