import React, {PureComponent} from 'react';
import {
  Table
} from 'antd'

import styles from './MemberDetail.less'

class EliminationList extends PureComponent{

  columns = [
    {
      title:'上课教练',
      dataIndex:'coach',
      key:'coach'
    },
    {
      title:'上课日期（上课时间）',
      dataIndex:'date_time',
      key:'date_time'
    },
    {
      title:'课程类型',
      dataIndex:'type',
      key:'type'
    },
    {
      title:'值班前台',
      dataIndex:'duty',
      key:'duty'
    },
    {
      title:'操作时间',
      dataIndex:'oper_date',
      key:'oper_date'
    },
    {
      title:'确认状态',
      dataIndex:'status',
      key:'status'
    }
  ]

  render(){

    const tableData = [
      {
        key:'1',
        coach:'甜心教练',
        date_time:'2018-08-10 (10:00 - 11:00)',
        type:'常规私教课',
        duty:'王尼玛',
        oper_date:'2018-08-10 11:05',
        status:'会员已确认'
      },
      {
        key:'2',
        coach:'甜心教练',
        date_time:'2018-08-10 (10:00 - 11:00)',
        type:'常规私教课',
        duty:'米阿们',
        oper_date:'2018-08-10 11:05',
        status:'会员已确认'
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

export default EliminationList;
