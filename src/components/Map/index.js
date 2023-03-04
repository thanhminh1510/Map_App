/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { View, TextInput, StyleSheet } from 'react-native';

import SearchInput from '../Search';


import Marker from '../Marker/';
import PolygonLayer from '../Polygon';
import LineLayer from '../LineString';

// Initialize the module (needs to be done only once)
import axios from 'axios';

import vietmap_api from '../../config/env';
import { set } from 'react-native-reanimated';



MapLibreGL.setAccessToken(null);

const vietmapapi = vietmap_api.Token;


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


function Map() {
    let newaddressdata = [];
    const [viewport, setViewport] = useState({
        latitude: 10.870261764182892,
        longtitude: 106.80298972384487,
        zoom: 16,
    })
    const [AddressMarker, setAddressMarker] = useState([]);


    // Custom data
    const addressData = [
        { id: 1, address: 'Thành Phố Hồ Chí Minh' },
    ];



    useEffect(() => {
        addressData.map((address) => {
            axios.get(`https://maps.vietmap.vn/api/search?api-version=1.1&apikey=${vietmapapi}&text=${address.address}`)
                .then(function (response) {
                    return response.data.data.features[0].geometry.coordinates;
                })
                .then(function (response) {
                    // handle successr
                    // console.log(response);
                    newaddressdata.push({
                        ...address,
                        longtitude: response[0],
                        latitude: response[1],
                    }
                    );
                    // console.log(newaddressdata);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        });
        setAddressMarker(newaddressdata);
    }, []);

    return (
        <View style={styles.container}>
            <SearchInput />


            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                styleURL="https://demotiles.maplibre.org/style.json" >

                {/* {AddressMarker.map(() => { <Marker id={'id'} coordinate={[106.80298972384487, 10.870261764182892]} /> })} */}
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
export default Map;