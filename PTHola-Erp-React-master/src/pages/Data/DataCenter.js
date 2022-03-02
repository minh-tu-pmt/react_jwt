import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  DatePicker,
  Tooltip,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;

import styles from './DataCenter.less';

class DataCenter extends Component {
  constructor(props) {
    super(props);
    this.rankingListData = []
    for (let i = 0; i < 5; i += 1) {
      this.rankingListData.push({
        title: `工专路 ${i} 号店`,
        src:'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        total: 323234,
      });
    }
  }

  componentDidMount() {

  }

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {

    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }

    const salesPieData = [
      {
        title: '私教销售',
        value: 15200,
      },
      {
        title: '会籍销售',
        value: 10000,
      },
      {
        title: '其他销售',
        value: 10000,
      },
    ];

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日消课数量"
              total={numeral(30).format('0,0')}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    私教课确认收入：6580元
                  </span>
                </div>
              }
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日到场人数"
              total={numeral(8846).format('0,0')}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    当前在场：100
                  </span>
                  <span style={{ marginLeft: 12 }}>
                    已离场：150
                  </span>
                </div>
              }
            >
              <MiniArea color="#975FE4" data={visitData}/>
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日新增会员"
              total={numeral(3).format('0,0') + '位'}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    本月新增：26位
                  </span>
                  <span style={{ marginLeft: 12 }}>
                    上月新增：38位
                  </span>
                </div>
              }
            >
              <MiniBar
                height={46}
                color="#11c9c9"
                data={visitData}
              />
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日销售额"
              total={numeral(24800).format('0,0')}
              contentHeight={77}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
            >

            <ul className={styles.salesLis}>
              {salesPieData.map((item,index)=>(
                <li key={index}>
                  <span className={styles.salesDot + ' ' + styles.salesDot+index}></span>
                  <span className={styles.legendTitle}>{item.title}</span>
                  <span className={styles.divider}></span>
                  <span className={styles.percent}>42.31%</span>
                  <span className={styles.salesValue}>{item.value}</span>
                </li>
              ))}
            </ul>

            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 24 }} tabBarGutter={10}>
                <TabPane tab="总销售额" key="1">
                  <div className={styles.barPad}>
                    <Bar
                      style={{marginRight:24}}
                      height={346}
                      title="总销售额"
                      data={salesData}
                    />
                  </div>

                </TabPane>
                <TabPane tab="会籍销售额" key="2">
                  会籍销售额
                </TabPane>
                <TabPane tab="私教销售额" key="3">
                  私教销售额
                </TabPane>
                <TabPane tab="其他销售额" key="4">
                  其他销售额
                </TabPane>
                <TabPane tab="新增课程" key="5">
                  新增课程
                </TabPane>
                <TabPane tab="消课数量" key="6">
                  消课数量
                </TabPane>
                <TabPane tab="活跃会员" key="7">
                  活跃会员
                </TabPane>
                <TabPane tab="新增会员" key="8">
                  新增会员
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="当月私教业绩排行"
              extra={<MonthPicker onChange={this.onChange} placeholder="请选择月份" />}
              style={{ marginTop: 24 }}
            >
              <ul className={styles.rankingList}>
                {this.rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.active : ''
                        }`}
                    >
                      {i + 1}
                    </span>
                    <div className={styles.coachImg}>
                      <img src={item.src}/>
                    </div>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{'¥' + numeral(item.total).format('0,0')}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="当月会籍业绩排行"
              extra={<MonthPicker onChange={this.onChange} placeholder="请选择月份" />}
              style={{ marginTop: 24 }}
            >
              <ul className={styles.rankingList}>
                {this.rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.active : ''
                        }`}
                    >
                      {i + 1}
                    </span>
                    <div className={styles.coachImg}>
                      <img src={item.src}/>
                    </div>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{'¥' + numeral(item.total).format('0,0')}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="当月消课教练排行"
              extra={<MonthPicker onChange={this.onChange} placeholder="请选择月份" />}
              style={{ marginTop: 24 }}
            >
              <ul className={styles.rankingList}>
                {this.rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.active : ''
                        }`}
                    >
                      {i + 1}
                    </span>
                    <div className={styles.coachImg}>
                      <img src={item.src}/>
                    </div>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{numeral(item.total).format('0,0') + '节'}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="当月消课会员排行"
              extra={<MonthPicker onChange={this.onChange} placeholder="请选择月份" />}
              style={{ marginTop: 24 }}
            >
              <ul className={styles.rankingList}>
                {this.rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.active : ''
                        }`}
                    >
                      {i + 1}
                    </span>
                    <div className={styles.coachImg}>
                      <img src={item.src}/>
                    </div>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{numeral(item.total).format('0,0') + '节'}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default DataCenter;
