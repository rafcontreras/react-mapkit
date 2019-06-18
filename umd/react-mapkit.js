/*!
 * react-mapkit v0.5.0 - https://github.com/chrisdrackett/react-mapkit
 * MIT Licensed
 */
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('react'))
  else if (typeof define === 'function' && define.amd)
    define(['react'], factory)
  else if (typeof exports === 'object')
    exports['ReactMapkit'] = factory(require('react'))
  else root['ReactMapkit'] = factory(root['React'])
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter,
          /******/
        })
        /******/
      }
      /******/
    } // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ Object.defineProperty(exports, '__esModule', { value: true })
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default']
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 3))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__0__

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __webpack_require__) {
        /**
         * Script loading is difficult thanks to IE. We need callbacks to fire
         * immediately following the script's execution, with no other scripts
         * running in between. If other scripts on the page are able to run
         * between our script and its callback, bad things can happen, such as
         * `jQuery.noConflict` not being called in time, resulting in plugins
         * latching onto our version of jQuery, etc.
         *
         * For IE<10 we use a relatively well-documented "preloading" strategy,
         * which ensures that the script is ready to execute *before* appending
         * it to the DOM. That way when it is finally appended, it is
         * executed immediately.
         *
         * References:
         * - http://www.html5rocks.com/en/tutorials/speed/script-loading/
         * - http://blog.getify.com/ie11-please-bring-real-script-preloading-back/
         * - https://github.com/jrburke/requirejs/issues/526
         * - https://connect.microsoft.com/IE/feedback/details/729164/
         *           ie10-dynamic-script-element-fires-loaded-readystate-prematurely
         */
        ;(function() {
          // Global state.
          var pendingScripts = {}
          var scriptCounter = 0

          /**
           * Insert script into the DOM
           *
           * @param {Object} script Script DOM object
           * @returns {void}
           */
          var _addScript = function(script) {
            // Get the first script element, we're just going to use it
            // as a reference for where to insert ours. Do NOT try to do
            // this just once at the top and then re-use the same script
            // as a reference later. Some weird loaders *remove* script
            // elements after the browser has executed their contents,
            // so the same reference might not have a parentNode later.
            var firstScript = document.getElementsByTagName('script')[0]

            // Append the script to the DOM, triggering execution.
            firstScript.parentNode.insertBefore(script, firstScript)
          }

          /**
           * Load Script.
           *
           * @param {String}            src       URI of script
           * @param {Function|Object}   callback  (Optional) Called on script load completion,
           *                                      or options object
           * @param {Object}            context   (Optional) Callback context (`this`)
           * @returns {void}
           */
          var _lload = function(src, callback, context) {
            /*eslint max-statements: [2, 32]*/
            var setup

            if (callback && typeof callback !== 'function') {
              context = callback.context || context
              setup = callback.setup
              callback = callback.callback
            }

            var script = document.createElement('script')
            var done = false
            var err
            var _cleanup // _must_ be set below.

            /**
             * Final handler for error or completion.
             *
             * **Note**: Will only be called _once_.
             *
             * @returns {void}
             */
            var _finish = function() {
              // Only call once.
              if (done) {
                return
              }
              done = true

              // Internal cleanup.
              _cleanup()

              // Callback.
              if (callback) {
                callback.call(context, err)
              }
            }

            /**
             * Error handler
             *
             * @returns {void}
             */
            var _error = function() {
              err = new Error(src || 'EMPTY')
              _finish()
            }

            if (script.readyState && !('async' in script)) {
              /*eslint-disable consistent-return*/

              // This section is only for IE<10. Some other old browsers may
              // satisfy the above condition and enter this branch, but we don't
              // support those browsers anyway.

              var id = scriptCounter++
              var isReady = { loaded: true, complete: true }
              var inserted = false

              // Clear out listeners, state.
              _cleanup = function() {
                script.onreadystatechange = script.onerror = null
                pendingScripts[id] = void 0
              }

              // Attach the handler before setting src, otherwise we might
              // miss events (consider that IE could fire them synchronously
              // upon setting src, for example).
              script.onreadystatechange = function() {
                var firstState = script.readyState

                // Protect against any errors from state change randomness.
                if (err) {
                  return
                }

                if (!inserted && isReady[firstState]) {
                  inserted = true

                  // Append to DOM.
                  _addScript(script)
                }

                // --------------------------------------------------------------------
                //                       GLORIOUS IE8 HACKAGE!!!
                // --------------------------------------------------------------------
                //
                // Oh IE8, how you disappoint. IE8 won't call `script.onerror`, so
                // we have to resort to drastic measures.
                // See, e.g. http://www.quirksmode.org/dom/events/error.html#t02
                //
                // As with all things development, there's a Stack Overflow comment that
                // asserts the following combinations of state changes in IE8 indicate a
                // script load error. And crazily, it seems to work!
                //
                // http://stackoverflow.com/a/18840568/741892
                //
                // The `script.readyState` transitions we're interested are:
                //
                // * If state starts as `loaded`
                // * Call `script.children`, which _should_ change state to `complete`
                // * If state is now `loading`, then **we have a load error**
                //
                // For the reader's amusement, here is HeadJS's catalog of various
                // `readyState` transitions in normal operation for IE:
                // https://github.com/headjs/headjs/blob/master/src/2.0.0/load.js#L379-L419
                if (firstState === 'loaded') {
                  // The act of accessing the property should change the script's
                  // `readyState`.
                  //
                  // And, oh yeah, this hack is so hacky-ish we need the following
                  // eslint disable...
                  /*eslint-disable no-unused-expressions*/
                  script.children
                  /*eslint-enable no-unused-expressions*/

                  if (script.readyState === 'loading') {
                    // State transitions indicate we've hit the load error.
                    //
                    // **Note**: We are not intending to _return_ a value, just have
                    // a shorter short-circuit code path here.
                    return _error()
                  }
                }

                // It's possible for readyState to be "complete" immediately
                // after we insert (and execute) the script in the branch
                // above. So check readyState again here and react without
                // waiting for another onreadystatechange.
                if (script.readyState === 'complete') {
                  _finish()
                }
              }

              // Onerror handler _may_ work here.
              script.onerror = _error

              // Since we're not appending the script to the DOM yet, the
              // reference to our script element might get garbage collected
              // when this function ends, without onreadystatechange ever being
              // fired. This has been witnessed to happen. Adding it to
              // `pendingScripts` ensures this can't happen.
              pendingScripts[id] = script

              // call the setup callback to mutate the script tag
              if (setup) {
                setup.call(context, script)
              }

              // This triggers a request for the script, but its contents won't
              // be executed until we append it to the DOM.
              script.src = src

              // In some cases, the readyState is already "loaded" immediately
              // after setting src. It's a lie! Don't append to the DOM until
              // the onreadystatechange event says so.
            } else {
              // This section is for modern browsers, including IE10+.

              // Clear out listeners.
              _cleanup = function() {
                script.onload = script.onerror = null
              }

              script.onerror = _error
              script.onload = _finish
              script.async = true
              script.charset = 'utf-8'

              // call the setup callback to mutate the script tag
              if (setup) {
                setup.call(context, script)
              }

              script.src = src

              // Append to DOM.
              _addScript(script)
            }
          }

          // UMD wrapper.
          /*global define:false*/
          if (true) {
            // CommonJS
            module.exports = _lload
          } else {
          }
        })()

        /***/
      },
      /* 2 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)

        // EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
        var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(
          0,
        )
        var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/ __webpack_require__.n(
          external_root_React_commonjs2_react_commonjs_react_amd_react_,
        )

        // EXTERNAL MODULE: ./node_modules/little-loader/lib/little-loader.js
        var little_loader = __webpack_require__(1)
        var little_loader_default = /*#__PURE__*/ __webpack_require__.n(
          little_loader,
        )

        // CONCATENATED MODULE: ./src/ErrorBoundry.js
        function ErrorBoundry_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function ErrorBoundry_possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            )
          }
          return call &&
            (typeof call === 'object' || typeof call === 'function')
            ? call
            : self
        }

        function ErrorBoundry_inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof superClass,
            )
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            },
          )
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass)
        }

        var ErrorBoundry_ErrorBoundary = (function(_React$Component) {
          ErrorBoundry_inherits(ErrorBoundary, _React$Component)

          function ErrorBoundary() {
            var _temp, _this, _ret

            ErrorBoundry_classCallCheck(this, ErrorBoundary)

            for (
              var _len = arguments.length, args = Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            return (
              (_ret = ((_temp = ((_this = ErrorBoundry_possibleConstructorReturn(
                this,
                _React$Component.call.apply(
                  _React$Component,
                  [this].concat(args),
                ),
              )),
              _this)),
              (_this.state = { hasError: false }),
              _temp)),
              ErrorBoundry_possibleConstructorReturn(_this, _ret)
            )
          }

          ErrorBoundary.prototype.componentDidCatch = function componentDidCatch() {
            this.setState({ hasError: true })
          }

          ErrorBoundary.prototype.render = function render() {
            if (this.state.hasError) {
              return external_root_React_commonjs2_react_commonjs_react_amd_react_[
                'createElement'
              ]('h1', null, this.props.errorText)
            }
            return this.props.children
          }

          return ErrorBoundary
        })(
          external_root_React_commonjs2_react_commonjs_react_amd_react_[
            'Component'
          ],
        )

        // CONCATENATED MODULE: ./src/MapKit.js
        var MapKit_extends =
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

        var MapKit_class, MapKit_temp, MapKit_initialiseProps

        function MapKit_objectWithoutProperties(obj, keys) {
          var target = {}
          for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
            target[i] = obj[i]
          }
          return target
        }

        function MapKit_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function MapKit_possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            )
          }
          return call &&
            (typeof call === 'object' || typeof call === 'function')
            ? call
            : self
        }

        function MapKit_inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof superClass,
            )
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            },
          )
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass)
        }

        var MapKit_MapKitContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createContext()

        var MapKit_MapKit = ((MapKit_temp = MapKit_class = (function(
          _Component,
        ) {
          MapKit_inherits(MapKit, _Component)

          function MapKit(props) {
            MapKit_classCallCheck(this, MapKit)

            var _this = MapKit_possibleConstructorReturn(
              this,
              _Component.call(this, props),
            )

            MapKit_initialiseProps.call(_this)

            _this.mapRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createRef()
            return _this
          }

          MapKit.prototype.componentDidMount = function componentDidMount() {
            var _this2 = this

            little_loader_default()(
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
              otherProps = MapKit_objectWithoutProperties(_props, [
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

            return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(
              'div',
              MapKit_extends({ ref: this.mapRef }, otherProps),
              external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(
                MapKit_MapKitContext.Provider,
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
        })(
          external_root_React_commonjs2_react_commonjs_react_amd_react_[
            'Component'
          ],
        )),
        (MapKit_class.defaultProps = {
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
        (MapKit_initialiseProps = function _initialiseProps() {
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
              _this3.map.addEventListener('region-change-start', function(
                event,
              ) {
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
                _this3.map.setCenterAnimated(
                  mapCenter,
                  _this3.props.animateViewChange,
                )
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
            _this3.map.setRotationAnimated(
              rotation,
              _this3.props.animateRotationChange,
            )
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
        MapKit_temp)

        /* harmony default export */ var src_MapKit = MapKit_MapKit
        // CONCATENATED MODULE: ./src/Marker.js
        var Marker_extends =
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

        var Marker_class, Marker_temp, Marker_initialiseProps

        function Marker_objectWithoutProperties(obj, keys) {
          var target = {}
          for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
            target[i] = obj[i]
          }
          return target
        }

        function Marker_classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function Marker_possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            )
          }
          return call &&
            (typeof call === 'object' || typeof call === 'function')
            ? call
            : self
        }

        function Marker_inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof superClass,
            )
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            },
          )
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass)
        }

        // mapkit was loaded within `MapKit.js`

        var Marker_Marker = ((Marker_temp = Marker_class = (function(
          _Component,
        ) {
          Marker_inherits(Marker, _Component)

          function Marker(props) {
            Marker_classCallCheck(this, Marker)

            var _this = Marker_possibleConstructorReturn(
              this,
              _Component.call(this, props),
            )

            Marker_initialiseProps.call(_this)

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
        })(
          external_root_React_commonjs2_react_commonjs_react_amd_react_[
            'Component'
          ],
        )),
        (Marker_initialiseProps = function _initialiseProps() {
          this.getMarkerConstructionProps = function(props) {
            var map = props.map,
              latitude = props.latitude,
              longitude = props.longitude,
              otherProps = Marker_objectWithoutProperties(props, [
                'map',
                'latitude',
                'longitude',
              ])

            return otherProps
          }
        }),
        Marker_temp)

        /* harmony default export */ var src_Marker = function(props) {
          return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(
            MapKit_MapKitContext.Consumer,
            null,
            function(map) {
              return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(
                Marker_Marker,
                Marker_extends({}, props, { map: map }),
              )
            },
          )
        }
        // CONCATENATED MODULE: ./src/index.js
        /* concated harmony reexport */ __webpack_require__.d(
          __webpack_exports__,
          'MapKit',
          function() {
            return src_MapKit
          },
        )
        /* concated harmony reexport */ __webpack_require__.d(
          __webpack_exports__,
          'MapKitContext',
          function() {
            return MapKit_MapKitContext
          },
        )
        /* concated harmony reexport */ __webpack_require__.d(
          __webpack_exports__,
          'Marker',
          function() {
            return src_Marker
          },
        )

        /***/
      },
      /* 3 */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(2)

        /***/
      },
      /******/
    ],
  )['default']
})
