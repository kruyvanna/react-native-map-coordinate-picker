import React, { useEffect } from 'react';

import { Animated } from 'react-native';
import marker from './marker_icon.png';
import styled from 'styled-components/native';

const Container = styled.View`
  left: 50%;
  margin-left: -24px;
  margin-top: -40px;
  top: 50%;
  align-items: center;
  position: absolute;
`;

const Shadow = styled(Animated.View)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 10px;
  margin-top: -5px;
  bottom: 0px;
  background: #444;
  opacity: 0.5;
`;

const MarkerBox = styled(Animated.View)``;

const MarkerImage = styled.Image`
  width: 48px;
  height: 48px;
`;

interface FakeMarkerProps {
  dragging: boolean;
}

export const FakeMarker = (props: FakeMarkerProps) => {
  const { dragging } = props;
  const animatedValue = new Animated.Value(0.01);

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: dragging ? -1 : 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [dragging]);

  return (
    <Container {...props}>
      <Shadow
        style={{
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [-1, 1],
                outputRange: [0.7, 1.5],
              }),
            },
          ],
        }}
      ></Shadow>
      <MarkerBox
        style={{
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [-1, 1],
                outputRange: [-10, 0],
              }),
            },
          ],
        }}
      >
        <MarkerImage source={marker}></MarkerImage>
      </MarkerBox>
    </Container>
  );
};
