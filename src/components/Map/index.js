/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { Image } from 'react-native';

import Marker from '../Marker/';
import PolygonLayer from '../Polygon';
import LineLayer from '../LineString';

MapLibreGL.setAccessToken(null);


const token = "c0faa23a3ec54da8f8ccd840c472032746264eeb6fa1a74b"
const styles = StyleSheet.create({
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

export default class Map extends Component {
    render() {
        return (
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                styleURL="https://demotiles.maplibre.org/style.json" >
                <Marker id={'id'} coordinate={[106.80298972384487, 10.870261764182892]} y={0} x={0}
                />
                <Marker id={'id'} coordinate={[106.80337596194988, 10.871125741616124]} y={0} x={0} />

                <MapLibreGL.Camera
                    zoomLevel={15}
                    maxZoomLevel={18}
                    animationMode={'flyTo'}
                    animationDuration={1100}
                    centerCoordinate={[106.80298972384487, 10.870261764182892]}
                />
                <MapLibreGL.RasterSource
                    maxZoomLevel={18}
                    id="raster-id"
                    tileUrlTemplates={[
                        `https://maps.vietmap.vn/tm/{z}/{x}/{y}@2x.png?apikey=${token}`,
                    ]}>
                    <MapLibreGL.RasterLayer
                        maxZoomLevel={18}
                        id="id-example"
                        sourceID="source-id-example"
                    />
                </MapLibreGL.RasterSource>
                <PolygonLayer coordinates={[
                    [106.80206704392388, 10.870440881661025],
                    [106.80231380715765, 10.869597974943082],
                    [106.80330086009269, 10.869313493388347],
                    [106.80379438656021, 10.869260811589184],
                    [106.80421281117398, 10.86981923818704],
                ]} />
                <LineLayer
                    coordinates={[
                        [[106.80298972384487, 10.870261764182892]]
                    ]}
                />

            </MapLibreGL.MapView>
        )
    }
}