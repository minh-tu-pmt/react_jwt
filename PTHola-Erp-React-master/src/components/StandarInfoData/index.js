import React from 'react';
import {Icon} from 'antd'

import styles from './index.less';

const StandarInfoData = ({title, number, subTitle1, subTitle2, bordered, up}) =>{
  return (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{number}</p>
      <span>
        {subTitle1}
      </span>
      <span style={{marginLeft:'10px'}}>
        {subTitle2}
        {
          up === 'true' ?
            <Icon type="arrow-up" style={{color:'#f5222d'}}/>
            :
            up === 'false' ?
            <Icon type="arrow-down" style={{color:'#52c41a'}}/>
            : ''
        }

      </span>
      {bordered && <em/>}
    </div>
  )
}

export default StandarInfoData;
