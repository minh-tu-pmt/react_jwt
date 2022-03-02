import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
  Table,
  Divider,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandarInfoData from '@/components/StandarInfoData';
import ShipTimeModal from './ShipTimeModal';
import PayCourseModal from './PayCourseModal';
import LeaveStopModal from './LeaveStopModal';
import AmendRecordModal from './AmendRecordModal';
import styles from './OrderList.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const orderTypes = [
  {
    id: 'TIME_CARD',
    name: '时间卡',
  },
  {
    id: 'PT_COURSE',
    name: '私教课',
  },
  {
    id: 'STOP_CARD',
    name: '停卡',
  },
];

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
class OrderList extends PureComponent {
  state = {
    expandForm: false,
    pageSize: 10,
    fieldsValue: [],
    sortedInfo: {},
    shipModalVisible: false,
    payModalVisible: false,
    leaveModalVisible: false,
    amendModalVisible: false,
    rowItem: null,
  };

  //获取订单列表
  queryOrderList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
      payload: params,
    });
  }

  componentDidMount() {
    this.queryOrderList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column: 'handler_time',
      sort_mode: 'desc',
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
          <Col md={6} sm={24}>
            <FormItem label="开始时间">
              {getFieldDecorator('start_time')(<DatePicker/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="结束时间">
              {getFieldDecorator('end_time')(<DatePicker/>)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="订单类型">
              {getFieldDecorator('order_type')(
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: '100%' }}
                  placeholder="请选择课程类型"
                >
                  {orderTypes.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
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
          <Col md={6} sm={24}>
            <FormItem label="开始时间">
              {getFieldDecorator('start_time')(<DatePicker/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="结束时间">
              {getFieldDecorator('end_time')(<DatePicker/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单类型">
              {getFieldDecorator('order_type')(
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: '100%' }}
                  placeholder="请选择课程类型"
                >
                  {orderTypes.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="卡号">
              {getFieldDecorator('card_number')(<Input placeholder="请输入会员卡号"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('order_number')(<Input placeholder="请输入订单号"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="财务锁定">
              {getFieldDecorator('locked')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择财务锁定"
                >
                  <Option key='1' value='1'>
                    已锁定
                  </Option>
                  <Option key='0' value='0'>
                    未锁定
                  </Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="修改">
              {getFieldDecorator('order_amend')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择是否修改"
                >
                  <Option key='1' value='1'>
                    有修改
                  </Option>
                  <Option key='0' value='0'>
                    没修改
                  </Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleSearch(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ fieldsValue });
        fieldsValue.start_time ? fieldsValue.start_time = parseFloat(moment(fieldsValue.start_time).format('X')) : '';
        fieldsValue.end_time ? fieldsValue.end_time = parseFloat(moment(fieldsValue.end_time).format('X')) : '';
        fieldsValue.locked ? fieldsValue.locked = parseFloat(fieldsValue.locked) : '';
        fieldsValue.order_number ? fieldsValue.order_number = parseFloat(fieldsValue.order_number) : '';

        this.queryOrderList({
          page: 1,
          page_size: this.state.pageSize,
          sort_column: 'handler_time',
          sort_mode: 'desc',
          ...fieldsValue,
        });
        this.setState({
          sortedInfo: {},
        });
      }
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const { fieldsValue } = this.state;
    this.setState({
      sortedInfo: sorter,
    });

    this.queryOrderList({
      page: pagination.current,
      page_size: pagination.pageSize,
      sort_column: sorter.field ? sorter.field : 'handler_time',
      sort_mode: sorter.order === 'ascend' ? 'asc' : 'desc',
      ...fieldsValue,
    });
  }

  handleCheckModal(row) {
    this.setState({ rowItem: row });
    switch (row.mold) {
      case 'TIME_CARD':
        this.handleShipModalVisible(true);
        break;
      case 'PT_COURSE':
        this.handlePayModalVisible(true);
        break;
      case 'STOP_CARD':
        this.handleLeaveModalVisible(true);
        break;
    }
  }

  handleShipModalVisible = flag => {
    this.setState({
      shipModalVisible: !!flag,
    });
  };

  handlePayModalVisible = flag => {
    this.setState({
      payModalVisible: !!flag,
    });
  };

  handleLeaveModalVisible = flag => {
    this.setState({
      leaveModalVisible: !!flag,
    });
  };

  handleAmendModalVisible = flag => {
    this.setState({
      amendModalVisible: !!flag,
      rowItem: flag
    });
  };

  render() {
    const {
      order: { response },
      loading,
    } = this.props;
    const {
      sortedInfo,
      shipModalVisible,
      payModalVisible,
      leaveModalVisible,
      amendModalVisible,
      rowItem,
    } = this.state;

    const columns = [
      {
        title: '订单号',
        dataIndex: 'order_number',
        key: 'order_number',
      },
      {
        title: '关联订单',
        dataIndex: 'relation_order_number',
        key: 'relation_order_number',
      },
      {
        title: '会员姓名',
        dataIndex: 'member_name',
        key: 'member_name',
      },
      {
        title: '会员卡号',
        dataIndex: 'card_number',
        key: 'card_number',
      },
      {
        title: '订单类型',
        dataIndex: 'mold',
        key: 'mold',
        render: val => <span>{val === 'TIME_CARD' ? '时间卡' : val === 'PT_COURSE' ? '私教课' : '停卡'}</span>,
      },
      {
        title: '订单数量',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '订单操作时间',
        dataIndex: 'handler_time',
        key: 'handler_time',
        sorter: (a, b) => a.handler_time - b.handler_time,
        sortOrder: sortedInfo.columnKey === 'handler_time' && sortedInfo.order,
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '前台操作员',
        dataIndex: 'handler_name',
        key: 'handler_name',
      },
      {
        title: '实收金额',
        dataIndex: 'payment',
        key: 'payment',
        sorter: (a, b) => a.payment - b.payment,
        sortOrder: sortedInfo.columnKey === 'payment' && sortedInfo.order,
        render: val => <span>¥{val ? val : 0}</span>,
      },
      {
        title: '订单修改记录',
        dataIndex: 'order_amend',
        key: 'order_amend',
        render: (val, row) => <a href="javascript:;"
                                 onClick={this.handleAmendModalVisible.bind(this, row)}>{val ? val : 0 + '条修改记录'}</a>,
      },
      {
        title: '财务锁定',
        dataIndex: 'locked',
        key: 'locked',
        render: val => <span>{val === 1 ? '是' : '否'}</span>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (row) => (
          <span>
          <a href="javascript:;">查看</a>
          <Divider type="vertical"/>
          <a href="javascript:;" onClick={this.handleCheckModal.bind(this, row)}>修改</a>
        </span>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    const memberMethods = {
      handleShipModalVisible: this.handleShipModalVisible,
      handlePayModalVisible: this.handlePayModalVisible,
      handleLeaveModalVisible: this.handleLeaveModalVisible,
      handleAmendModalVisible: this.handleAmendModalVisible,
      item: rowItem,
    };


    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月销售额" number="1343455" subTitle1="上月1234344" subTitle2="同比15%" up='true'
                                 bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月会籍销售额" number="193939" subTitle1="上月234444" subTitle2="同比16%" up="false"
                                 bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月私教销售额" number="710033" subTitle1="上月137447" subTitle2="同比17%" up='true'
                                 bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月其他销售额" number="3453454" subTitle1="上月28383" subTitle2="同比17%" up="false"
                                 bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月退款金额" number="56000" subTitle1="上月83292" subTitle2="同比19%" up='true'/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Table
              rowKey='uuid'
              loading={loading}
              pagination={paginationProps}
              dataSource={response.orders}
              onChange={this.handleTableChange.bind(this)}
              columns={columns}/>
          </div>
        </Card>

        <ShipTimeModal
          {...memberMethods}
          shipModalVisible={shipModalVisible}
        />

        <PayCourseModal
          {...memberMethods}
          payModalVisible={payModalVisible}
        />

        <LeaveStopModal
          {...memberMethods}
          leaveModalVisible={leaveModalVisible}
        />

        <AmendRecordModal
          {...memberMethods}
          amendModalVisible={amendModalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default OrderList;
