import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Icon } from 'antd';
import Dynamic from './../../src/index'
import utils from './../../src/utils';
import styles from './index.less';

const cx = utils.classnames('demo', styles);

console.log(Dynamic)

class Demo extends React.Component {
  timeout = (ms) => {
    return new Promise(resolve => setTimeout(() => {
      resolve(console.log('done'))
    }, ms));
  }

  willAdd = async (key) => {
    await this.timeout(500)
  }

  willCancel = async (key) => {
    await this.timeout(500);
  }
  
  render() {
    return (
      <div className={cx('root')}>
        <Dynamic
          defaultNum={1}
          className="dynamic"
          willCancel={this.willCancel}
          willAdd={this.willAdd}
        >
          {(key) => {
            return (
              <p className="block">这是第{key}张卡片内容</p>
            )
          }}
        </Dynamic>
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
