import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const StandardFormRow = ({ title, labelCol, wrapperCol, children, last, block, grid, required, ...rest }) => {
  const cls = classNames(styles.standardFormRow, {
    [styles.standardFormRowBlock]: block,
    [styles.standardFormRowLast]: last,
    [styles.standardFormRowGrid]: grid,
  });

  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={`ant-col-${labelCol} ant-form-item-label`}>
          <label className={required ? 'ant-form-item-required' : ''}>{title}</label>
        </div>
      )}
      <div className={`ant-col-${wrapperCol} ant-form-item-control-wrapper ${styles.content}`}>{children}</div>
    </div>
  );
};

export default StandardFormRow;
