var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _class, _temp, _initialiseProps

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
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

import React, { Component } from 'react'

// mapkit was loaded within `MapKit.js`

import { MapKitContext } from './index'

var Marker = ((_temp = _class = (function(_Component) {
  _inherits(Marker, _Component)

  function Marker(props) {
    _classCallCheck(this, Marker)

    var _this = _possibleConstructorReturn(this, _Component.call(this, props))

    _initialiseProps.call(_this)

    var markerProps = _this.getMarkerConstructionProps(props)

    _this.marker = new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(props.latitude, props.longitude),
      markerProps,
    )

    _this.props.map.addAnnotation(_this.marker)
    return _this
  }

  Marker.prototype.shouldComponentUpdate = function shouldComponentUpdate(
    nextProps,
  ) {
    var _this2 = this

    if (
      this.props.latitude !== nextProps.latitude ||
      this.props.longitude !== nextProps.longitude
    ) {
      this.marker.coordinate = new mapkit.Coordinate(
        nextProps.latitude,
        nextProps.longitude,
      )
    }

    var markerProps = this.getMarkerConstructionProps(nextProps)

    Object.keys(markerProps).forEach(function(key) {
      _this2.marker[key] = markerProps[key]
    })

    return false
  }

  Marker.prototype.render = function render() {
    return null
  }

  return Marker
})(Component)),
(_initialiseProps = function _initialiseProps() {
  this.getMarkerConstructionProps = function(props) {
    var map = props.map,
      latitude = props.latitude,
      longitude = props.longitude,
      otherProps = _objectWithoutProperties(props, [
        'map',
        'latitude',
        'longitude',
      ])

    return otherProps
  }
}),
_temp)

export default (function(props) {
  return React.createElement(MapKitContext.Consumer, null, function(map) {
    return React.createElement(Marker, _extends({}, props, { map: map }))
  })
})
