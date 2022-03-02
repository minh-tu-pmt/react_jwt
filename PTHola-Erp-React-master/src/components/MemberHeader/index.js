import React from 'react';
import styles from './index.less';

const MemberHeader = ({avatar,name,age,phone}) =>{
  return(
    <div className={styles.avatarHolder}>
      <img src={avatar}/>
      <p className={styles.name}>{name} {age}</p>
      <p>{phone}</p>
    </div>
  )
}

export default MemberHeader;
