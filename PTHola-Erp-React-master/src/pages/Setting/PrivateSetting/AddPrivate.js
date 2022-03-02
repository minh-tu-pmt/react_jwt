import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Modal,
  Button
} from 'antd';

import styles from './Setting.less'

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
class AddPrivateForm extends PureComponent {

  constructor(props) {
    super(props);

    this.formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  renderContent(){
    const { form:{getFieldDecorator} } = this.props;
    return [
      <FormItem key="name" {...this.formLayout} label="课程名称">
        {getFieldDecorator('name', {
          rules:[{required:true, message:'请输入课程名称'}]
        })(<Input placeholder="请输入课程名称"/>)}
      </FormItem>,
      <div className="ant-row ant-form-item" key="photo">
        <div className="ant-col-5 ant-form-item-label">
          <label className="ant-form-item-required">课程图片</label>
        </div>
        <div className="ant-col-19 ant-form-item-control-wrapper">
          <div className={styles.avatarModal}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
          </div>
          <FormItem style={{marginBottom:0}} key="photo" {...this.formLayout}>
            {getFieldDecorator('photo', {
              rules:[{required:true, message:'请输入课程描述'}],
              initialValue:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            })(
              <Input type="hidden"/>
            )}
          </FormItem>
          <Button icon="upload" style={{marginTop:'5px'}}>上传图片</Button>
        </div>
      </div>,
      <FormItem key="desc" {...this.formLayout} label="课程描述">
        {getFieldDecorator('desc', {
          rules:[{required:true, message:'请输入课程描述'}]
        })(
          <TextArea rows={4} placeholder="请输入课程描述"/>
        )}
      </FormItem>,
      <FormItem key="order" {...this.formLayout} label="课程序号">
        {getFieldDecorator('order', {
          rules:[{required:true, message:'请输入课程序号'}]
        })(<Input placeholder="请输入课程序号"/>)}
      </FormItem>
    ]
  }

  render() {
    const { addPrivateVisible, handleAddModalVisible, form } = this.props;

    return (
      <Modal
        className={styles.memberModal}
        width={500}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title="新增课程种类"
        maskClosable={false}
        visible={addPrivateVisible}
        onOk={this.handleSubmit.bind(this)}
        onCancel={() => handleAddModalVisible()}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

export default AddPrivateForm

