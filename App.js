/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './src/screen/Map';
// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
import { useState, useEffect } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const App = () => {
  // console.log(data);
  return (
    <View style={styles.page}>
      <Map />
    </View>
  );
}
export default App;