import React, { PureComponent } from 'react';
import router from 'umi/router'
import {
  Form,
  Input,
  Modal,
  DatePicker,
  Table,
  Button,
  Icon,
  TimePicker
} from 'antd';
import StandardFormRow from '@/components/StandardFormRow'
import moment from 'moment'
import styles from './style.less';

const FormItem = Form.Item;

const tableList = [
  {
    id: 1,
    type: '常规私教课',
    course: '8/32',
    end_date: '2019-11-20',
  },
  {
    id: 2,
    type: '常规私教课',
    course: '8/32',
    end_date: '2019-11-20',
  },
];

@Form.create()
class MemberEliminate extends PureComponent {

  state = {
    currentStep: 0,
  };

  columns = [
    {
      title: '课程类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '余课/总课',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: '课程到期时间',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => <a href="javascript:;" onClick={() => this.forward()}>消课</a>,
    },
  ];

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderFooter = currentStep => {
    if(currentStep === 1){
      return [
        <Button key="cancel" onClick={() => this.backward()}>
          上一步
        </Button>,
        <Button key="forward" type="primary" onClick={this.handleSubmit.bind(this)}>
          完成消课
        </Button>,
      ]
    }
    return [

    ]
  };

  renderContent() {
    const {currentStep} = this.state
    const { form } = this.props;
    return (
      <div>
        <div className={styles.baseInfo}
             style={{ paddingBottom: '30px', borderBottom: '1px solid #e8e8e8', marginBottom: '24px' }}>
          <div className={styles.memberInfo}>
            <p className={styles.avatar}>
              <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
            </p>
            <div className={styles.baseMsg}>
              <p className={styles.title}>
                <span>陈鑫</span>
                <span>28</span>
              </p>
              <p className={styles.subTitle}>180340431333</p>
            </div>
          </div>
          <span className={styles.divider}></span>
          <div className={styles.ship}>
            <p>维护会籍</p>
            <p className={styles.name}>王尼玛</p>
          </div>
        </div>
        {
          currentStep === 0 ?
            <div className={styles.tableList}>
              <Table
                rowKey='id'
                pagination={false}
                dataSource={tableList}
                columns={this.columns}
              />
              <Button onClick={()=>router.push('/member/member-list/detail/elimination')}>查看更多已消完&已过期课程 <Icon type="right"/></Button>
            </div> :
            <div className={styles.eliminateBox}>
              <p className={styles.title}>常规私教课 8/32</p>
              <StandardFormRow title="上课日期" labelCol={5} wrapperCol={19}>
                <div className={styles.moneyInfo}>
                  <FormItem key="date" style={{flex:1}}>
                    {form.getFieldDecorator('date', {
                      rules: [{ required: true, message: '请选择上课日期' }]
                    })(
                      <DatePicker
                        style={{width:'100%'}}
                        placeholder="请选择上课日期"/>
                    )}
                  </FormItem>
                  <p className={styles.price}>三天前</p>
                </div>
              </StandardFormRow>
              <StandardFormRow style={{borderBottom:'1px solid #e8e8e8', paddingBottom:'24px'}} title="上课时间" labelCol={5} wrapperCol={19}>
                <FormItem key="time">
                  {form.getFieldDecorator('time', {
                    rules: [{ required: true, message: '请选择上课时间' }]
                  })(
                    <TimePicker
                      format="HH:mm"
                      style={{width:'100%'}}
                      placeholder="请选择上课时间"/>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="上课教练" labelCol={5} wrapperCol={19}>
                <FormItem key="coach">
                  {form.getFieldDecorator('coach', {
                    rules: [{ required: true, message: '请输入上课教练' }]
                  })(
                    <Input placeholder="请输入上课教练"/>
                  )}
                </FormItem>
              </StandardFormRow>
            </div>
        }
      </div>
    );
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

  render() {
    const {currentStep} = this.state
    const { eliminateModelVisible, handleEiminateModalVisible } = this.props;

    return (
      <Modal
        className={styles.memberModal}
        width={480}
        destroyOnClose
        title="消课"
        footer={this.renderFooter(currentStep)}
        visible={eliminateModelVisible}
        onCancel={() => handleEiminateModalVisible()}
        onOk={this.handleSubmit.bind(this)}
      >

        {this.renderContent()}

      </Modal>
    );
  }
}

export default MemberEliminate;
