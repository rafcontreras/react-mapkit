'use strict'

exports.__esModule = true
exports.MapKitContext = undefined

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

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _littleLoader = require('little-loader')

var _littleLoader2 = _interopRequireDefault(_littleLoader)

var _ErrorBoundry = require('./ErrorBoundry')

var _ErrorBoundry2 = _interopRequireDefault(_ErrorBoundry)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

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

var MapKitContext = (exports.MapKitContext = _react2.default.createContext())

var MapKit = ((_temp = _class = (function(_Component) {
  _inherits(MapKit, _Component)

  function MapKit(props) {
    _classCallCheck(this, MapKit)

    var _this = _possibleConstructorReturn(this, _Component.call(this, props))

    _initialiseProps.call(_this)

    _this.mapRef = _react2.default.createRef()

    ;(0, _littleLoader2.default)(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      function() {
        return _this.initMap(props)
      },
      _this,
    )
    return _this
  }

  MapKit.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.map) {
      this.map.destroy()
    }
  }

  MapKit.prototype.shouldComponentUpdate = function shouldComponentUpdate(
    nextProps,
    nextState,
  ) {
    // for a lot of prop changes we're just making calls to mapKit so we have no need to re-render
    // let ComponentShouldUpdate = false
    //
    // // might be needed when we start adding markers, but for now not a thing we do
    // if (this.state.mapKitIsReady != nextState.mapKitIsReady) {
    //   ComponentShouldUpdate = true
    // }

    if (this.state.mapKitIsReady) {
      this.updateMapProps(nextProps)
    }

    return true
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
      ])

    return _react2.default.createElement(
      'div',
      _extends({ ref: this.mapRef }, otherProps),
      _react2.default.createElement(
        MapKitContext.Provider,
        { value: this.map },
        this.state.mapKitIsReady &&
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
})(_react.Component)),
(_class.defaultProps = {
  mapType: 'standard',
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
  var _this2 = this

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
      selectEvent = props.selectEvent

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
    if (_this2.mapRef.current)
      _this2.map = new mapkit.Map(_this2.mapRef.current)

    // Setup Default Map Options
    // in theory this should be possible to set via the above via:
    // https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions
    // but it is not working as expected.
    //
    // radar: https://bugreport.apple.com/web/?problemID=41190232

    if (defaultRotation) _this2.map.rotation = defaultRotation

    if (regionChangeStartEvent) {
      _this2.map.addEventListener('region-change-start', function(event) {
        regionChangeStartEvent(event)
      })
    }

    if (selectEvent) {
      _this2.map.addEventListener('select', function(event) {
        selectEvent(event)
      })
    }

    if (defaultMapRect) {
      try {
        _this2.map.visibleMapRect = _this2.createMapRect(
          defaultMapRect[0],
          defaultMapRect[1],
          defaultMapRect[2],
          defaultMapRect[3],
        )
      } catch (e) {
        console.warn(e.message)
      }
    } else {
      _this2.buildRegion(defaultCenter, defaultSpan)
    }

    // Set Other Props
    _this2.updateMapProps(props)

    _this2.setState({ mapKitIsReady: true })
  }

  this.buildRegion = function(center, span) {
    var mapCenter = _this2.createCoordinate(0, 0)
    var mapSpan = void 0

    if (center) {
      try {
        mapCenter = _this2.createCoordinate(center[0], center[1])
        // console.log("mapCenter", mapCenter)
      } catch (e) {
        console.warn(e.message)
      }

      if (span) {
        try {
          mapSpan = _this2.createCoordinateSpan(span[0], span[1])
          // console.log("mapSpan", mapSpan)
        } catch (e) {
          console.warn(e.message)
        }
      }

      if (mapSpan) {
        // if we have a span we'll set a region
        _this2.map.setRegionAnimated(
          _this2.createCoordinateRegion(mapCenter, mapSpan),
          _this2.props.animateViewChange,
        )
      } else {
        // otherwise we just set the center
        _this2.map.setCenterAnimated(mapCenter, _this2.props.animateViewChange)
      }
    }
  }

  this.updateMapProps = function(props) {
    _this2.map.showsMapTypeControl = props.showsMapTypeControl
    _this2.map.mapType = props.mapType
    _this2.map.padding = _this2.createPadding(props.padding)
    _this2.map.showsCompass = props.showsCompass
    _this2.map.showsMapTypeControl = props.showsMapTypeControl
    _this2.map.showsZoomControl = props.showsZoomControl
    _this2.map.showsUserLocationControl = props.showsUserLocationControl
    _this2.map.showsPointsOfInterest = props.showsPointsOfInterest
    _this2.map.showsScale = props.showsScale
    _this2.map.tintColor = props.tintColor
    _this2.map.isRotationEnabled = props.isRotationEnabled
    _this2.map.isScrollEnabled = props.isScrollEnabled
    _this2.map.isZoomEnabled = props.isZoomEnabled
    _this2.map.showsUserLocation = props.showsUserLocation
    _this2.map.tracksUserLocation = props.tracksUserLocation
    if (props.defaultCenter || props.defaultSpan) {
      _this2.buildRegion(props.defaultCenter, props.defaultSpan)
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
    _this2.map.setRotationAnimated(rotation, _this2.props.animateRotationChange)
  }

  this.setCenter = function(_ref) {
    var lat = _ref[0],
      lng = _ref[1]

    _this2.map.setCenterAnimated(
      _this2.createCoordinate(lat, lng),
      _this2.props.animateViewChange,
    )
  }

  this.setRegion = function(center, span) {
    _this2.map.setRegionAnimated(
      _this2.createCoordinateRegion(center, span),
      _this2.props.animateViewChange,
    )
  }
}),
_temp)
exports.default = MapKit
