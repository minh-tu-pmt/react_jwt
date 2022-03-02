import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Icon,
  Button,
  Menu,
  Dropdown,
  Divider,
} from 'antd';
import moment from 'moment';
import styles from './MemberSignIn.less';
import MemberShipForm from '@/components/Member/MemberShipForm';
import MemberLeave from '@/components/Member/MemberLeave';
import MemberPayCourse from '@/components/Member/MemberPayCourse';
import MemberEliminate from '@/components/Member/MemberEliminate';
import AdvancedTable from '@/components/AdvancedTable';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ sign, loading }) => ({
  sign,
  loading: loading.models.sign,
}))
@Form.create()
class MemberSignIn extends PureComponent {

  state = {
    shipModelVisible: false, //会籍续费
    leaveModelVisible: false,  //请假
    payModelVisible: false,  //买私教课
    eliminateModelVisible: false, //私教消课

    page:1,
    pageSize: 10,
    form_values:[],
    is_today:1
  };

  columns = [  //sortUp 1:默认不排序  2:升序  3:降序
    {
      title: '手牌号',
      hasSort: false,
      tooltip: '目标提示信息',  //目标提示信息
      children: [
        {
          title: '男',
          sortUp: 1,
          hasSort: false,
        },
        {
          title: '女',
          sortUp: 1,
          hasSort: false,
        },
      ],
    },
    {
      title: '会员基本信息',
      hasSort: false,
      children: [
        {
          title: '姓名',
          sortUp: 1,
          hasSort: false,
          sort_column: 'name',
          tooltip: '',
        },
        {
          title: '年龄',
          sortUp: 1,
          hasSort: false,
          sort_column:'age'
        },
      ],
    },
    {
      title: '会员卡号',
      hasSort: false,
      children: [
        {
          title: '录入时间',
          hasSort: true,
          sortUp: 1,
          sort_column:'created_at',
        },
      ],
    },
    {
      title: '到期时间',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '维护会籍',
          hasSort: false,
        },
      ],
    },
    {
      title: '剩余课时',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '维护教练',
          hasSort: false,
        },
      ],
    },
    {
      title: '入场状态',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '全部状态',
          hasSort: false,
        },
      ],
    },
    {
      title: '入场时间',
      hasSort: true,
      sortUp: 1,
      sort_column:'sign_time',
      children: [
        {
          title: '离场状态',
          hasSort: false,
        },
      ],
    },
    {
      title: '操作',
    },
  ];

  //获取签到列表
  querySignList(params) {
    const { dispatch } = this.props;
    const {is_today} = this.state

    dispatch({
      type: 'sign/fetch',
      payload: Object.assign(params,{is_today}),
    });
  }

  componentDidMount() {
    this.querySignList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column: "created_at",
      sort_mode: "desc"
    });
  }

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>
          <span onClick={this.handleEiminateModalVisible.bind(this, true)}>私教消课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleShipModalVisible.bind(this, true)}>会籍续费</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handlePayModalVisible.bind(this, true)}>买私教课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLeaveModalVisible.bind(this, true)}>会籍请假</span>
        </Menu.Item>
      </Menu>
    );
  }

  renderTbody(item) {
    const coaches = item.coaches_name ? item.coaches_name.split(',') : '';

    return (
      <tr key={item.uuid}>
        <td>
          {
            item.bracelets ?
              <p className={styles.signNum}>
                {
                  item.bracelets.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.status == 0 ? item.msg : ''}
                      </span>
                    );
                  })
                }
              </p>
              : <a href="javascript:;">未领手环</a>
          }
        </td>
        <td>
          {this.renderMemberInfo(item.headimgurl, item.name, item.age, item.phone)}
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.cardInfo}>
                <p className={styles.title}>{item.card_number}</p>
                <p className={styles.subTitle}>{moment(item.created_at * 1000).format('YYYY-MM-DD')}</p>
              </div> : '访客'
          }
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.dateInfo}>
                <p className={styles.date}>{item.expire ? moment(item.expire * 1000).format('YYYY-MM-DD') : '无会籍卡'}</p>
                <p className={styles.subTitle}>{item.membership}</p>
              </div> : ''
          }
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.dateInfo}>
                <p className={styles.date}>剩余{item.has_course_count ? item.has_course_count : 0}节</p>
                <p
                  className={styles.subTitle}>{coaches.length > 1 ? coaches[0] + '教练等' + coaches.length + '人' : coaches[0]}</p>
              </div> : ''
          }
        </td>
        <td>
          <div className={styles.status}>
            <p className={styles.statusTxt}>
              {item.status == 1 ? '已入场' : item.status == 2 ? '已超时' : '已离场'}
            </p>
          </div>
        </td>
        <td>
          <div className={styles.timeOrder}>
            <p className={styles.statusSign}>入</p>
            <p className={styles.title}>{moment(item.sign_time * 1000).format('MM-DD HH:mm')}</p>
          </div>
          <div className={styles.timeOrder}>
            <p className={styles.statusSign}>离</p>
            <p className={styles.title}>{moment(item.leave_time * 1000).format('MM-DD HH:mm')}</p>
          </div>
        </td>
        <td>
          <div className={styles.opers}>
            <a href="#">签退</a>
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

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="入场状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">已入场</Option>
                  <Option value="2">已超时</Option>
                  <Option value="3">已离场</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>

    );
  }

  handleSearch(e){
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({
          form_values: values,
        });
        this.querySignList({
          page:1,
          page_size: this.state.pageSize,
          sort_column:'created_at',
          sort_mode:'desc',
          ...values
        })
        this.refs.advancedTable.handleReset();
      }
    });
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

  onPageChange(page, pageSize, sorter) {
    const { form_values } = this.state;

    this.querySignList({
      page,
      page_size: pageSize,
      sort_column: sorter.sort_column ? sorter.sort_column : "created_at",
      sort_mode: sorter.sortUp === 2 ? 'asc' : sorter.sortUp === 3 ? 'desc' : 'desc',
      ...form_values,
    });
  }

  handleShipModalVisible = flag => {
    this.setState({
      shipModelVisible: !!flag,
    });
  };

  handleLeaveModalVisible = flag => {
    this.setState({
      leaveModelVisible: !!flag,
    });
  };

  handlePayModalVisible = flag => {
    this.setState({
      payModelVisible: !!flag,
    });
  };

  handleEiminateModalVisible = flag => {
    this.setState({
      eliminateModelVisible: !!flag,
    });
  };

  render() {
    const {
      shipModelVisible,
      leaveModelVisible,
      payModelVisible,
      eliminateModelVisible,
    } = this.state;

    const {
      sign: { response },
      loading,
    } = this.props;

    const memberMethods = {
      handleShipModalVisible: this.handleShipModalVisible,
      handleLeaveModalVisible: this.handleLeaveModalVisible,
      handlePayModalVisible: this.handlePayModalVisible,
      handleEiminateModalVisible: this.handleEiminateModalVisible,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    
    return (
      <div className={styles.tableContent}>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>

          <AdvancedTable
            ref="advancedTable"
            loading={loading}
            columns={this.columns}
            data={response.signs}
            pagination={paginationProps}
            onPageChange={this.onPageChange.bind(this)}>
            <tbody>
            {
              response.signs.map(item => {
                return (
                  this.renderTbody(item)
                );
              })
            }
            </tbody>
          </AdvancedTable>

        </Card>

        <MemberShipForm
          {...memberMethods}
          shipModelVisible={shipModelVisible}
        />

        <MemberLeave
          {...memberMethods}
          leaveModelVisible={leaveModelVisible}
        />

        <MemberPayCourse
          {...memberMethods}
          payModelVisible={payModelVisible}
        />

        <MemberEliminate
          {...memberMethods}
          eliminateModelVisible={eliminateModelVisible}
        />

      </div>
    );
  }
}

export default MemberSignIn;
