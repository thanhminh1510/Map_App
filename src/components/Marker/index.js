/* eslint-disable prettier/prettier */
import React from 'react';
// import { View } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { Image, View } from 'react-native';
const Marker = ({ id, coordinate, x, y, address }) => {
    return (
        <MapLibreGL.MarkerView
            key={id}
            coordinate={coordinate}
            x={x}
            y={y}
            anchor={{ x: 0, y: 0.5 }}
        >
            <View style={{ position: 'relative' }}  >
                <MapLibreGL.Callout title={`${address}`}
                    style={{ color: 'black', position: 'absolute', top: 0, left: -10, width: 300 }}
                />
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../../accest/img/map-marker-icon.png')}
                />
            </View>
        </MapLibreGL.MarkerView>
    )
};

export default Marker;