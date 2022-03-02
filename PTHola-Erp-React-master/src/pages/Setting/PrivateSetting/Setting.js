import React, { PureComponent } from 'react';
import { Card, Button, Icon, List } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import AddPrivateForm from './AddPrivate'

import styles from './Setting.less'

class Setting extends PureComponent{
  state = {
    addPrivateVisible:false
  }

  handleAddModalVisible = flag => {
    this.setState({
      addPrivateVisible: !!flag,
    });
  };

  render(){

    const {addPrivateVisible} = this.state

    const list = [
      {
        uuid:'111',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title:'私教课类型',
        description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规"
      },
      {
        uuid:'333',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title:'常规私教课',
        description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规"
      },
      {
        uuid:'444',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title:'高级私教课',
        description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规,在中台产品的研发过程中，会出现不同的设计规范和实现方式"
      },
      {
        uuid:'555',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title:'高级私教课',
        description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规"
      }
    ]

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          好的课程设置，可以帮助场馆吸引更多用户，亦可帮助场馆增加老会员复购，提升销售业绩。<br/>
          请设置详细的课程种类，会员可以在微信主页中查看到场馆开设的不同课程，亦可在财务模块中针对不同的课程设置不同的销售、消课提成规则。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            查看优秀案例
          </a>
        </div>
      </div>
    );

    const memberMethodsProps = {
      handleAddModalVisible: this.handleAddModalVisible.bind(this),
      addPrivateVisible:addPrivateVisible
    };

    return(
      <div>
        <PageHeaderWrapper key='1' title="私教课程类别设置" content={content}>
          <div className={styles.cardList}>
            <List
              rowKey="uuid"
              grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
              dataSource={['',...list]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.uuid}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a>编辑</a>, <a>删除</a>]}
                      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                    >
                      <Card.Meta
                        title={<a>{item.title}</a>}
                        description={
                          <Ellipsis className={styles.item} lines={2}>
                            {item.description}
                          </Ellipsis>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button
                      onClick={this.handleAddModalVisible.bind(this,true)}
                      type="dashed"
                      className={styles.newButton}>
                      <Icon type="plus" /> 新增产品
                    </Button>
                  </List.Item>
                )
              }
            />
          </div>
        </PageHeaderWrapper>
        <AddPrivateForm
          {...memberMethodsProps}
        />
      </div>
    )
  }
}

export default Setting
