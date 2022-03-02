import React, { PureComponent, Fragment } from 'react';
import {
  Form,
  Card,
  Select,
  List,
  Tag,
  Icon,
  Row,
  Col,
  Button,
  Pagination
} from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Setting.less';

const FormItem = Form.Item;

@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
  },
})
class BraceletList extends PureComponent {

  onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  render() {
    const {
      form: { getFieldDecorator },
      loading,
    } = this.props;

    const list = [];
    for(var i=0; i<15; i++){
      list.push(i)
    }

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ marginBottom: 15 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="1">男</TagSelect.Option>
                    <TagSelect.Option value="2">女</TagSelect.Option>
                    <TagSelect.Option value="3">其他</TagSelect.Option>
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新增手环
          </Button>
        </Card>

        <div
          className={styles.cardList}
          style={{ marginTop: 24 }}>
          <Row gutter={12}>
            {
              list.map((item,index)=>{
                return(
                  <Col xl={3} lg={4} md={6} sm={8} xs={12} key={index}>
                    <div className={styles.item}>
                      <p className={styles.num}>001</p>
                      <p className={styles.type}>男更</p>
                      <p className={styles.status}>已刷卡</p>
                    </div>
                  </Col>
                )
              })
            }
          </Row>
          <div className={styles.page}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={500}
              onChange={this.onChange.bind(this)} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BraceletList;
