import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Select, List, Tag, Icon, Row, Col, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Setting.less';

class Setting extends PureComponent {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'bracelet_list':
        router.push(`${match.url}/${key}`);
        break;
      case 'use_record':
        router.push(`${match.url}/${key}`);
        break;
      default:
        break;
    }
  };

  render() {
    const { match, children, location } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          如果场馆使用传统更衣柜+手环，可以通过此设置快速建立手环编号，便于管理
        </p>
      </div>
    );

    const tabList = [
      {
        key: 'bracelet_list',
        tab: '手环管理',
      },
      {
        key: 'use_record',
        tab: '使用记录',
      },
    ];

    return (
      <PageHeaderWrapper
        tabList={tabList}
        title="手环管理"
        content={content}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );

  }
}

export default Setting;
