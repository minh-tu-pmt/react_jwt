import React, { PureComponent } from 'react';
import {connect} from 'dva'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  DatePicker,
  Table
} from 'antd';

import StandarInfoData from '@/components/StandarInfoData'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './EliminateList.less'
import moment from 'moment'

const FormItem = Form.Item;

@connect(({ eliminate, loading }) => ({
  eliminate,
  loading: loading.models.eliminate,
}))
@Form.create()
class EliminateList extends PureComponent {
  state = {
    expandForm: false,
    page:1,
    pageSize:10,
    fieldsValue:[],
    sortedInfo:{}
  };

  //获取消课列表
  queryAttendList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'eliminate/fetch',
      payload: params,
    });
  }

  componentDidMount() {
    this.queryAttendList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column:'handler_time',
      sort_mode:'desc',
    })
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch(e){
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if(!err){
        fieldsValue.start_time ? fieldsValue.start_time = parseFloat(moment(fieldsValue.start_time).format('X')) : ''
        fieldsValue.end_time ? fieldsValue.end_time = parseFloat(moment(fieldsValue.end_time).format('X')) : ''

        this.queryAttendList({
          page:1,
          page_size: this.state.pageSize,
          sort_column:'handler_time',
          sort_mode:'desc',
          ...fieldsValue
        })
        this.setState({
          sortedInfo:{},
          fieldsValue
        })
      }
    });
  }

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
            <FormItem label="上课开始时间">
              {getFieldDecorator('start_time')(<DatePicker />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上课结束时间">
              {getFieldDecorator('end_time')(<DatePicker />)}
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

    return (
      <Form
        onKeyDown={(e)=>{
          e.keyCode == 13 && e.preventDefault()
        }}
        onSubmit={this.handleSearch.bind(this)}
        layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="上课开始时间">
              {getFieldDecorator('start_time')(<DatePicker />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上课结束时间">
              {getFieldDecorator('end_time')(<DatePicker />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会员姓名">
              {getFieldDecorator('member_name')(<Input placeholder="请输入会员姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上课教练">
              {getFieldDecorator('coach_name')(<Input placeholder="请输入上课教练"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="课程名称">
              {getFieldDecorator('course_name')(<Input placeholder="请输入课程名称"/>)}
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

  handleTableChange(pagination, filters, sorter){
    const {fieldsValue} = this.state
    this.setState({
      sortedInfo:sorter
    })

    this.queryAttendList({
      page:pagination.current,
      page_size:pagination.pageSize,
      sort_column:sorter.field ? sorter.field : 'handler_time',
      sort_mode:sorter.order === 'ascend' ? 'asc' : 'desc',
      ...fieldsValue
    })
  }

  render() {
    const {
      eliminate:{response},
      loading
    } = this.props

    const {sortedInfo} = this.state

    const columns = [
      {
        title:'会员姓名',
        dataIndex:'member_name',
        key:'member_name'
      },
      {
        title:'上课教练',
        dataIndex:'coach_name',
        key:'coach_name'
      },
      {
        title:'上课日期(上课时间)',
        dataIndex:'attend_time',
        key:'attend_time',
        sorter: (a, b) => a.attend_time - b.attend_time,
        sortOrder: sortedInfo.columnKey === 'attend_time' && sortedInfo.order,
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title:'课程名称',
        dataIndex:'course_name',
        key:'course_name'
      },
      {
        title:'课程单价',
        dataIndex:'price',
        key:'price',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        render:val => <span>¥{val.toFixed(2)}</span>,
      },
      {
        title:'前台当值',
        dataIndex:'handler_name',
        key:'handler_name'
      },
      {
        title:'操作日期(操作时间)',
        dataIndex:'handler_time',
        key:'handler_time',
        sorter: (a, b) => a.handler_time - b.handler_time,
        sortOrder: sortedInfo.columnKey === 'handler_time' && sortedInfo.order,
        render:val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title:'确认状态',
        dataIndex:'status',
        key:'status',
        render:val => <span>{val===1 ? '会员已确认' : '会员未确认'}</span>
      },
      {
        title:'操作',
        dataIndex:'',
        key:'x',
        render:val => <a href="javascript:;">修改</a>
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="今日消课数" number="28" subTitle1="本周283" subTitle2="本月1700" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="今日销售课时" number="36" subTitle1="本周283" subTitle2="本月100" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="今日销售业绩" number="¥7100" subTitle1="本周¥34000" subTitle2="本月¥89000" bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="剩余总课时" number="100" subTitle1="已消1345" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="今日消课收入" number="¥56000" subTitle1="本周¥34000" subTitle2="本月¥89000"/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary">
              导出
            </Button>
            <div className={styles.tableList}>
              <Table
                loading={loading}
                rowKey='uuid'
                pagination={paginationProps}
                dataSource={response.attend_courses}
                onChange={this.handleTableChange.bind(this)}
                columns={columns}/>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EliminateList;
