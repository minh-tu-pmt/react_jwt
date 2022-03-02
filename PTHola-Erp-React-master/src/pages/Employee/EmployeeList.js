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
  Table,
  Modal,
  Divider,
  DatePicker,
} from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddEmployee from './AddEmployee';
import styles from './EmployeeList.less';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ employee, loading }) => ({
  employee,
  loading: loading.models.employee,
}))
@Form.create()
class EmployeeList extends PureComponent {

  state = {
    expandForm: false,
    addVisible: false,
    pageSize: 10,
    fieldsValue: [],
    sortedInfo: {},
    error_response:{}
  };

  queryEmployeeList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/fetch',
      payload: params,
    });
  }

  componentDidMount() {
    this.queryEmployeeList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column: 'created_at',
      sort_mode: 'desc',
    });
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form
        onKeyDown={(e) => {
          e.keyCode == 13 && e.preventDefault();
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
        onKeyDown={(e) => {
          e.keyCode == 13 && e.preventDefault();
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
            <FormItem label="工号">
              {getFieldDecorator('card_number')(<Input placeholder="请输入搜索工号"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('roles')(<Input placeholder="请输入搜索角色"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="入职时间">
              {getFieldDecorator('entry_date')(
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="请选择入职时间"
                />,
              )}
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

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        fieldsValue.entry_date ? fieldsValue.entry_date = parseFloat(moment(fieldsValue.entry_date).format('X')) : '';

        this.queryEmployeeList({
          page: 1,
          page_size: this.state.pageSize,
          sort_column: 'created_at',
          sort_mode: 'desc',
          ...fieldsValue,
        });
        this.setState({
          sortedInfo: {},
          fieldsValue,
        });
      }
    });
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  addEmployeeInfo = fields => {
    const {dispatch} = this.props
    fields.entry_date = moment(fields.entry_date).format('YYYY-MM-DD')
    dispatch({
      type:'employee/add',
      payload: fields,
      callback:(res)=>{
        if(res.response){
          this.handleAddModalVisible(false)
          this.queryEmployeeList({
            page: 1,
            page_size: this.state.pageSize,
            sort_column: 'created_at',
            sort_mode: 'desc',
          });
        }else {
          this.setState({
            error_response:res.error_response
          })
        }
      }
    })
  };

  handleTableChange(pagination, filters, sorter) {
    const { fieldsValue } = this.state;
    this.setState({
      sortedInfo: sorter,
    });
    this.queryEmployeeList({
      page: pagination.current,
      page_size: pagination.pageSize,
      sort_column: sorter.field ? sorter.field : 'created_at',
      sort_mode: sorter.order === 'ascend' ? 'asc' : 'desc',
      ...fieldsValue,
    });
  }

  handleAddModalVisible = flag => {
    this.setState({
      addVisible: !!flag,
    });
  };

  render() {
    const {
      addVisible,
      sortedInfo,
      error_response
    } = this.state;
    const {
      employee: { response },
      loading,
    } = this.props;

    const columns = [
      {
        title: '照片',
        dataIndex: 'headimgurl',
        key: 'headimgurl',
        render: val => (
          <div className={styles.avatar}>
            <img src={val}/>
          </div>
        ),
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: val => <span>{val === 1 ? '男' : '女'}</span>,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工号',
        dataIndex: 'job_number',
        key: 'job_number',
        sorter: (a, b) => a.job_number - b.job_number,
        sortOrder: sortedInfo.columnKey === 'job_number' && sortedInfo.order,
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        render: val => <span className={styles.role}>会籍等{val ? val.length : 0}个角色</span>,
      },
      {
        title: '职称',
        dataIndex: 'job',
        key: 'job',
      },
      {
        title: '入职时间',
        dataIndex: 'entry_date',
        key: 'entry_date',
        sorter: (a, b) => a.entry_date - b.entry_date,
        sortOrder: sortedInfo.columnKey === 'entry_date' && sortedInfo.order,
        render: val => <span>{val ? moment(val * 1000).format('YYYY-MM-DD') : ''}</span>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (val, row) => <a href="javascript:;">修改</a>,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    const MethodsProps = {
      handleAddModalVisible: this.handleAddModalVisible,
      addEmployeeInfo: this.addEmployeeInfo,
      error_response: error_response,
      addVisible: addVisible,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleAddModalVisible(true)}>
              新建
            </Button>
            <div className={styles.tableList}>
              <Table
                rowKey='uuid'
                loading={loading}
                pagination={paginationProps}
                dataSource={response.employees}
                onChange={this.handleTableChange.bind(this)}
                columns={columns}/>
            </div>
          </div>
        </Card>

        <AddEmployee
          {...MethodsProps}
        />
      </PageHeaderWrapper>
    );
  }
}

export default EmployeeList;
