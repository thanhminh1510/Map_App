/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Map from './src/components/Map';
// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.

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

export default class App extends Component {
  render() {
    return (
      <View style={styles.page}>
        <Map />
      </View>
    );
  }
}