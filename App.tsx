import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import * as NavigationBar from 'expo-navigation-bar';

/**
 * Root component of the application.
 * Configures global settings such as StatusBar style and Android Navigation Bar behavior.
 */
export default function App() {

    /**
     * Configures the Android Navigation Bar to enable Immersive Mode.
     * This ensures the navigation buttons do not obscure the camera view.
     */
    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setVisibilityAsync("hidden");
            NavigationBar.setBehaviorAsync("overlay-swipe");
            NavigationBar.setBackgroundColorAsync("rgba(0,0,0,0)");
        }
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <HomeScreen />
        </>
    );
}