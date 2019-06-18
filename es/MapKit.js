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
import load from 'little-loader'

import ErrorBoundry from './ErrorBoundry'

export var MapKitContext = React.createContext()

var MapKit = ((_temp = _class = (function(_Component) {
  _inherits(MapKit, _Component)

  function MapKit(props) {
    _classCallCheck(this, MapKit)

    var _this = _possibleConstructorReturn(this, _Component.call(this, props))

    _initialiseProps.call(_this)

    _this.mapRef = React.createRef()
    return _this
  }

  MapKit.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this

    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      function() {
        return _this2.initMap(_this2.props)
      },
      this,
    )
  }

  MapKit.prototype.shouldComponentUpdate = function shouldComponentUpdate(
    nextProps,
  ) {
    var mapKitIsReady = this.state.mapKitIsReady

    if (mapKitIsReady) {
      this.updateMapProps(nextProps)
    }

    return true
  }

  MapKit.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.map) {
      this.map.destroy()
    }
  }

  MapKit.prototype.render = function render() {
    var _props = this.props,
      tokenOrCallback = _props.tokenOrCallback,
      mapType = _props.mapType,
      padding = _props.padding,
      showsCompass = _props.showsCompass,
      showsMapTypeControl = _props.showsMapTypeControl,
      showsZoomControl = _props.showsZoomControl,
      showsUserLocationControl = _props.showsUserLocationControl,
      showsPointsOfInterest = _props.showsPointsOfInterest,
      showsScale = _props.showsScale,
      tintColor = _props.tintColor,
      colorScheme = _props.colorScheme,
      defaultCenter = _props.defaultCenter,
      defaultSpan = _props.defaultSpan,
      defaultMapRect = _props.defaultMapRect,
      defaultRotation = _props.defaultRotation,
      animateViewChange = _props.animateViewChange,
      animateRotationChange = _props.animateRotationChange,
      isRotationEnabled = _props.isRotationEnabled,
      isScrollEnabled = _props.isScrollEnabled,
      isZoomEnabled = _props.isZoomEnabled,
      showsUserLocation = _props.showsUserLocation,
      tracksUserLocation = _props.tracksUserLocation,
      children = _props.children,
      regionChangeStartEvent = _props.regionChangeStartEvent,
      selectEvent = _props.selectEvent,
      mapState = _props.mapState,
      otherProps = _objectWithoutProperties(_props, [
        'tokenOrCallback',
        'mapType',
        'padding',
        'showsCompass',
        'showsMapTypeControl',
        'showsZoomControl',
        'showsUserLocationControl',
        'showsPointsOfInterest',
        'showsScale',
        'tintColor',
        'colorScheme',
        'defaultCenter',
        'defaultSpan',
        'defaultMapRect',
        'defaultRotation',
        'animateViewChange',
        'animateRotationChange',
        'isRotationEnabled',
        'isScrollEnabled',
        'isZoomEnabled',
        'showsUserLocation',
        'tracksUserLocation',
        'children',
        'regionChangeStartEvent',
        'selectEvent',
        'mapState',
      ])

    var mapKitIsReady = this.state.mapKitIsReady

    return React.createElement(
      'div',
      _extends({ ref: this.mapRef }, otherProps),
      React.createElement(
        MapKitContext.Provider,
        { value: this.map },
        mapKitIsReady &&
          (typeof children === 'function'
            ? children({
                setRotation: this.setRotation,
                setCenter: this.setCenter,
              })
            : children),
      ),
    )
  }

  return MapKit
})(Component)),
(_class.defaultProps = {
  mapType: 'standard',
  colorScheme: 'light',
  padding: 0,
  showsCompass: 'adaptive',
  showsMapTypeControl: true,
  showsZoomControl: true,
  showsUserLocationControl: false,
  showsPointsOfInterest: true,
  showsScale: 'hidden',
  animateViewChange: true,
  isRotationEnabled: true,
  isScrollEnabled: true,
  isZoomEnabled: true,

  showsUserLocation: false,
  tracksUserLocation: false,

  animateRotationChange: true,
}),
(_initialiseProps = function _initialiseProps() {
  var _this3 = this

  this.state = {
    mapKitIsReady: false,
  }

  this.initMap = function(props) {
    var defaultCenter = props.defaultCenter,
      defaultMapRect = props.defaultMapRect,
      defaultRotation = props.defaultRotation,
      defaultSpan = props.defaultSpan,
      tokenOrCallback = props.tokenOrCallback,
      regionChangeStartEvent = props.regionChangeStartEvent,
      selectEvent = props.selectEvent,
      mapState = props.mapState

    var isCallback = tokenOrCallback.includes('/')

    // init mapkit
    mapkit.init({
      authorizationCallback: function authorizationCallback(done) {
        if (isCallback) {
          fetch(tokenOrCallback)
            .then(function(res) {
              return res.text()
            })
            .then(done)
        } else {
          done(tokenOrCallback)
        }
      },
    })

    // Create the 🗺️!
    if (_this3.mapRef.current)
      _this3.map = new mapkit.Map(_this3.mapRef.current)

    // Setup Default Map Options
    // in theory this should be possible to set via the above via:
    // https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions
    // but it is not working as expected.
    //
    // radar: https://bugreport.apple.com/web/?problemID=41190232

    if (defaultRotation) _this3.map.rotation = defaultRotation

    if (regionChangeStartEvent) {
      _this3.map.addEventListener('region-change-start', function(event) {
        regionChangeStartEvent(event)
      })
    }

    if (selectEvent) {
      _this3.map.addEventListener('select', function(event) {
        selectEvent(event)
      })
    }

    if (defaultMapRect) {
      try {
        _this3.map.visibleMapRect = _this3.createMapRect(
          defaultMapRect[0],
          defaultMapRect[1],
          defaultMapRect[2],
          defaultMapRect[3],
        )
      } catch (e) {
        console.warn(e.message)
      }
    } else {
      _this3.buildRegion(defaultCenter, defaultSpan)
    }

    // Set Other Props
    _this3.updateMapProps(props)
    _this3.setState({ mapKitIsReady: true })

    if (mapState) {
      mapState(_this3.map)
    }
  }

  this.buildRegion = function(center, span) {
    var mapCenter = _this3.createCoordinate(0, 0)
    var mapSpan = void 0

    if (center) {
      try {
        mapCenter = _this3.createCoordinate(center[0], center[1])
      } catch (e) {
        console.warn(e.message)
      }

      if (span) {
        try {
          mapSpan = _this3.createCoordinateSpan(span[0], span[1])
        } catch (e) {
          console.warn(e.message)
        }
      }

      if (mapSpan) {
        // if we have a span we'll set a region
        _this3.map.setRegionAnimated(
          _this3.createCoordinateRegion(mapCenter, mapSpan),
          _this3.props.animateViewChange,
        )
      } else {
        // otherwise we just set the center
        _this3.map.setCenterAnimated(mapCenter, _this3.props.animateViewChange)
      }
    }
  }

  this.updateMapProps = function(props) {
    _this3.map.showsMapTypeControl = props.showsMapTypeControl
    _this3.map.mapType = props.mapType
    _this3.map.padding = _this3.createPadding(props.padding)
    _this3.map.showsCompass = props.showsCompass
    _this3.map.showsMapTypeControl = props.showsMapTypeControl
    _this3.map.showsZoomControl = props.showsZoomControl
    _this3.map.showsUserLocationControl = props.showsUserLocationControl
    _this3.map.showsPointsOfInterest = props.showsPointsOfInterest
    _this3.map.showsScale = props.showsScale
    _this3.map.tintColor = props.tintColor
    _this3.map.colorScheme = props.colorScheme
    _this3.map.isRotationEnabled = props.isRotationEnabled
    _this3.map.isScrollEnabled = props.isScrollEnabled
    _this3.map.isZoomEnabled = props.isZoomEnabled
    _this3.map.showsUserLocation = props.showsUserLocation
    _this3.map.tracksUserLocation = props.tracksUserLocation
    if (props.defaultCenter || props.defaultSpan) {
      _this3.buildRegion(props.defaultCenter, props.defaultSpan)
    }
    if (props.mapState) {
      props.mapState(_this3.map)
    }
  }

  this.createPadding = function(padding) {
    return new mapkit.Padding(
      typeof padding === 'number'
        ? {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding,
          }
        : padding,
    )
  }

  this.createCoordinate = function(latitude, longitude) {
    return new mapkit.Coordinate(latitude, longitude)
  }

  this.createCoordinateSpan = function(latitudeDelta, longitudeDelta) {
    return new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta)
  }

  this.createCoordinateRegion = function(center, span) {
    return new mapkit.CoordinateRegion(center, span)
  }

  this.createMapPoint = function(x, y) {
    return new mapkit.MapPoint(x, y)
  }

  this.createMapRect = function(x, y, width, height) {
    return new mapkit.MapRect(x, y, width, height)
  }

  this.setRotation = function(rotation) {
    _this3.map.setRotationAnimated(rotation, _this3.props.animateRotationChange)
  }

  this.setCenter = function(_ref) {
    var lat = _ref[0],
      lng = _ref[1]

    _this3.map.setCenterAnimated(
      _this3.createCoordinate(lat, lng),
      _this3.props.animateViewChange,
    )
  }

  this.setRegion = function(center, span) {
    _this3.map.setRegionAnimated(
      _this3.createCoordinateRegion(center, span),
      _this3.props.animateViewChange,
    )
  }
}),
_temp)

export default MapKit
