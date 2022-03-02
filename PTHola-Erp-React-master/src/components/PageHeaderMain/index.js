import React from 'react';
import styles from './index.less'

const PageHeaderMain = ({title,children}) =>{
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  )
}

export default PageHeaderMain
