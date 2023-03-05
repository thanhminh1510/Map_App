/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { View, TextInput, StyleSheet } from 'react-native';

import SearchInput from '../Search';

import { Image } from 'react-native';
import Marker from '../Marker';
import PolygonLayer from '../Polygon';
import LineLayer from '../LineString';

// Initialize the module (needs to be done only once)
import axios from 'axios';

import vietmap_api from '../../config/env';



MapLibreGL.setAccessToken(null);

const vietmapapi = vietmap_api.Token;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
});


function Map() {

    // const [viewport, setViewport] = useState({
    //     latitude: 10.870261764182892,
    //     longtitude: 106.80298972384487,
    //     zoom: 16,
    // })
    const [addressMarker, setAddressMarker] = useState([]);


    // Custom data
    const addressData = [
        { id: 1, address: 'Đại học Công nghệ thông tin Thành Phố Hồ Chí Minh' },
        { id: 2, address: 'Trường Đại học Khoa học Tự nhiên Thành Phố Hồ Chí Minh' },
    ];



    useEffect(() => {

        const getData = async () => {
            await addressData.map((address) => {
                axios.get(`https://maps.vietmap.vn/api/search?api-version=1.1&apikey=${vietmapapi}&text=${address.address}`)
                    .then(function (response) {
                        return response.data.data.features[0].geometry.coordinates;
                    })
                    .then(function (response) {
                        // handle successr
                        // console.log(response);
                        setAddressMarker([...addressMarker, { ...address, coordinate: [response[0], response[1]] }])
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
            // console.log('newaddressdata: ', newaddressdata);
        }
        getData()
    }, []);

    console.log('String: ', addressMarker);
    return (
        <View style={styles.container}>
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                styleURL="https://demotiles.maplibre.org/style.json" >
                {
                    addressMarker.map((value, index) => {
                        return (
                            <Marker
                                key={value.id}
                                id={value.id}
                                coordinate={value.coordinate}
                                x={0}
                                y={0}
                            />
                        )
                    }
                    )
                }




                <MapLibreGL.Camera
                    zoomLevel={10}
                    maxZoomLevel={18}
                    animationMode={'flyTo'}
                    animationDuration={1100}
                    centerCoordinate={[106.8008250530943, 10.876258630954924]}
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
            </MapLibreGL.MapView>
        </View >
    )
}
export default Map;