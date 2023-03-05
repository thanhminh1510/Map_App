import React, { Component, useState, useEffect } from "react";
import MapLibreGL from "@maplibre/maplibre-react-native";
import { View, TextInput, StyleSheet } from "react-native";

import SearchInput from "../Search";

import { Image } from "react-native";
// import Marker from "../Marker";
import PolygonLayer from "../Polygon";
import LineLayer from "../LineString";

// Initialize the module (needs to be done only once)
import axios from "axios";

import vietmapapi from "../../config/env";



MapLibreGL.setAccessToken(null);


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
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
    const [addressMarker, setAddressMarker] = useState([0,0]);

    const keyApi = vietmapapi.Token;

    // Custom data
    const addressData = [
        { id: 1, address: "Đại học Công nghệ thông tin Thành Phố Hồ Chí Minh" },
        { id: 2, address: "Trường Đại học Khoa học Tự nhiên Thành Phố Hồ Chí Minh" },
    ];


    /**useEffect(() => {
        const getData = async () => {
            await addressData.map((address) => {
                axios.get("https://maps.vietmap.vn/api/search?api-version=1.1&apikey="+keyApi+"&text=" + address.address)
                    .then(function (response) {
                        return response.data.data.features[0].geometry.coordinates;
                    })
                    .then(function (response) {
                        // handle successr
                        // console.log(response);
                        setAddressMarker([...addressMarker, { ...address, coordinate: [response[0], response[1]] }]);
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
            // console.log("newaddressdata: ", newaddressdata);
        }
        getData()
    }, []);
    */
    
     useEffect(() => {
        const storeData = async () => {
            await addressData.map(async (address) => {
                let data = await fetch("https://maps.vietmap.vn/api/search?api-version=1.1&apikey="+keyApi+"&text=" + address.address)
                let json = await data.json();
                setAddressMarker([...addressMarker, { ...address, coordinate:[json[0], json[1]]  }]);
            }) 
            storeData()
                .catch(console.error);;
        };
        storeData();
    },[])
    

    console.log("String: ", setAddressMarker);
    return (
        <View style={styles.container}>
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                styleURL="https://demotiles.maplibre.org/style.json" >
                {
                    addressMarker.map((value, index) => {
                        return (
                            <MapLibreGL.MarkerView
                                key={index}
                                coordinate={value.coordinate}
                                x={0}
                                y={0}
                                anchor={{ x: 0, y: 0.5 }}
                            >
                            <View>
                                <Image
                                    style={{ height: 50, width: 50 }}
                                    source={require("../../accest/img/map-marker-icon.png")}/>
                            </View>
                            </MapLibreGL.MarkerView>
                        )
                    }
                    )
                }




                <MapLibreGL.Camera
                    zoomLevel={10}
                    maxZoomLevel={18}
                    animationMode={"flyTo"}
                    animationDuration={1100}
                    centerCoordinate={[106.8008250530943, 10.876258630954924]}
                />
                <MapLibreGL.RasterSource
                    maxZoomLevel={18}
                    id="raster-id"
                    tileUrlTemplates={[
                        `https://maps.vietmap.vn/tm/${1}/${1}/${1}@2x.png?apikey=${vietmapapi}`,
                    ]}>
                    <MapLibreGL.RasterLayer
                        maxZoomLevel={18}
                        id="id-example"
                        sourceID="source-id-example"
                    />
                </MapLibreGL.RasterSource>
            </MapLibreGL.MapView>
        </View>
    )
}
export default Map;