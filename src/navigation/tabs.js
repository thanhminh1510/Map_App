/* eslint-disable prettier/prettier */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// screens
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { Home, Restaurants } from "../screen";

const HomeStackNavigator = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={Home} />
            <HomeStackNavigator.Screen
                name="Restaurants"
                component={Restaurants} />
        </HomeStackNavigator.Navigator>
    )
}


function Mytabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'green',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                    tabBarBadge: 10,
                    headerShown: false,
                }}
            />
            <Tab.Screen name="Restaurants" component={Restaurants}
                options={{
                    tabBarLabel: 'Restaurants',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
function Navigation() {
    return (
        <NavigationContainer>
            <Mytabs />
        </NavigationContainer>
    );
}
export default Navigation;