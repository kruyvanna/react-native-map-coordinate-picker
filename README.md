# react-native-coordinate-picker

An animated marker component used for map coordinate picking

## Installation

```sh
yarn add react-native-map-coordinate-picker styled-components
```

## Usage

Quick example

```js
import { FakeMarker } from 'react-native-map-coordinate-picker';

// ...
const [isDragging, setIsDragging] = useState(false);

// ...
<FakeMarker dragging={isDragging}></FakeMarker>;
```

Use with react-native-maps

```js
import MapView, { LatLng, Region } from 'react-native-maps';
import React, { useState } from 'react';
import { FakeMarker } from 'react-native-map-coordinate-picker';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const StyledMapView = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const InfoBox = styled.View`
  position: absolute;
  left: 50%;
  top: 50px;
  width: 300px;
  margin-left: -150px;
  padding: 20px;
  border-radius: 15px;
  align-items: center;
  background: white;
`;

const Text = styled.Text``;

export default function App() {
  const [dragging, setDragging] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<LatLng>();

  function handleRegionChange(region: Region) {
    setDragging(false);
    const { latitude, longitude } = region;
    setPickedLocation({
      latitude,
      longitude,
    });
  }

  function handleOnPanDrag() {
    setDragging(true);
  }

  return (
    <Container>
      <StyledMapView
        onRegionChangeComplete={handleRegionChange}
        onPanDrag={handleOnPanDrag}
      ></StyledMapView>
      <FakeMarker dragging={dragging} icon={markerIcon}></FakeMarker>
      <InfoBox>
        <Text>Picked coordinate</Text>
        {pickedLocation && (
          <Text>
            {pickedLocation.latitude},{pickedLocation.longitude}
          </Text>
        )}
      </InfoBox>
    </Container>
  );
}

```

## Props

dragging: string (required) // when true, the marker is pushed up with animation

icon: ImageSourcePropType (optional) // custom marker icon

## Example project

Checkout [example](https://github.com/kruyvanna/react-native-map-coordinate-picker/tree/master/example) folder

How to run

- iOS

```sh
yarn example ios
```

- Android

```sh
yarn example android
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
