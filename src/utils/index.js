import _map from 'lodash/map';
import classnames from 'classnames';

const $common = {
  /**
   * less防污染命名
   * @param {String} prefix  - Unique Key
   * @param {styles} styles  - sass style
   */
  classnames: (prefix, styles) => {
    const cx = classnames.bind(styles);
    return (...names) =>
      cx(
        _map(names, name => {
          if (typeof name === 'string') {
            return `${prefix}-${name}`;
          } else if (typeof name === 'object') {
            const returnObj = {};
            for (const key in name) {
              if (Object.prototype.hasOwnProperty.call(name, key)) {
                const element = name[key];
                returnObj[`${prefix}-${key}`] = element;
              }
            }
            return returnObj;
          }
          return '';
        })
      );
  },
}

export default $common;
