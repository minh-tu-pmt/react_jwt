import React, { PureComponent } from 'react';
import {
  Modal,
  Table,
  Icon,
} from 'antd';
import moment from 'moment';
import styles from './OrderList.less';

class AmendRecordModal extends PureComponent {

  handleTableChange() {

  }

  renderTitle = key => {
    switch (key) {
      case 'day':
        return '充值天数';
      case 'course_type':
        return '课程类型';
      case 'course_number':
        return '课程数量';
      case 'end_time':
        return '结束时间';
      case 'start_time':
        return '开始时间';
      case 'money':
        return '支付金额';
      case 'order_uuid':
        return '订单编号';
      case 'remark':
        return '备注';
      case 'belong':
        return '业绩归属';
    }
  };

  renderDate = (item, val) => {
    let Item = val[item]
    return [
      moment(Item[0] * 1000).format('YYYY-MM-DD'),
      <Icon key={item} style={{ color: 'red', fontSize: '16px', margin: '0 5px' }} type="swap-right"/>,
      moment(Item[1] * 1000).format('YYYY-MM-DD'),
    ];
  };

  renderBelongs = (item, val) => {
    let Item = val[item]
    return [
      `(
        ${
          Item[0].map(i=>{
            return (
              ` ${i.name} ${i.rate * 100}% `
            )
          })
        }
      )`,
      <Icon key={item} style={{ color: 'red', fontSize: '16px', margin: '0 5px' }} type="swap-right"/>,
      `(
        ${
          Item[1].map(i=>{
            return (
              ` ${i.name} ${i.rate * 100}% `
            )
          })
        }
      )`
    ];
  };

  renderOther = (item, val) => {
    let Item = val[item]
    return [
      Item[0],
      <Icon key={item} style={{ color: 'red', fontSize: '16px', margin: '0 5px' }} type="swap-right"/>,
      Item[1],
    ];
  };

  render() {
    const { amendModalVisible, handleAmendModalVisible } = this.props;

    const columns = [
      {
        width:120,
        title: '修改时间',
        dataIndex: 'amend_time',
        key: 'amend_time',
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        width:100,
        title: '修改人',
        dataIndex: 'handler_name',
        key: 'handler_name',
      },
      {
        title: '修改内容',
        dataIndex: 'content',
        key: 'content',
        render: (val) => {
          return (
            Object.keys(val).map((item, index) => {
              return (
                <p className={styles.amends} key={index}>
                  {this.renderTitle(item)}：{
                  (item === 'start_time' || item === 'end_time') ?
                    this.renderDate(item, val)
                    : (item === 'belong' && Array.isArray(val[item][0])) ?
                    this.renderBelongs(item, val)
                    : this.renderOther(item, val)
                }
                </p>
              );
            })
          );

        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 50,
    };

    const tableList = [
      {
        uuid: 333,
        amend_time: 1540884700,
        handler_name: '甜心',
        content: {
          day: [10, 20],
          course_type: ['腿部训练', '腰部训练'],
          course_number: [20, 30],
          end_time: [1540884700, 1543563100],
          start_time: [1540884700, 1543563100],
          money: [3200, 300],
          belong: [
            [
              { name: '王尼玛', rate: 0 },
              { name: '甜心', rate: 0.1 },
            ],
            [
              { name: '王尼玛', rate: 0.5 },
              { name: '一护', rate: 0.5 },
              { name: '张三', rate: 0.8 },
            ],
          ],
          order_uuid: [1003948, 2049494],
          remark: ['吃加糖', '少放盐'],
        },
      },
      {
        uuid: 3222,
        amend_time: 1540884700,
        handler_name: '甜心',
        content: {
          day: [10, 20],
          course_type: ['腿部训练', '腰部训练'],
          course_number: [20, 30],
          end_time: [1540884700, 1543563100],
          start_time: [1540884700, 1543563100],
          money: [3200, 300],
          belong: ['王尼玛', '草泥马'],
          order_uuid: [1003948, 2049494],
          remark: ['吃加糖', '少放盐'],
        },
      },
    ];

    return (
      <Modal
        className={styles.memberModal}
        width={680}
        destroyOnClose
        title="订单修改记录"
        maskClosable={false}
        visible={amendModalVisible}
        footer={null}
        onCancel={() => handleAmendModalVisible()}
      >

        <div className={styles.tableListOperator}>
          <Table
            style={{minWidth:'600px'}}
            rowKey='uuid'
            bordered
            pagination={paginationProps}
            dataSource={tableList}
            onChange={this.handleTableChange.bind(this)}
            columns={columns}/>
        </div>

      </Modal>
    );
  }
}

export default AmendRecordModal;
