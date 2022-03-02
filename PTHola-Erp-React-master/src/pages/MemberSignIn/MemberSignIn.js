import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Select,
  Button,
  Spin
} from 'antd';
import styles from './MemberSignIn.less';
import AddMemberForm from './AddMemberForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const Option = Select.Option;

@connect()
class MemberSignIn extends PureComponent {

  state = {
    data: [],
    value: [],
    fetching: false,
    addModalVisible: false,  //会员签到
  };

  componentDidMount() {

  }

  fetchUser = (value) => {
    console.log('fetch' + value);
  };

  handleChange = (value) => {
    console.log('change' + value);
  };

  handleTabChange = key => {
    const { match } = this.props;
    router.push(`${match.url}/${key}`);
  };

  handleAddModalVisible = flag => {
    this.setState({
      addModalVisible: !!flag,
    });
  };

  render() {
    const {
      fetching,
      data,
      value,
      addModalVisible,
    } = this.state;


    const memberMethods = {
      handleAddModalVisible: this.handleAddModalVisible,
    };

    const tabList = [
      {
        key: 'today',
        tab: '今日签到',
      },
      {
        key: 'record',
        tab: '签到记录',
      },
    ];

    const mainSearch = (
      <div className={styles.searchBox}>
        <div className={styles.searchContent}>
          <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="请输入搜索内容"
            notFoundContent={fetching ? <Spin size="small"/> : null}
            filterOption={false}
            size={'large'}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '350px' }}
          >
            {data.map(d => <Option key={d.value}>{d.text}</Option>)}
          </Select>
          <Button type="primary" className={styles.signBtn} size={'large'}
                  onClick={() => this.handleAddModalVisible(true)}>签到</Button>
          <Button size={'large'} style={{ marginLeft: '10px' }}>访客签到</Button>
        </div>
        <div className={styles.descTxt}>
          <p>请[刷卡] 或输入姓名 [姓名] [手机号] [卡号]签到，或扫描手环归还签退</p>
          <p>[人脸] [指纹] 签到需配合SmartSign设备自动完成会员签到</p>
        </div>
      </div>
    );

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="会员签到"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange.bind(this)}
        className={styles.signBox}>

        {children}

        <AddMemberForm
          {...memberMethods}
          addModalVisible={addModalVisible}
        />

      </PageHeaderWrapper>
    );
  }
}

export default MemberSignIn;
