import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, StatusBar, Dimensions } from 'react-native';
import Weather from './components/Weather';
import Busqueda from './components/Busqueda';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(latitud, longitud) {
        setLoaded(false);
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&units=metric&appid=71fa8fd4c2f406c48484fde2e9bc40de&lang=es`
        try {
            const response = await fetch(forecastURL);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
        setLoaded(false);
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=71fa8fd4c2f406c48484fde2e9bc40de&lang=es`
        try {
            const response = await fetch(currentURL);
            if (response.status == 200) {
                const data = await response.json();
                setCurrentWeather(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('37.8915500', '-4.7727500');
    }, [])


    if (!loaded) {
        return (
            <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('screen').width }]}>
                <ActivityIndicator color='black' size={36} />
            </View>
        )
    }

    else if (weatherData === null || currentWeather === null) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={['#001d63', '#165091', '#2465b0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, alignItems: 'center' }}
                >
                    <Busqueda />
                    <View style={{ backgroundColor: 'rgba(133,153,188,255)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50%', padding: 20, width: (Dimensions.get('screen').width - 40), borderRadius: 5 }}>
                        <Image style={{ width: 200, height: 125 }} source={require('./assets/sad-cloud.png')} />
                        <Text style={styles.primaryText}>Ha ocurrido algún error...</Text>
                    </View>
                </LinearGradient>
            </SafeAreaView >
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'}/>
            <Weather weatherData={weatherData} currentWeather={currentWeather} fetchWeatherData={fetchWeatherData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 24,
    }
});
