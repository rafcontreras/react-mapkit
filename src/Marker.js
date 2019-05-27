// @flow

import React, { Component } from 'react'
import type MapKitType, {
  MarkerAnnotationConstructorOptions,
  Map,
  Annotation,
  FeatureVisibility,
} from 'mapkit'

// mapkit was loaded within `MapKit.js`
declare var mapkit: MapKitType

import { MapKitContext } from './index'

type Props = {
  ...$Exact<MarkerAnnotationConstructorOptions>,
  map: Map,
  latitude: number,
  longitude: number,
}

class Marker extends Component<Props> {
  marker: Annotation

  getMarkerConstructionProps = (props: Props) => {
    const { map, latitude, longitude, ...otherProps } = props

    return otherProps
  }

  constructor(props: Props) {
    super(props)

    const markerProps = this.getMarkerConstructionProps(props)

    this.marker = new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(props.latitude, props.longitude),
      markerProps,
    )

    this.props.map.addAnnotation(this.marker)
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      this.props.latitude !== nextProps.latitude ||
      this.props.longitude !== nextProps.longitude
    ) {
      this.marker.coordinate = new mapkit.Coordinate(
        nextProps.latitude,
        nextProps.longitude,
      )
    }

    const markerProps = this.getMarkerConstructionProps(nextProps)

    Object.keys(markerProps).forEach((key) => {
      this.marker[key] = markerProps[key]
    })

    return false
  }

  render() {
    return null
  }
}

export default (props: Props) => (
  <MapKitContext.Consumer>
    {(map) => <Marker {...props} map={map} />}
  </MapKitContext.Consumer>
)
