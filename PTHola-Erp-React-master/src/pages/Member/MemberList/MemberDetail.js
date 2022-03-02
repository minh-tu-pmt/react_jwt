import React, { PureComponent } from 'react';
import router from 'umi/router'
import {
  Row,
  Col,
  Card,
  Divider,
  Button
} from 'antd';

import styles from './MemberDetail.less'
import MemberShipForm from '@/components/Member/MemberShipForm'
import MemberLeave from '@/components/Member/MemberLeave'
import MemberPayCourse from '@/components/Member/MemberPayCourse'
import MemberEliminate from '@/components/Member/MemberEliminate'
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class MemberDetail extends PureComponent{

  state = {
    shipModelVisible:false, //会籍续费
    leaveModelVisible:false,  //请假
    payModelVisible:false,  //买私教课
    eliminateModelVisible:false, //私教消课
  }


  onTabChange = key => {
    const {match} = this.props
    router.push(`${match.url}/${key}`);
  }

  handleShipModalVisible = flag =>{
    this.setState({
      shipModelVisible: !!flag,
    })
  }

  handleLeaveModalVisible = flag =>{
    this.setState({
      leaveModelVisible: !!flag,
    })
  }

  handlePayModalVisible = flag =>{
    this.setState({
      payModelVisible: !!flag,
    })
  }

  handleEiminateModalVisible = flag =>{
    this.setState({
      eliminateModelVisible: !!flag
    })
  }

  render(){
    const {
      match,
      location,
      children
    } = this.props

    const {
      shipModelVisible,
      leaveModelVisible,
      payModelVisible,
      eliminateModelVisible
    } = this.state;

    const memberMethods = {
      handleShipModalVisible:this.handleShipModalVisible,
      handlePayModalVisible:this.handlePayModalVisible,
      handleLeaveModalVisible:this.handleLeaveModalVisible,
      handleEiminateModalVisible:this.handleEiminateModalVisible
    };


    const operationTabList = [
      {
        key: 'sign',
        tab: '签到记录',
      },
      {
        key: 'elimination',
        tab: '消课记录',
      },
      {
        key: 'private',
        tab: '私教课购课记录',
      },
      {
        key: 'recharge',
        tab: '会籍充值记录',
      },
      {
        key: 'leave',
        tab: '会籍请假记录',
      },
      {
        key: 'consume',
        tab: '消费记录',
      }
    ];

    return(
      <GridContent className={styles.detailCenter}>
        <Row gutter={24}>
          <Col className={styles.userInfo} lg={7} md={24}>
            <Card bordered={false}>
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  <div className={styles.name}>王尼玛 28</div>
                  <div>18939393993</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <i className={styles.title} />
                    手机：18030331883
                  </p>
                  <p>
                    <i className={styles.title} />
                    微信：cxcmy199292
                  </p>
                  <p>
                    <i className={styles.title} />
                    邮箱：2343432@qq.com
                  </p>
                  <p>
                    <i className={styles.title} />
                    身份证号：333747474747474738382
                  </p>
                  <p>
                    <i className={styles.title} />
                    所在单位：成都匹体科技
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.item}>
                  <div className={styles.itemTitle}>会籍到期时间</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.date}>2018-12-20</p>
                    <p className={styles.msg}>
                      维护会籍：王尼玛
                    </p>
                    <p className={styles.msg}>
                      上次签到时间：3天前（2018-12-17）
                    </p>
                    <div className={styles.btns}>
                      <Button onClick={this.handleShipModalVisible.bind(this,true)}>续费</Button>
                      <Button onClick={this.handleLeaveModalVisible.bind(this,true)}>请假</Button>
                      <Button>退款</Button>
                    </div>
                  </div>
                </div>
                <Divider dashed />
                <div className={styles.item}>
                  <div className={styles.itemTitle}>私教课程数量</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.date}>36节</p>
                    <p className={styles.msg}>
                      维护教练：王尼玛、尼玛玩、李四
                    </p>
                    <p className={styles.msg}>
                      上次消课时间：3天前（2018-12-17）
                    </p>
                    <div className={styles.btns}>
                      <Button onClick={this.handlePayModalVisible.bind(this,true)}>买课</Button>
                      <Button onClick={this.handleEiminateModalVisible.bind(this,true)}>消课</Button>
                      <Button>退款</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
            >
              {children}
            </Card>
          </Col>
        </Row>

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
      </GridContent>
    )
  }
}

export default MemberDetail;
