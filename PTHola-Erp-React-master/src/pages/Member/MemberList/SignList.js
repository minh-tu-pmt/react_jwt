import React, {PureComponent} from 'react';
import {
  Table
} from 'antd'

import styles from './MemberDetail.less'

class SignList extends PureComponent{

  columns = [
    {
      title:'签到时间',
      dataIndex:'startDate',
      key:'date'
    },
    {
      title:'签退时间',
      dataIndex:'endDate',
      key:'endDate'
    },
    {
      title:'手环使用记录',
      dataIndex:'use',
      key:'use'
    },
    {
      title:'值班前台',
      dataIndex:'duty',
      key:'duty'
    }
  ]

  render(){

    const tableData = [
      {
        key:'1',
        startDate:'2018-08-10',
        endDate:'2018-08-11',
        use:'男15号【已归还】',
        duty:'王尼玛'
      },
      {
        key:'2',
        startDate:'2018-09-10',
        endDate:'2018-09-11',
        use:'男15号【已归还】、男28号【已归还】',
        duty:'尼玛玩'
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

export default SignList;
