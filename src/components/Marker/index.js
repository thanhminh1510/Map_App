/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { Image } from 'react-native';
const Marker = ({ id, coordinate, x, y }) => {
    return (
        <MapLibreGL.MarkerView
            id={id}
            coordinate={coordinate}
            x={x}
            y={x}
        >
            <Image
                style={{ height: 50, width: 50 }}
                src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
            />
        </MapLibreGL.MarkerView>
    );
};

export default Marker;