import React, {PureComponent} from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Modal,
  DatePicker
} from 'antd';
import styles from './style.less'
import StandardFormRow from '@/components/StandardFormRow';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


@Form.create()

class MemberLeave extends PureComponent{

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
            <p className={styles.title}>到期时间：</p>
          </Col>
          <Col xs={24} sm={16} md={16} lg={16}>
            <div className={styles.dateBox}>
              <div className={styles.dateInfo}>
                <span className={styles.date}>2018-10-09</span>
                <span className={styles.txt}>当前到期时间</span>
              </div>
              <span className={styles.divider}></span>
              <div className={styles.dateInfo}>
                <span className={styles.date}>2018-11-09</span>
                <span className={styles.txt}>充值后到期时间</span>
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

    return [
      <StandardFormRow title="开始时间" labelCol={5} wrapperCol={19} key="1">
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
      <StandardFormRow style={{borderBottom:'1px solid #e8e8e8', paddingBottom:'24px'}} title="结束时间" labelCol={5} wrapperCol={19} key="2">
        <FormItem key="endDate">
          {form.getFieldDecorator('endDate', {
            rules: [{ required: true, message: '请选择结束时间' }]
          })(<DatePicker
            format="YYYY-MM-DD"
            style={{width:'100%'}}
            placeholder="请选择结束时间"/>
          )}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow title="收款金额" labelCol={5} wrapperCol={19} key="3">
        <FormItem key="money">
          {form.getFieldDecorator('money', {
            rules: [{ required: true, message: '请输入收款金额' }]
          })(<Input placeholder="请输入收款金额" addonAfter="¥"/>)}
        </FormItem>
        <p className={styles.msg}>
          如果有定金，请填写包含定金的总金额
        </p>
      </StandardFormRow>,
      <StandardFormRow title="业绩归属" labelCol={5} wrapperCol={19} key="4">
        <FormItem key="attribution">
          {form.getFieldDecorator('attribution', {
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
        <p className={styles.msg}>
          留空则业绩归属公司
        </p>
      </StandardFormRow>,
      <StandardFormRow title="备注" labelCol={5} wrapperCol={19} key="5">
        <FormItem key="remarks">
          {form.getFieldDecorator('remarks',{
          })(<TextArea rows={4} placeholder="请输入备注" />)}
        </FormItem>
      </StandardFormRow>
    ];
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
        console.log(fieldsValue)
      }
    });
  }

  render(){
    const { leaveModelVisible, handleLeaveModalVisible } = this.props;

    return(
      <Modal
        className={styles.memberModal}
        width={480}
        destroyOnClose
        title="会员请假"
        visible={leaveModelVisible}
        onCancel={() => handleLeaveModalVisible()}
        onOk={this.handleSubmit.bind(this)}
      >

        {this.renderContent()}

      </Modal>
    )
  }
}

export default MemberLeave;
