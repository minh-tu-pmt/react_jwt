import React, {PureComponent} from 'react'
import styles from './Potential.less';
import {
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Button
} from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
class PotentialForm extends PureComponent{

  constructor(props) {
    super(props);

    this.formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };
  }

  renderContent(){
    const { form:{getFieldDecorator} } = this.props;
    const signs = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];
    return [
      <FormItem key="name" {...this.formLayout} label="姓名">
        {getFieldDecorator('name', {
        })(<Input placeholder="请输入姓名"/>)}
      </FormItem>,
      <FormItem key="sex" {...this.formLayout} label="性别">
        {getFieldDecorator('sex', {
        })(
          <RadioGroup>
            <Radio value="1">男</Radio>
            <Radio value="2">女</Radio>
          </RadioGroup>,
        )}
      </FormItem>,
      <FormItem key="IDcard" {...this.formLayout} label="手机号码">
        {getFieldDecorator('phone', {
        })(<Input placeholder="请输入手机号"/>)}
      </FormItem>,
      <FormItem key="membership_name" {...this.formLayout} label="维护会籍">
        {getFieldDecorator('membership_name', {
        })(<Input placeholder="请输入维护会籍"/>)}
      </FormItem>,
      <FormItem key="signs" {...this.formLayout} label="跟进标签">
        {getFieldDecorator('signs')(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择更进标签"
          >
            {
              signs.map(item => {
                return (
                  <Option key={item.id}>{item.name}</Option>
                );
              })
            }
          </Select>,
        )}
      </FormItem>,
    ]
  }

  handleSubmit(e){
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  renderFooter(uuid){
    const {handleModalVisible} = this.props

    if(uuid){
      return [
        <Button key="save" type="primary"  onClick={this.handleSubmit.bind(this)}>
          完成保存
        </Button>,
        <Button key="forward">
          转化会员
        </Button>,
      ]
    }else {
      return [
        <Button key="cancel" onClick={() => handleModalVisible()}>
          取消
        </Button>,
        <Button key="save" type="primary"  onClick={this.handleSubmit.bind(this)}>
          完成
        </Button>
      ]
    }
  }

  render(){
    const { modalVisible, uuid, handleModalVisible } = this.props;
    return(
      <Modal
        className={styles.memberModal}
        width={500}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title={uuid ? '编辑潜在会员' : '新增潜在会员'}
        maskClosable={false}
        visible={modalVisible}
        footer={this.renderFooter(uuid)}
        onCancel={()=>handleModalVisible()}
      >
        {this.renderContent()}
      </Modal>
    )
  }
}

export default PotentialForm;
