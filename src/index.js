/**
 * DynamicCard Component
 * 
 * @param[Number] defaultInitial // 默认展示卡片数量
 * @param[String | Object] className // 卡片样式覆盖
 * @param[ReactNode] cancelIcon // 删除按钮覆盖
 * @param[Sting | Object] addButtonClassName // 新增按钮样式覆盖
 * @param[Function] willAdd(key: Number) // 新增之前触发，支持异步
 * @param[Function] willCancel(key: Number) // 删除之前触发，支持异步
 */

import React from 'react';
import { Button, Card, Modal, Icon } from 'antd';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import common from './utils';
import 'antd/dist/antd.less'

import styles from './index.less';

const cx = common.classnames('DynamicCard', styles);
const { confirm } = Modal;

class DynamicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      count: 0,
      defaultInitial: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.defaultInitial && props.defaultNum) {
      return {
        ...state,
        order: Array.from({ length: props.defaultNum }, ((_, i) => i)),
        count: props.defaultNum,
        defaultInitial: true,
      }
    }
    return state;
  }

  handleAdd = async () => { // 来个异步
    const { count } = this.state;
    const { willAdd } = this.props;
    const nextCount = count + 1;
    
    await willAdd(nextCount);
    const copy = [...this.state.order];
    copy.push(nextCount);
    this.setState({ order: copy, count: nextCount });
  }

  handleDel = (key) => {

    const deleteByKey = async () => {
      const { willCancel } = this.props;
      await willCancel(key);

      const copy = [...this.state.order];
      const nextOrder = copy.filter(x => x !== key);

      this.setState({ order: nextOrder });
    }

    confirm({
      title: '确认删除？',
      onOk: deleteByKey,
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        console.log('cancel');
      },
    });
  }

  renderCancelIcon = () => {
    const { cancelIcon } = this.props;
    return cancelIcon ? cancelIcon : (
      <Icon
        type="minus-circle"
      />
    )
  }

  render() {
    const { order } = this.state;
    const { children, className, addButtonClassName } = this.props;
    return (
      <div className={cx('root')}>
        <Button
          loading={false}
          className={`add-button ${addButtonClassName}`}
          onClick={this.handleAdd}
        >
          Add
        </Button>
        {
          order.map((key) => {
            return (
              <Card
                key={`dynamicKey${key}`}
                className={`card ${className}`}
              >
                <div className="cancelBox" onClick={() => this.handleDel(key)}>
                  {this.renderCancelIcon()}
                </div>
                {children(key)}
              </Card>
            )
          })
        }
      </div>
    );
  }
}

DynamicCard.propTypes = {
  defaultInitial: PropTypes.number,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  cancelIcon: PropTypes.any,
  addButtonClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  willAdd: PropTypes.func,
  willCancel: PropTypes.func,
}

DynamicCard.defaultProps = {
  defaultInitial: 0,
  className: "",
  cancelIcon: undefined,
  addButtonClassName: "",
  willAdd: () => {},
  willCancel: () => {},
}

export default DynamicCard;
