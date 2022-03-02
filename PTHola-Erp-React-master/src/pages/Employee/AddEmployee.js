import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  Steps,
  DatePicker,
} from 'antd';
import moment from 'moment';
import styles from './EmployeeList.less';
import StandardFormRow from '@/components/StandardFormRow';

const { Step } = Steps;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create({
  onValuesChange(props, changedValues, allValues) {
    const { error_response } = props;
    const errors = error_response.content || {};
    delete errors[Object.keys(changedValues)[0]];
  },
})
class AddEmployee extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {},
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: 5,
      wrapperCol: 18,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { error_response = {}, form: { setFields } } = nextProps;
    if (this.props.error_response !== nextProps.error_response) {
      let errors = error_response.content || {};
      let keys = Object.keys(errors);
      let arrs = ['name', 'phone', 'job_number', 'account', 'password'];
      let newKeys = []  //排序后的新顺序

      for(const k of arrs) {
        if(keys.includes(k)){
          newKeys.push(k)
        }
      }
      this.checkStepCurrent(newKeys, () => {
        for (const k of newKeys) {
          setFields({
            [k]: {
              errors: [new Error(errors[k])],
            },
          });
        }
      });
    }
  }

  checkStepCurrent(keys, callback) {
    for (const k of keys) {
      if (k === 'name' || k === 'phone') {
        this.setState({
          currentStep: 0,
        }, callback);
        return
      } else if (k === 'job_number') {
        this.setState({
          currentStep: 1,
        }, callback);
        return
      } else if (k === 'account' || k === 'password') {
        this.setState({
          currentStep: 3,
        }, callback);
        return
      }
    }
  }

  handleNext = currentStep => {
    const { form, addEmployeeInfo } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 3) {
            this.forward();
          } else {
            addEmployeeInfo(formVals);
            //handleUpdate(formVals);
          }
        },
      );
    });
  };

  backward = () => {
    this.renderStepDirection(-1);
  };

  forward = () => {
    this.renderStepDirection(1);
  };

  renderStepDirection(count) {
    const { currentStep } = this.state;
    const {
      form: { setFields },
      error_response,
    } = this.props;
    const errors = error_response.content || {};
    const keys = Object.keys(errors);

    this.setState({
      currentStep: currentStep + count,
    }, () => {
      for (const k of keys) {
        setFields({
          [k]: {
            errors: [new Error(errors[k])],
          },
        });
      }
    });
  }

  renderContent = (currentStep, formVals) => {
    const { form, roles } = this.props;
    if (currentStep === 1) {
      return [
        <StandardFormRow required={true} key="job_number" title="工号" {...this.formLayout}>
          <FormItem key="job_number">
            {form.getFieldDecorator('job_number', {
              rules: [
                { required: true, message: '请输入员工工号' },
                { pattern: '^[0-9]*$', message: '请输入数字员工工号' },
              ],
              initialValue: formVals.job_number,
            })(
              <Input placeholder="请输入员工工号"/>,
            )}
          </FormItem>
          <p className={styles.msg}>
            工号的先后顺序决定对会员展示列表的顺序
          </p>
        </StandardFormRow>,
        <StandardFormRow required={true} key="job" title="职称" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('job', {
              rules: [{ required: true, message: '请输入员工职称' }],
              initialValue: formVals.job,
            })(
              <Input placeholder="请输入员工职称"/>,
            )}
          </FormItem>
          <p className={styles.msg}>
            对会员展示的称谓，并非内部管理角色
          </p>
        </StandardFormRow>,
        <StandardFormRow required={true} key="entry_date" title="入职时间" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('entry_date', {
              rules: [{ required: true, message: '请选择员工入职时间' }],
              initialValue: formVals.entry_date && moment(moment(formVals.date), 'YYYY-MM-DD'),
            })(
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="请选择员工入职时间"
              />,
            )}
          </FormItem>
        </StandardFormRow>,
      ];
    }
    if (currentStep === 2) {
      return [
        <StandardFormRow required={true} key="role" title="角色权限" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('roles', {
              rules: [{ required: true, message: '请选择员工角色' }],
              initialValue: formVals.roles,
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择员工角色"
              >
                {
                  roles.map(item => {
                    return (
                      <Option key={item.name}>{item.show_name}</Option>
                    );
                  })
                }
              </Select>,
            )}
          </FormItem>
          <p className={styles.msg}>
            可多选，详细角色权限，<a href="javascript:;">点击查看</a>
          </p>
          <p className={styles.msg}>
            工作室的管理建议每个教练兼具：会籍、教练、前台三个权限
          </p>
        </StandardFormRow>,
      ];
    }
    if (currentStep === 3) {
      return [
        <StandardFormRow key="account" title="登录账户" {...this.formLayout}>
          <FormItem key="account">
            {form.getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入员工登录账户' }],
              initialValue: formVals.account,
            })(
              <Input placeholder="请输入员工登录账户" addonAfter="@PTHola"/>,
            )}
          </FormItem>
          <p className={styles.msg}>
            员工可使用账号@场馆唯一标示登录后台，建议使用【手机号】或【工号】
          </p>
        </StandardFormRow>,
        <StandardFormRow key="password" title="登录密码" {...this.formLayout}>
          <FormItem key="password">
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入员工登录密码' }],
              initialValue: formVals.password,
            })(
              <Input placeholder="请输入员工登录密码"/>,
            )}
          </FormItem>
          <p className={styles.msg}>
            员工首次登录密码；首次登录后，会强制员工修改密码
          </p>
        </StandardFormRow>,
      ];
    }
    return [
      <StandardFormRow required={true} key="name" title="姓名" {...this.formLayout}>
        <FormItem key="membership">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入员工姓名' }],
            initialValue: formVals.name,
          })(<Input placeholder="请输入员工姓名"/>)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow required={true} key="sex" title="性别" {...this.formLayout}>
        <FormItem key="membership">
          {form.getFieldDecorator('sex', {
            rules: [{ required: true, message: '请选择性别' }],
            initialValue: '1',
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择性别"
            >
              <Option key="1" value="1">
                男
              </Option>
              <Option key="2" value="2">
                女
              </Option>
            </Select>,
          )}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow required={true} key="phone" title="手机号码" {...this.formLayout}>
        <FormItem key="phone">
          {form.getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入员工手机号码' },
              { pattern: '^1[0-9]{10}$', message: '请输入正确手机号' },
            ],
            initialValue: formVals.phone,
          })(<Input placeholder="请输入员工手机号码"/>)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow key="photo" title="人脸拍照" {...this.formLayout}>
        <div className={styles.operList}>
          <div className={styles.avatar}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
          </div>
          <div className={styles.btns}>
            <Button type="primary">拍摄</Button>
            <Button>上传</Button>
          </div>
        </div>
        <FormItem key="headimgurl">
          {form.getFieldDecorator('headimgurl', {
            initialValue: formVals.headimgurl,
          })(
            <Input type="hidden"/>,
          )}
        </FormItem>
      </StandardFormRow>,
    ];
  };

  renderFooter = currentStep => {
    const { handleAddModalVisible } = this.props;
    if (currentStep === 1 || currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleAddModalVisible()}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 3) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleAddModalVisible()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleAddModalVisible()}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { addVisible, handleAddModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        className={styles.memberModal}
        width={550}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title="新增员工"
        maskClosable={false}
        visible={addVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleAddModalVisible()}
      >
        <Steps style={{ marginBottom: 35 }} size="small" current={currentStep}>
          <Step title="基本"/>
          <Step title="职位"/>
          <Step title="权限"/>
          <Step title="账户"/>
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default connect(({ global }) => ({
  roles: global.response.roles,
}))(AddEmployee);
