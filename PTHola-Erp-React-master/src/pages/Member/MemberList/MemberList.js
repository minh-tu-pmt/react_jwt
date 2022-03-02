import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Modal,
  Steps,
  Radio,
  Divider,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardFormRow from '@/components/StandardFormRow';
import StandarInfoData from '@/components/StandarInfoData';
import AdvancedTable from '@/components/AdvancedTable';

import styles from './MemberList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const owners = [
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

@Form.create()
class AddMemberForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: '',
        sex: '',
        phone: '',
        //birthday:'',
        target: '0',
        template: '0',
        frequency: 'month',
        headimgurl: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        card_number: '',
        membership_uuid: null,
        coaches_uuid: [],
        wechat: '',
        email: '',
        id_card: '',
        company: '',
        source_uuid: '',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
  }

  handleNext = currentStep => {
    const { form, handleAddMember } = this.props;
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
            handleAddMember(formVals)
            //handleUpdate(formVals);
          }
        },
      );
    });
  };

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

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="headimgurl" {...this.formLayout} label="人脸拍照">
          {form.getFieldDecorator('headimgurl', {
            initialValue: formVals.headimgurl,
          })(
            <div className={styles.operList}>
              <div className={styles.avatar}>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
              </div>
              <div className={styles.btns}>
                <Button type="primary">拍摄</Button>
                <Button>上传</Button>
              </div>
              <Input type="hidden"/>
            </div>,
          )}
        </FormItem>,
        <FormItem key="card_number" {...this.formLayout} label="实体卡号">
          {form.getFieldDecorator('card_number', {
            initialValue: formVals.card_number,
          })(
            <div className={styles.cardInfo}>
              <div className={styles.inp}>
                <Input defaultValue={formVals.card_number} placeholder="请输入实体卡号"/>
                <Button type="primary">刷卡</Button>
              </div>
              <p className={styles.msg}>
                手动输入或通过读卡器、刷卡器录入卡号
              </p>
            </div>,
          )}
        </FormItem>,
        <FormItem key="fingerprint" {...this.formLayout} label="指纹信息">
          {form.getFieldDecorator('fingerprint', {
            initialValue: formVals.fingerprint,
          })(
            <div className={styles.cardInfo}>
              <div className={styles.inp}>
                <Input disabled={true} style={{ textAlign: 'center' }} value="未采集"/>
                <Button type="primary">采集</Button>
              </div>
              <p className={styles.msg}>
                点击采集，根据提示完成指纹录入
              </p>
            </div>,
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <StandardFormRow title="维护会籍" labelCol={5} wrapperCol={15} key="1">
          <FormItem key="membership_uuid">
            {form.getFieldDecorator('membership_uuid', {
              initialValue: formVals.membership_uuid,
            })(
              <Select
                showSearch
                optionFilterProp="children"
                style={{ width: '100%' }}
                placeholder="请选择会籍"
              >
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <p className={styles.msg}>
            仅为方便管理，与业绩划分并无直接关系最多可选1位会籍
          </p>
        </StandardFormRow>,
        <StandardFormRow title="维护教练" labelCol={5} wrapperCol={15} key="2">
          <FormItem key="coaches_uuid">
            {form.getFieldDecorator('coaches_uuid', {
              initialValue: formVals.coaches_uuid,
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择教练"
              >
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>,
            )}
            <p className={styles.msg}>
              仅为方便管理，与业绩划分并无直接关系不限数量
            </p>
          </FormItem>
        </StandardFormRow>,
      ];
    }
    if (currentStep === 3) {
      return [
        <FormItem key="wechat" {...this.formLayout} label="微信">
          {form.getFieldDecorator('wechat', {
            initialValue: formVals.wechat,
          })(<Input placeholder="请输入微信号"/>)}
        </FormItem>,
        <FormItem key="email" {...this.formLayout} label="邮箱">
          {form.getFieldDecorator('email', {
            initialValue: formVals.email,
          })(<Input placeholder="请输入邮箱号"/>)}
        </FormItem>,
        <FormItem key="id_card" {...this.formLayout} label="身份证号">
          {form.getFieldDecorator('id_card', {
            initialValue: formVals.id_card,
          })(<Input placeholder="请输入身份证号"/>)}
        </FormItem>,
        <FormItem key="company" {...this.formLayout} label="所在单位">
          {form.getFieldDecorator('company', {
            initialValue: formVals.company,
          })(<Input placeholder="请输入所在单位"/>)}
        </FormItem>,
        <FormItem key="source_uuid" {...this.formLayout} label="来源渠道">
          {form.getFieldDecorator('source_uuid', {
            initialValue: formVals.source_uuid,
          })(<Input placeholder="请输入来源渠道"/>)}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入姓名' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入姓名"/>)}
      </FormItem>,
      <FormItem key="sex" {...this.formLayout} label="性别">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: '请选择性别' }],
          initialValue: formVals.sex,
        })(
          <RadioGroup>
            <Radio value="1">男</Radio>
            <Radio value="2">女</Radio>
          </RadioGroup>,
        )}
      </FormItem>,
      <FormItem key="birthday" {...this.formLayout} label="生日">
        {form.getFieldDecorator('birthday', {
          initialValue: formVals.birthday && moment(moment(formVals.birthday), 'YYYY-MM-DD'),
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择出生日期"
          />,
        )}
      </FormItem>,
      <FormItem key="phone" {...this.formLayout} label="手机号码">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机号码' }],
          initialValue: formVals.phone,
        })(<Input placeholder="请输入手机号码"/>)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleModalVisible } = this.props;
    if (currentStep === 1 || currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleModalVisible()}>
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
        <Button key="cancel" onClick={() => handleModalVisible()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleModalVisible()}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        className={styles.memberModal}
        width={550}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="新增会员"
        maskClosable={false}
        visible={modalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本"/>
          <Step title="打卡"/>
          <Step title="维护"/>
          <Step title="更多"/>
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

@Form.create()
class EditMemberForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderContent = () => {
    const { form } = this.props;

    return (
      <div className={styles.editForm}>

        <div className={styles.card}>
          <p className={styles.title}>基本信息</p>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="姓名" labelCol={6} wrapperCol={18}>
                <FormItem key="membership">
                  {form.getFieldDecorator('membership', {
                    initialValue: '',
                  })(<Input placeholder="请输入姓名"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="性别" labelCol={6} wrapperCol={18}>
                <FormItem key="sex">
                  {form.getFieldDecorator('sex', {
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
              </StandardFormRow>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="生日" labelCol={6} wrapperCol={18}>
                <FormItem key="born">
                  {form.getFieldDecorator('born', {})(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      placeholder="请选择出生日期"
                    />,
                  )}
                </FormItem>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="手机号" labelCol={6} wrapperCol={18}>
                <FormItem key="phone">
                  {form.getFieldDecorator('phone', {
                    initialValue: '',
                  })(
                    <Input placeholder="请输入手机号码"/>,
                  )}
                </FormItem>
              </StandardFormRow>
            </Col>
          </Row>
        </div>

        <div className={styles.card}>
          <p className={styles.title}>打卡信息</p>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="人脸拍照" labelCol={6} wrapperCol={18}>
                <FormItem key="photo">
                  {form.getFieldDecorator('photo', {
                    initialValue: '',
                  })(
                    <Input type="hidden"/>,
                  )}
                </FormItem>
                <div className={styles.operList}>
                  <div className={styles.avatar}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                  </div>
                  <div className={styles.btns}>
                    <Button type="primary">拍摄</Button>
                    <Button>上传</Button>
                  </div>
                </div>
              </StandardFormRow>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="实体卡号" labelCol={6} wrapperCol={18}>
                <div className={styles.cardBox}>
                  <FormItem key="card">
                    {form.getFieldDecorator('card', {
                      initialValue: '',
                    })(
                      <Input placeholder="请输入实体卡号"/>,
                    )}
                  </FormItem>
                  <Button>刷卡</Button>
                </div>
                <p className={styles.msg}>手动输入或通过读卡器、刷卡器录入卡号</p>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="指纹信息" labelCol={6} wrapperCol={18}>
                <div className={styles.cardBox}>
                  <FormItem key="fingerprint">
                    {form.getFieldDecorator('fingerprint', {
                      initialValue: '未采集',
                    })(
                      <Input disabled={true} style={{ textAlign: 'center' }}/>,
                    )}
                  </FormItem>
                  <Button>采集</Button>
                </div>
                <p className={styles.msg}>点击采集，根据提示完成指纹录入</p>
              </StandardFormRow>
            </Col>
          </Row>
        </div>

        <div className={styles.card}>
          <p className={styles.title}>维护信息</p>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="维护会籍" labelCol={5} wrapperCol={18}>
                <FormItem key="membership">
                  {form.getFieldDecorator('membership', {
                    initialValue: '',
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      style={{ width: '100%' }}
                      placeholder="请选择会籍"
                    >
                      {owners.map(owner => (
                        <Option key={owner.id} value={owner.id}>
                          {owner.name}
                        </Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>
                <p className={styles.msg}>
                  仅为方便管理，与业绩划分并无直接关系最多可选1位会籍
                </p>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="维护教练" labelCol={5} wrapperCol={18}>
                <FormItem key="coach">
                  {form.getFieldDecorator('coach', {
                    initialValue: [],
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="请选择教练"
                    >
                      {owners.map(owner => (
                        <Option key={owner.id} value={owner.id}>
                          {owner.name}
                        </Option>
                      ))}
                    </Select>,
                  )}
                  <p className={styles.msg}>
                    仅为方便管理，与业绩划分并无直接关系不限数量
                  </p>
                </FormItem>
              </StandardFormRow>
            </Col>
          </Row>
        </div>

        <div className={styles.card}>
          <p className={styles.title}>更多信息</p>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="微信" labelCol={5} wrapperCol={18}>
                <FormItem key="wx">
                  {form.getFieldDecorator('wx', {
                    initialValue: '',
                  })(<Input placeholder="请输入微信号"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="身份证号" labelCol={5} wrapperCol={18}>
                <FormItem key="IDcard">
                  {form.getFieldDecorator('IDcard', {
                    initialValue: '',
                  })(<Input placeholder="请输入身份证号"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="邮箱" labelCol={5} wrapperCol={18}>
                <FormItem key="email">
                  {form.getFieldDecorator('email', {
                    initialValue: '',
                  })(<Input placeholder="请输入邮箱"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
            <Col lg={12} sm={24}>
              <StandardFormRow title="所在单位" labelCol={5} wrapperCol={18}>
                <FormItem key="company">
                  {form.getFieldDecorator('company', {
                    initialValue: '',
                  })(<Input placeholder="请请输入所在单位"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} sm={24}>
              <StandardFormRow title="来源渠道" labelCol={5} wrapperCol={18}>
                <FormItem key="channel">
                  {form.getFieldDecorator('channel', {
                    initialValue: '',
                  })(<Input placeholder="请输入来源渠道"/>)}
                </FormItem>
              </StandardFormRow>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  handleSubmit(e) {
    const _this = this;
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  render() {

    const { editModalVisible, handleEditModalVisible } = this.props;

    return (
      <Modal
        width={750}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑会员"
        maskClosable={false}
        visible={editModalVisible}
        onOk={this.handleSubmit.bind(this)}
        onCancel={() => handleEditModalVisible()}
      >
        {this.renderContent()}
      </Modal>
    );
  }

}


@connect(({ member, loading }) => ({
  member,
  loading: loading.models.member,
}))
@Form.create()
class MemberList extends PureComponent {
  state = {
    expandForm: false,
    modalVisible: false,
    editModalVisible: false,
    form_values: [],
    page: 1,
    pageSize: 10,
  };

  columns = [   //sortUp 1:默认不排序  2:升序  3:降序
    {
      title: '会员基本信息',
      hasSort: false,
      children: [
        {
          title: '姓名',
          sortUp: 1,
          hasSort: true,
          sort_column: 'name',
        },
        {
          title: '年龄',
          sortUp: 1,
          hasSort: true,
          sort_column: 'age',
        },
      ],
    },
    {
      title: '会员卡号',
      hasSort: false,
      children: [
        {
          title: '录入时间',
          sortUp: 1,
          hasSort: true,
          sort_column: 'created_at',
        },
      ],
    },
    {
      title: '到期时间',
      hasSort: true,
      sortUp: 1,
      sort_column: 'expire',
      children: [
        {
          title: '维护会籍',
          hasSort: false,
        },
      ],
    },
    {
      title: '剩余课时',
      hasSort: true,
      sortUp: 1,
      sort_column: 'has_course_count',
      children: [
        {
          title: '维护教练',
          hasSort: false,
        },
      ],
    },
    {
      title: '上次打卡',
      hasSort: true,
      sortUp: 1,
      sort_column: 'last_sign_time',
    },
    {
      title: '上次消课',
      hasSort: true,
      sortUp: 1,
      sort_column: 'last_in_class_time',
    },
    {
      title: '消费总额',
      hasSort: true,
      sortUp: 1,
      sort_column: 'total_amount',
    },
    {
      title: '操作',
    },
  ];

  componentDidMount() {
    this.queryMemberList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column:'created_at',
      sort_mode:'desc'
    });
  }

  //获取会员列表
  queryMemberList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'member/fetch',
      payload: params,
    });
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form
        onKeyDown={(e)=>{
          e.keyCode == 13 && e.preventDefault()
        }}
        onSubmit={this.handleSearch.bind(this)}
        layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form
        onKeyDown={(e)=>{
          e.keyCode == 13 && e.preventDefault()
        }}
        onSubmit={this.handleSearch.bind(this)}
        layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会员卡">
              {getFieldDecorator('card_number')(<Input placeholder="请输入搜索会员卡号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会籍">
              {getFieldDecorator('membership_name')(<Input placeholder="请输入搜索会籍"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="教练">
              {getFieldDecorator('coaches_name')(<Input placeholder="请输入搜索教练"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  //提交搜索
  handleSearch(e) {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({
          form_values: values,
        });
        this.queryMemberList({
          page: 1,
          page_size: this.state.pageSize,
          sort_column:'created_at',
          sort_mode:'desc',
          ...values,
        });
        this.refs.advancedTable.handleReset();
      }
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleEditModalVisible = flag => {
    this.setState({
      editModalVisible: !!flag,
    });
  };

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>
          <span onClick={this.handleEditModalVisible.bind(this, true)}>编辑</span>
        </Menu.Item>
        <Menu.Item>
          <span>删除</span>
        </Menu.Item>
      </Menu>
    );
  }

  renderTbody(item) {
    const { match } = this.props;
    const coaches =  item.coaches_name ?  item.coaches_name.split(',') : '';
    return (
      <tr key={item.uuid}>
        <td>
          {this.renderMemberInfo(item.headimgurl, item.name, item.age, item.phone)}
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.card_number}</p>
            <p className={styles.inTime}>{moment(item.created_at * 1000).format('YYYY-MM-DD')}</p>
          </div>
        </td>
        <td>
          <div className={styles.dateInfo}>
            <p className={styles.date}>{item.expire ? moment(item.expire * 1000).format('YYYY-MM-DD') : '无会籍卡'}</p>
            <p className={styles.title}>{item.membership_name}</p>
          </div>
        </td>
        <td>
          <div className={styles.dateInfo}>
            <p className={styles.date}>剩余{item.has_course_count ? item.has_course_count : 0}节</p>
            <p
              className={styles.title}>{coaches.length > 1 ? coaches[0] + '教练等' + coaches.length + '人' : coaches[0]}</p>
          </div>
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.lastClock}</p>
            <p className={styles.inTime}>{item.last_sign_time ? moment(item.last_sign_time * 1000).format('YYYY-MM-DD') : ''}</p>
          </div>
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.lastClass}</p>
            <p className={styles.inTime}>{item.last_in_class_time ? moment(item.last_in_class_time * 1000).format('YYYY-MM-DD') : ''}</p>
          </div>
        </td>
        <td>
          ¥{item.total_amount ? item.total_amount : 0}
        </td>
        <td>
          <div className={styles.opers}>
            <Link to={`${match.url}/detail/sign`}>详情</Link>
            <Divider type="vertical"/>
            <Dropdown overlay={this.renderMenu()}>
              <a className="ant-dropdown-link" href="javascript:;">
                更多 <Icon type="down"/>
              </a>
            </Dropdown>
          </div>
        </td>
      </tr>
    );
  }

  renderMemberInfo(avatar, name, age, phone) {
    return (
      <div className={styles.memberInfo}>
        <p className={styles.avatar}>
          <img src={avatar}/>
        </p>
        <div className={styles.baseInfo}>
          <p className={styles.title}>
            <span>{name}</span>
            <span>{age}</span>
          </p>
          <p className={styles.subTitle}>{phone}</p>
        </div>
      </div>
    );
  }

  //分页
  onPageChange(page, pageSize, sorter) {
    const { form_values } = this.state;

    this.queryMemberList({
      page,
      page_size: pageSize,
      sort_column: sorter.sort_column ? sorter.sort_column : "created_at",
      sort_mode: sorter.sortUp === 2 ? 'asc' : sorter.sortUp === 3 ? 'desc' : 'desc',
      ...form_values,
    });
  }

  handleAddMember(fields){
    console.log(fields)
  }

  render() {
    const { modalVisible, editModalVisible } = this.state;
    const {
      member: { response },
      loading,
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    const addMemberMethods = {
      handleModalVisible: this.handleModalVisible,
      handleAddMember:this.handleAddMember,
      handleUpdate: this.handleUpdate,
    };

    const editMemberMethods = {
      handleEditModalVisible: this.handleEditModalVisible,
    };

    return (
      <PageHeaderWrapper className={styles.memberContent}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="会员总数" number="245" subTitle1="男134" subTitle2="女166" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="未过期会员" number="245" subTitle1="已过期58" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="私教会员" number="245" subTitle1="非私教会员100" bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="90天内即将过期" number="245" subTitle1="30天内过期12" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="剩余课时1-15节" number="245" subTitle1="剩余0节会员25"/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>

            <AdvancedTable
              ref="advancedTable"
              loading={loading}
              columns={this.columns}
              data={response.members}
              pagination={paginationProps}
              onPageChange={this.onPageChange.bind(this)}>
              <tbody>
              {
                response.members.map(item => {
                  return (
                    this.renderTbody(item)
                  );
                })
              }
              </tbody>
            </AdvancedTable>

          </div>
        </Card>

        <AddMemberForm
          {...addMemberMethods}
          modalVisible={modalVisible}
        />

        <EditMemberForm
          {...editMemberMethods}
          editModalVisible={editModalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default MemberList;
