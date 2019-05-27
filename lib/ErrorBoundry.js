'use strict'

exports.__esModule = true
exports.default = undefined

var _react = require('react')

var React = _interopRequireWildcard(_react)

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var ErrorBoundary = (function(_React$Component) {
  _inherits(ErrorBoundary, _React$Component)

  function ErrorBoundary() {
    var _temp, _this, _ret

    _classCallCheck(this, ErrorBoundary)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args)),
      )),
      _this)),
      (_this.state = { hasError: false }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  ErrorBoundary.prototype.componentDidCatch = function componentDidCatch() {
    this.setState({ hasError: true })
  }

  ErrorBoundary.prototype.render = function render() {
    if (this.state.hasError) {
      return React.createElement('h1', null, this.props.errorText)
    }
    return this.props.children
  }

  return ErrorBoundary
})(React.Component)

exports.default = ErrorBoundary
module.exports = exports['default']
