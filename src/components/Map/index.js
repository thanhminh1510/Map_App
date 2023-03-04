/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { View, TextInput, StyleSheet } from 'react-native';

import SearchInput from '../Search';


import Marker from '../Marker/';
import PolygonLayer from '../Polygon';
import LineLayer from '../LineString';




import vietmap_api from '../../config/env';



MapLibreGL.setAccessToken(null);
const vietmapapi = vietmap_api.Token;

// console.log(vietmapapi);
const styles = StyleSheet.create({
    container: {
        position: 'relative', width: '100%', height: '100%',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
        zIndex: 1,
    },
});



export default class Map extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SearchInput />


                <MapLibreGL.MapView
                    style={styles.map}
                    logoEnabled={false}
                    styleURL="https://demotiles.maplibre.org/style.json" >
                    <Marker id={'id'} coordinate={[106.80298972384487, 10.870261764182892]}
                    />
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
                            `https://maps.vietmap.vn/tm/{z}/{x}/{y}@2x.png?apikey=${vietmapapi}`,
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
            </View>
        )
    }
}