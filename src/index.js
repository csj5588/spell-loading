import React from 'react';

class Loading {
  constructor(props) {
    this.loadQueue = []; // core arr
    this.subscribers = []; // subscribers
  }

  show = key => {
    this.loadQueue.push(key);
  }

  hide = key => {
    const _loadKeys = [...this.loadQueue];
    if (_loadKeys.length === 0) return false;

    const _next = _loadKeys.filter(x => x !== key);

    this.loadQueue = _next;

    this.publish(key);
  }

  publish = (_key) => {
    const _subscribers = this.subscribers.map(subscriber => {
      const { key, reback, opObj } = subscriber;

      const hasKey = key.includes(_key);

      if (!hasKey) return subscriber;

      const _opObj = { ...opObj };
      _opObj[_key] = false;

      reback(_opObj);

      return { ...subscriber, opObj: _opObj };
    });

    // sync
    this.subscribers = _subscribers;
  }

  hoc = subscribers => WrappedComponent => {
    const _this = this;
    return class extends React.Component {
      state = {
        ladingProps: _this.mapArrToObj(subscribers),
      }

      componentDidMount() {
        this.subscribe()
      }

      subscribe = () => {
        _this._subscribe(subscribers, (subInfo) => {
          this.setState({ ladingProps: subInfo });
        });
      }

      render() {
        const { ladingProps } = this.state;
        return <WrappedComponent { ...this.props } { ...ladingProps } />;
      }
    }
  }

  mapArrToObj = (_arr) => {
    const _obj = {};
    _arr.forEach(k => {
      _obj[k] = true;
    });
    return _obj;
  }

  _subscribe = (keysArr, reback) => {
    if (!Array.isArray(keysArr)) return {};

    let opObj = {};
    keysArr.forEach(k => {
      opObj[k] = true;
    })

    let _obj = { key: keysArr.join(','), reback, opObj };

    this.subscribers.push(_obj)

    _obj = null;
  }
}

export default new Loading(30);
