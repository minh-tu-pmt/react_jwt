import React, {PureComponent} from 'react';
import {
  Table,
  Button
} from 'antd'

import styles from './MemberDetail.less'

class PrivateList extends PureComponent{

  columns = [
    {
      title:'课程类型',
      dataIndex:'type',
      key:'type'
    },
    {
      title:'余课/总课',
      dataIndex:'count',
      key:'count'
    },
    {
      title:'课程到期时间',
      dataIndex:'end_date',
      key:'end_date'
    },
    {
      title:'买课时间',
      dataIndex:'pay_date',
      key:'pay_date'
    },
    {
      title:'操作',
      dataIndex:'',
      key:'x',
      render:()=><a href="javascript:;">消课</a>
    }
  ]

  render(){

    const tableData = [
      {
        key:'1',
        type:'常规私教课',
        count:'8/32',
        end_date:'2018-10-11',
        pay_date:'2018-10-12 18:00'
      },
      {
        key:'2',
        type:'高级私教课',
        count:'10/42',
        end_date:'2018-10-11',
        pay_date:'2018-10-12 18:00'
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 50,
    };

    return(
      <Table
        rowKey='key'
        pagination={paginationProps}
        dataSource={tableData}
        columns={this.columns}
      />
    )
  }
}

export default PrivateList;
