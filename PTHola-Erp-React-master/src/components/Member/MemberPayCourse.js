import React, {PureComponent} from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Modal,
  DatePicker,
  Icon,
  Button
} from 'antd';
import styles from './style.less'
import StandardFormRow from '@/components/StandardFormRow';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()

class MemberPayCourse extends PureComponent{

  state = {
    key:'day'
  }

  handleChange(e){
    this.props.form.resetFields();
    this.setState({
      key:e.target.value
    })
  }

  renderContent(){
    return(
      <Row>
        <div className={styles.baseInfo}>
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

        <div className={styles.datePeriod}>
          <Col xs={24} sm={8} md={8} lg={8}>
            <p className={styles.title}>剩余课程：</p>
          </Col>
          <Col xs={24} sm={16} md={16} lg={16}>
            <div className={styles.dateBox}>
              <div className={styles.dateInfo}>
                <span className={styles.date}>5节</span>
                <span className={styles.txt}>当前剩余课程</span>
              </div>
              <span className={styles.divider}></span>
              <div className={styles.dateInfo}>
                <span className={styles.date}>剩余23节</span>
                <span className={styles.txt}>充值后剩余课程</span>
              </div>
            </div>
          </Col>
        </div>

        {this.renderForm()}
      </Row>
    );
  }

  renderForm(){
    const {form} = this.props
    form.getFieldDecorator('keys', { initialValue: [0] });
    const keys = form.getFieldValue('keys');

    const formItems = keys.map((k,index)=>{
      return(
        <div className={styles.attribution} key={index}>
          <div className={styles.attr}>
            <FormItem>
              {form.getFieldDecorator(`attribution[${k}]`, {
                rules: [{ required: true, whitespace: true, message: '请选择业绩归属' }]
              })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: '100%'}}
                  placeholder="请选择业绩归属"
                >
                  <Option key="1" value="1">
                    王尼玛
                  </Option>
                  <Option key="2" value="2">
                    尼玛王
                  </Option>
                </Select>
              )}
            </FormItem>
          </div>
          <div className={styles.per}>
            <FormItem>
              {form.getFieldDecorator(`percent[${k}]`, {
                rules: [{ required: true, whitespace: true, message: '请填写所占份额' }]
              })(<Input addonAfter="%" />)}
            </FormItem>
          </div>
          {keys.length > 1 ? (
            <Icon
              style={{fontSize:'20px', marginTop:'6px'}}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.handleRemove(k)}
            />
          ) : null}
        </div>
      );
    })

    return [
      <StandardFormRow title="课程种类" labelCol={5} wrapperCol={19} key="6">
        <FormItem key="type">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择课程种类' }]
          })(
            <Select
              showSearch
              optionFilterProp="children"
              style={{ width: '100%'}}
              placeholder="请选择课程种类"
            >
              <Option key="1" value="1">
                腿部训练
              </Option>
              <Option key="2" value="2">
                腰部训练
              </Option>
            </Select>
          )}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow title="课程数量" labelCol={5} wrapperCol={19} key="7">
        <FormItem key="count">
          {form.getFieldDecorator('count', {
            rules: [{ required: true, message: '请输入课程数量' }]
          })(<Input placeholder="请输入课程数量"/>)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow style={{borderBottom:'1px solid #e8e8e8', paddingBottom:'24px'}} title="到期时间" labelCol={5} wrapperCol={19} key="1">
        <FormItem key="startDate">
          {form.getFieldDecorator('startDate', {
            rules: [{ required: true, message: '请选择开始时间' }]
          })(<DatePicker
            format="YYYY-MM-DD"
            style={{width:'100%'}}
            placeholder="请选择开始时间"/>
          )}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow title="收款金额" labelCol={5} wrapperCol={19} key="3">
        <div className={styles.moneyInfo}>
          <FormItem key="money">
            {form.getFieldDecorator('money', {
              rules: [{ required: true, message: '请输入收款金额' }]
            })(<Input placeholder="请输入收款金额" addonAfter="¥"/>)}
          </FormItem>
          <p className={styles.price}>课程单价：¥190</p>
        </div>
        <p className={styles.msg}>
          如果有定金，请填写包含定金的总金额
        </p>
      </StandardFormRow>,
      <StandardFormRow title="业绩归属" labelCol={5} wrapperCol={19} key="8">
        {formItems}
        <Button type="dashed" onClick={()=>this.handleAdd()} style={{ width: '100%'}}>
          <Icon type="plus" /> 添加
        </Button>
        <p className={styles.msg}>
          留空则业绩归属公司
        </p>
      </StandardFormRow>,
      <StandardFormRow title="合同编号" labelCol={5} wrapperCol={19} key="4">
        <FormItem key="contract">
          {form.getFieldDecorator('contract', {
          })(<Input placeholder="请输入合同编号" />)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow title="备注" labelCol={5} wrapperCol={19} key="5">
        <FormItem key="remarks">
          {form.getFieldDecorator('remarks',{
          })(<TextArea rows={4} placeholder="请输入备注" />)}
        </FormItem>
      </StandardFormRow>
    ];
  }

  handleAdd(){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleRemove(k){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  handlePrint(){
    console.log(1111)
  }

  handleSubmit(e){
    const _this = this
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if(!err){

        Modal.confirm({
          title:'温馨提示',
          content:'是否打印私教合同?',
          okText:'立即打印',
          cancelText:'暂不打印',
          onOk(){
            _this.handlePrint()
          }
        })
      }
    });
  }

  render(){
    const { payModelVisible, handlePayModalVisible } = this.props;

    return(
      <Modal
        className={styles.memberModal}
        width={480}
        destroyOnClose
        title="新增课程数量"
        visible={payModelVisible}
        onCancel={() => handlePayModalVisible()}
        onOk={this.handleSubmit.bind(this)}
      >

        {this.renderContent()}

      </Modal>
    )
  }
}

export default MemberPayCourse;
