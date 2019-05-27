// @flow

import * as React from 'react'
import load from 'little-loader'

import ErrorBoundry from './ErrorBoundry'

import type MapKitType, {
  FeatureVisibility,
  MapType,
  Map,
  PaddingOptions,
  Coordinate,
  CoordinateSpan,
  MapConstructorOptions,
  CoordinateRegion,
} from 'mapkit'
declare var mapkit: MapKitType

type NumberTuple = [number, number]
type Rect = [number, number, number, number]
type PaddingType = number | PaddingOptions

type Props = {
  // ⚠️ This prop is used for setup and can't be changed once set.
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string,

  // Default View of the Map
  defaultCenter?: NumberTuple,
  defaultSpan?: NumberTuple,
  defaultMapRect?: Rect,
  defaultRotation?: number,

  // Interaction Properties
  isRotationEnabled: boolean,
  isScrollEnabled: boolean,
  isZoomEnabled: boolean,

  // Should programatic view / rotation changes be animated?
  animateViewChange: boolean,
  animateRotationChange: boolean,

  // Configuring the Map's Appearance
  mapType: MapType,
  padding: PaddingType,
  showsCompass: FeatureVisibility,
  showsMapTypeControl: boolean,
  showsZoomControl: boolean,
  showsUserLocationControl: boolean,
  showsPointsOfInterest: boolean,
  showsScale: FeatureVisibility,
  tintColor?: string,

  // Annotations
  // todo
  regionChangeStartEvent?: (event) => void,
  selectEvent?: (event) => void,

  // Overlays
  // todo

  // TileOverlays
  // todo

  // Displaying the User's Location
  showsUserLocation: boolean,
  tracksUserLocation: boolean,

  children:
    | React.Node
    | (({
        setRotation: (number) => void,
        setCenter: (NumberTuple) => void,
      }) => React.Node),
}

type State = {
  mapKitIsReady: boolean,
}

export const MapKitContext = React.createContext()

export default class MapKit extends React.Component<Props, State> {
  mapRef: { current: null | HTMLDivElement }
  map: Map

  static defaultProps = {
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
  }

  state = {
    mapKitIsReady: false,
  }

  constructor(props: Props) {
    super(props)

    this.mapRef = React.createRef()

    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      () => this.initMap(props),
      this,
    )
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      console.log('changed')
      this.updateMapProps(this.props)
    }
  }

  initMap = (props: Props) => {
    const {
      defaultCenter,
      defaultMapRect,
      defaultRotation,
      defaultSpan,
      tokenOrCallback,
      regionChangeStartEvent,
      selectEvent,
    } = props
    const isCallback = tokenOrCallback.includes('/')

    // init mapkit
    mapkit.init({
      authorizationCallback: (done) => {
        if (isCallback) {
          fetch(tokenOrCallback)
            .then((res) => res.text())
            .then(done)
        } else {
          done(tokenOrCallback)
        }
      },
    })

    // Create the 🗺️!
    if (this.mapRef.current) this.map = new mapkit.Map(this.mapRef.current)

    // Setup Default Map Options
    // in theory this should be possible to set via the above via:
    // https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions
    // but it is not working as expected.
    //
    // radar: https://bugreport.apple.com/web/?problemID=41190232

    if (defaultRotation) this.map.rotation = defaultRotation

    if (regionChangeStartEvent) {
      this.map.addEventListener('region-change-start', (event) => {
        regionChangeStartEvent(event)
      })
    }

    if (selectEvent) {
      this.map.addEventListener('select', (event) => {
        selectEvent(event)
      })
    }

    if (defaultMapRect) {
      try {
        this.map.visibleMapRect = this.createMapRect(
          defaultMapRect[0],
          defaultMapRect[1],
          defaultMapRect[2],
          defaultMapRect[3],
        )
      } catch (e) {
        console.warn(e.message)
      }
    } else {
      this.buildRegion(defaultCenter, defaultSpan)
    }

    // Set Other Props
    this.updateMapProps(props)

    this.setState({ mapKitIsReady: true })
  }

  buildRegion = (center, span) => {
    let mapCenter = this.createCoordinate(0, 0)
    let mapSpan

    if (center) {
      try {
        mapCenter = this.createCoordinate(center[0], center[1])
        // console.log("mapCenter", mapCenter)
      } catch (e) {
        console.warn(e.message)
      }

      if (span) {
        try {
          mapSpan = this.createCoordinateSpan(span[0], span[1])
          // console.log("mapSpan", mapSpan)
        } catch (e) {
          console.warn(e.message)
        }
      }

      if (mapSpan) {
        // if we have a span we'll set a region
        this.map.setRegionAnimated(
          this.createCoordinateRegion(mapCenter, mapSpan),
          this.props.animateViewChange,
        )
      } else {
        // otherwise we just set the center
        this.map.setCenterAnimated(mapCenter, this.props.animateViewChange)
      }
    }
  }

  updateMapProps = (props: Props) => {
    this.map.showsMapTypeControl = props.showsMapTypeControl
      ? props.showsMapTypeControl
      : true
    this.map.mapType = props.mapType ? props.mapType : 'Standard'
    this.map.padding = this.createPadding(props.padding)
    this.map.showsCompass = props.showsCompass ? props.showsCompass : true
    this.map.showsMapTypeControl = props.showsMapTypeControl
      ? props.showsMapTypeControl
      : true
    this.map.showsZoomControl = props.showsZoomControl
      ? props.showsZoomControl
      : true
    this.map.showsUserLocationControl = props.showsUserLocationControl
      ? props.showsUserLocation
      : false
    this.map.showsPointsOfInterest = props.showsPointsOfInterest
      ? props.showsPointsOfInterest
      : true
    this.map.showsScale = props.showsScale ? props.showsScale : false
    this.map.tintColor = props.tintColor ? props.tintColor : ''
    this.map.isRotationEnabled = props.isRotationEnabled
      ? props.isRotationEnabled
      : true
    this.map.isScrollEnabled = props.isScrollEnabled
      ? props.isScrollEnabled
      : true
    this.map.isZoomEnabled = props.isZoomEnabled ? props.isZoomEnabled : true
    this.map.showsUserLocation = props.showsUserLocation
      ? props.showsUserLocation
      : false
    this.map.tracksUserLocation = props.tracksUserLocation
      ? props.tracksUserLocation
      : false
    if (props.defaultCenter || props.defaultSpan) {
      this.buildRegion(props.defaultCenter, props.defaultSpan)
    }
  }

  createPadding = (padding: PaddingType) => {
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

  createCoordinate = (latitude: number, longitude: number) => {
    return new mapkit.Coordinate(latitude, longitude)
  }

  createCoordinateSpan = (latitudeDelta: number, longitudeDelta: number) => {
    return new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta)
  }

  createCoordinateRegion = (
    center: Coordinate,
    span: CoordinateSpan,
  ): CoordinateRegion => {
    return new mapkit.CoordinateRegion(center, span)
  }

  createMapPoint = (x: number, y: number) => {
    return new mapkit.MapPoint(x, y)
  }

  createMapRect = (x: number, y: number, width: number, height: number) => {
    return new mapkit.MapRect(x, y, width, height)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.state.mapKitIsReady) {
      return true
    }

    return false
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.destroy()
    }
  }

  setRotation = (rotation: number) => {
    this.map.setRotationAnimated(rotation, this.props.animateRotationChange)
  }

  setCenter = ([lat, lng]: NumberTuple) => {
    this.map.setCenterAnimated(
      this.createCoordinate(lat, lng),
      this.props.animateViewChange,
    )
  }

  // setRegion = ([lat, lng]: NumberTuple) => {
  //   this.map.setRegionAnimated(
  //     this.createCoordinate(lat, lng),
  //     this.props.animateViewChange,
  //   )
  // }

  render() {
    const {
      tokenOrCallback,

      mapType,
      padding,
      showsCompass,
      showsMapTypeControl,
      showsZoomControl,
      showsUserLocationControl,
      showsPointsOfInterest,
      showsScale,
      tintColor,

      defaultCenter,
      defaultSpan,
      defaultMapRect,
      defaultRotation,

      animateViewChange,
      animateRotationChange,

      isRotationEnabled,
      isScrollEnabled,
      isZoomEnabled,

      showsUserLocation,
      tracksUserLocation,

      children,
      regionChangeStartEvent,
      selectEvent,
      ...otherProps
    } = this.props

    return (
      <div ref={this.mapRef} {...otherProps}>
        <MapKitContext.Provider value={this.map}>
          {this.state.mapKitIsReady &&
            (typeof children === 'function'
              ? children({
                  setRotation: this.setRotation,
                  setCenter: this.setCenter,
                })
              : children)}
        </MapKitContext.Provider>
      </div>
    )
  }
}
