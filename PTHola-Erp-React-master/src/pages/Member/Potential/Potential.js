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
} from 'antd';
import styles from './Potential.less';
import PotentialForm from './PotentialForm';
import RecordModalForm from './RecordModalForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@Form.create()
class AddFollowRecord extends PureComponent {

  handleSubmit(e) {
    const {
      addFollowRecord,
    } = this.props;
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        addFollowRecord(fieldsValue)
      }
    });
  }

  render() {
    const { addFollowVisible, handleAddModalVisible, form } = this.props;

    return (
      <Modal
        className={styles.memberModal}
        width={500}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title="添加跟进记录"
        maskClosable={false}
        visible={addFollowVisible}
        onOk={this.handleSubmit.bind(this)}
        onCancel={() => handleAddModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="撰写跟进">
          {form.getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入撰写跟进描述' }],
          })(
            <TextArea rows={4}/>,
          )}
        </FormItem>
      </Modal>
    );
  }
}

@connect(({ potential, loading }) => ({
  potential,
  loading: loading.models.potential,
}))
@Form.create()
class Potential extends PureComponent {

  state = {
    expandForm: false,
    modalVisible: false,
    addFollowVisible: false,
    recordModalVisible: false,
    rowItem: [],
    pageSize: 10,
    fieldsValue: [],
  };

  queryGuestList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'potential/fetch',
      payload: params,
      sort_column: 'created_at',
      sort_mode: 'desc',
    });
  }

  componentDidMount() {
    this.queryGuestList({
      page: 1,
      page_size: this.state.pageSize,
    });
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
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

    const signs = [
      {
        id: 'WECHAT',
        name: '已加微信',
      },
      {
        id: 'STORE',
        name: '已到店',
      },
      {
        id: 'GOOD',
        name: '有购买力',
      },
      {
        id: 'BAD',
        name: '无购买力',
      },
      {
        id: 'NO',
        name: '无意向',
      },
    ];

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
            <FormItem label="标签">
              {getFieldDecorator('tags')(
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
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="会籍">
              {getFieldDecorator('membership_name')(<Input placeholder="请输入维护会籍"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="来源">
              {getFieldDecorator('source')(<Input placeholder="请输入客户来源"/>)}
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
        this.queryGuestList({
          page: 1,
          page_size: this.state.pageSize,
          ...fieldsValue,
        });
      }
    });
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleTableChange(pagination, filters, sorter) {
    const { fieldsValue } = this.state;
    this.queryGuestList({
      page: pagination.current,
      page_size: pagination.pageSize,
      ...fieldsValue,
    });
  }

  //添加跟进记录
  addFollowRecord = fields => {
    const { dispatch } = this.props;
    const { rowItem } = this.state;
    dispatch({
      type: 'potential/addFollow',
      payload: Object.assign({ uuid: rowItem.uuid }, fields),
      callback:(res)=>{
        if(res.response){
          this.handleAddModalVisible(false)
          this.queryGuestList({
            page: 1,
            page_size: this.state.pageSize,
          })
        }
      }
    });
  };

  handleModalVisible = (flag, row) => {
    this.setState({
      modalVisible: !!flag,
      rowItem: row,
    });
  };

  handleAddModalVisible = (flag, row) => {
    this.setState({
      addFollowVisible: !!flag,
      rowItem: row,
    });
  };

  handleRecordModalVisible = (flag, row) => {
    this.setState({
      recordModalVisible: !!flag,
      rowItem: row,
    });
  };

  render() {
    const {
      potential: { response },
      loading,
    } = this.props;
    const {
      modalVisible,
      addFollowVisible,
      recordModalVisible,
      rowItem,
    } = this.state;

    const columns = [
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
        title: '客户来源',
        dataIndex: 'source',
        key: 'source',
      },
      {
        title: '维护会籍',
        dataIndex: 'membership_name',
        key: 'membership_name',
      },
      {
        title: '跟进标签',
        dataIndex: 'tags',
        key: 'tags',
        render: val => <span>{val}</span>,
      },
      {
        title: '跟进记录',
        dataIndex: 'track_record',
        key: 'track_record',
        render: (val,row) => <a href="javascript:;"
                          onClick={() => this.handleRecordModalVisible(true, row)}>{val ? val.data.length : 0}条跟进记录</a>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (val, row) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleModalVisible(true, row)}>编辑信息</a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={() => this.handleAddModalVisible(true, row)}>新增跟进</a>
            <Divider type="vertical"/>
            <a href="javascript:;">删除</a>
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

    const memberMethodsProps = {
      handleModalVisible: this.handleModalVisible.bind(this),
      handleAddModalVisible: this.handleAddModalVisible.bind(this),
      handleRecordModalVisible: this.handleRecordModalVisible.bind(this),
      addFollowVisible: addFollowVisible,
      addFollowRecord:this.addFollowRecord.bind(this),
      modalVisible: modalVisible,
      recordModalVisible: recordModalVisible,
      rowItem: rowItem,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, '')}>
              新建
            </Button>
            <div className={styles.tableList}>
              <Table
                rowKey='uuid'
                loading={loading}
                pagination={paginationProps}
                dataSource={response.guests}
                onChange={this.handleTableChange.bind(this)}
                columns={columns}/>
            </div>
          </div>
        </Card>

        <PotentialForm
          {...memberMethodsProps}
        />

        <AddFollowRecord
          {...memberMethodsProps}
        />

        <RecordModalForm
          {...memberMethodsProps}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Potential;
