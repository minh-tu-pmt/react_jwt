import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
  Modal
} from 'antd';
import MemberHeader from '@/components/MemberHeader'
import styles from './AddMemberForm.less'

const FormItem = Form.Item;

@Form.create()

class AddMemberForm extends PureComponent{

  renderContent(){
    const { form, handleShipModalVisible, handlePayModalVisible } = this.props;

    return(
      <div>
        <div className={styles.listItem}>
          <div className={styles.listInfo}>
            <div className={styles.listRow}>
              <p className={styles.title}>到期时间</p>
              <p className={styles.date}>无会籍时间</p>
            </div>
            <div className={styles.listRow}>
              <p className={styles.subTitle}>维护会籍</p>
              <p className={styles.subTitle}>王大翠</p>
            </div>
          </div>
          <Button onClick={handleShipModalVisible}>续费</Button>
        </div>
        <div className={styles.listItem}>
          <div className={styles.listInfo}>
            <div className={styles.listRow}>
              <p className={styles.title}>剩余课时</p>
              <p className={styles.date}>剩余78节</p>
            </div>
            <div className={styles.listRow}>
              <p className={styles.subTitle}>维护教练</p>
              <p className={styles.subTitle}>甜心等3人</p>
            </div>
          </div>
          <Button onClick={handlePayModalVisible}>买课</Button>
        </div>
        <FormItem key="name" label="手环号">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入手环号' }],
          })(<Input placeholder="请输入手环号" />)}
        </FormItem>
      </div>
    );
  }

  render(){
    const { addModalVisible, handleAddModalVisible } = this.props;

    return(
      <Modal
        className={styles.memberModal}
        width={450}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="会员签到"
        visible={addModalVisible}
        onCancel={() => handleAddModalVisible()}
      >
        <MemberHeader
          avatar="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          name="陈鑫"
          age="24"
          phone="180340431333"
        />

        {this.renderContent()}

      </Modal>
    )
  }
}

export default AddMemberForm;
