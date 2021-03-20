import MapView, { LatLng, Region } from 'react-native-maps';
import React, { useState } from 'react';

// @ts-ignore
import { FakeMarker } from 'react-native-map-coordinate-picker';
// @ts-ignore
import styled from 'styled-components/native';

const markerIcon = require('./custom_marker.png');

const Container = styled.View`
  flex: 1;
  background: green;
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
        initialRegion={{
          latitude: 10.6343527660001,
          longitude: 103.503359524,
          latitudeDelta: 0.0209922,
          longitudeDelta: 0.0121001,
        }}
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
