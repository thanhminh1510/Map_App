/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


    input: {
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    },
})


const SearchInput = () => {
    return (
        <TextInput
            style={styles.input}
            placeholder={'Search'}
            placeholderTextColor={'#666'}
        />
    )
}
export default SearchInput;