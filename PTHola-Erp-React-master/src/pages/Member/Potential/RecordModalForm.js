import React, { PureComponent } from 'react';
import {
  Table,
  Modal,
} from 'antd';
import moment from 'moment';
import styles from './Potential.less';

class RecordModalForm extends PureComponent {

  render() {
    const { recordModalVisible, handleRecordModalVisible, rowItem={} } = this.props;

    const columns = [
      {
        title: '日期',
        dataIndex: 'created_at',
        key: 'created_at',
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title:'跟进描述',
        dataIndex:'content',
        key:'content'
      }
    ];

    return (
      <Modal
        className={styles.memberModal}
        width={680}
        destroyOnClose
        title="跟进记录"
        maskClosable={false}
        visible={recordModalVisible}
        footer={null}
        onCancel={() => handleRecordModalVisible()}
      >

        <div className={styles.tableListOperator}>
          <Table
            rowKey='uuid'
            bordered
            pagination={false}
            dataSource={rowItem.track_record ? rowItem.track_record.data : []}
            columns={columns}/>
        </div>

      </Modal>
    );
  }
}

export default RecordModalForm;
