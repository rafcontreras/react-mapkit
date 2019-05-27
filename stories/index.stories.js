import React from 'react'

import { storiesOf } from '@storybook/react'
import {
  text,
  boolean,
  number,
  select,
  button,
} from '@storybook/addon-knobs/react'

import devToken from '../devToken'
import { MapKit, Marker } from '../src'

import './index.css'

const sanFranciscoLandmarks = [
  {
    latLong: {
      lat: 37.7951315,
      lon: -122.402986,
    },
    title: 'Transamerica Pyramid',
    phone: '+1-415-983-5420',
    url: 'https://www.transamericapyramidcenter.com/',
    area: 'San Francisco',
  },
  {
    latLong: {
      lat: 37.7954201,
      lon: -122.39352,
    },
    title: 'Ferry Building',
    phone: '+1 (415) 983-8030',
    url: 'https://www.ferrybuildingmarketplace.com',
    area: 'San Francisco',
  },
  {
    latLong: {
      lat: 37.8083396,
      lon: -122.415727,
    },
    title: "Fisherman's Wharf",
    phone: '+1 (415) 673-3530',
    url: 'https://visitfishermanswharf.com',
    area: 'San Francisco',
  },
]

const CALLOUT_OFFSET = new DOMPoint(-148, -78)

const calloutForLandmarkAnnotation = (annotation, landmark) => {
  const div = document.createElement('div')
  div.className = 'landmark'

  const title = div.appendChild(document.createElement('h1'))
  title.textContent = annotation.title

  const section = div.appendChild(document.createElement('section'))

  const phone = section.appendChild(document.createElement('p'))
  phone.className = 'phone'
  phone.textContent = landmark.phone

  const link = section.appendChild(document.createElement('p'))
  link.className = 'homepage'
  const a = link.appendChild(document.createElement('a'))
  a.href = landmark.url
  a.textContent = 'website'

  return div
}

storiesOf('MapKit', module)
  .add('Map Controls', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      mapType={select(
        'mapType',
        {
          standard: 'standard',
          satellite: 'satellite',
          hybrid: 'hybrid',
          mutedStandard: 'mutedStandard',
        },
        'standard',
      )}
      showsCompass={select(
        'showsCompass',
        { adaptive: 'adaptive', hidden: 'hidden', visible: 'visible' },
        'adaptive',
      )}
      showsMapTypeControl={boolean('showsMapTypeControl', true)}
      showsZoomControl={boolean('showsZoomControl', true)}
      showsUserLocationControl={boolean('showsUserLocationControl', false)}
      showsPointsOfInterest={boolean('showsPointsOfInterest', true)}
      showsScale={select(
        'showsScale',
        { adaptive: 'adaptive', hidden: 'hidden', visible: 'visible' },
        'hidden',
      )}
      colorScheme={select(
        'colorScheme',
        { light: 'light', dark: 'dark' },
        'light',
      )}
      tintColor={text('tintColor', '')}
      isRotationEnabled={boolean('isRotationEnabled', true)}
      isScrollEnabled={boolean('isScrollEnabled', true)}
      isZoomEnabled={boolean('isZoomEnabled', true)}
      showsUserLocation={boolean('showsUserLocation', false)}
      tracksUserLocation={boolean('tracksUserLocation', false)}
    />
  ))
  .add('Map Padding (single)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      padding={number('padding', 0)}
    />
  ))
  .add('Map Padding (individual)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      padding={{
        top: number('padding top', 0),
        right: number('padding right', 0),
        bottom: number('padding bottom', 0),
        left: number('padding left', 0),
      }}
    />
  ))
  .add('Default Center and Rotation', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultRotation={30}
      defaultCenter={[47.6063889, -122.3308333]}
    />
  ))
  .add('Set Rotation or Center', () => {
    return (
      <MapKit
        style={{ width: '100vw', height: '100vh' }}
        tokenOrCallback={devToken}
        animateRotationChange={boolean('animateRotationChange', true)}
      >
        {({ setRotation, setCenter }) => {
          setRotation(number('rotation', 0) || 0)
          setCenter([
            number('center latitude', 47.6063889) || 47.6063889,
            number('center longitude', -122.3308333) || -122.3308333,
          ])
        }}
      </MapKit>
    )
  })
  .add('View (Center and Span)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultCenter={[
        number('center latitude', 47.6063889),
        number('center longitude', -122.3308333),
      ]}
      defaultSpan={[
        number('span latitude delta', 1),
        number('span longitude delta', 1),
      ]}
      animateViewChange={boolean('animateViewChange', true)}
    />
  ))
  .add('View (MapRect)', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultMapRect={[
        number('x', 0.155),
        number('y', 0.345),
        number('width', 0.03),
        number('height', 0.04),
      ]}
      animateViewChange={boolean('animateViewChange', true)}
    />
  ))
  .add('Markers', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultCenter={[47.6063889, -122.3308333]}
      defaultSpan={[0.016, 0.016]}
    >
      <Marker
        latitude={number('marker latitune', 47.6063889)}
        longitude={number('marker longitude', -122.3308333)}
        title={text('title', 'marker title')}
        subtitle={text('subtitle', 'marker subtitle')}
        glyphText={text('glyphText', '')}
        color={text('color', '#ff5b40')}
        glyphColor={text('glyphColor', 'white')}
      />
    </MapKit>
  ))
  .add('Marker Callout', () => (
    <MapKit
      style={{ width: '100vw', height: '100vh' }}
      tokenOrCallback={devToken}
      defaultCenter={[37.7951315, -122.402986]}
      defaultSpan={[0.016, 0.016]}
      selectEvent={(event) => console.log(event)}
    >
      {sanFranciscoLandmarks.map((landmark) => {
        const {
          title,
          latLong: { lat, lon },
          area,
          url,
        } = landmark
        return (
          <Marker
            key={lat}
            glyphText={title.charAt(0)}
            latitude={lat}
            longitude={lon}
            title={title}
            clusteringIdentifier={area}
            callout={{
              calloutElementForAnnotation: (annotation) => {
                return calloutForLandmarkAnnotation(annotation, landmark)
              },
              calloutAnchorOffsetForAnnotation: (annotation, element) => {
                return CALLOUT_OFFSET
              },
              calloutAppearanceAnimationForAnnotation: (annotation) => {
                return 'scale-and-fadein .4s 0 1 normal cubic-bezier(0.4, 0, 0, 1.5)'
              },
            }}
          />
        )
      })}
    </MapKit>
  ))
