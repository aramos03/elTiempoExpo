import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, FlatList, Modal, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Busqueda from './Busqueda';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';

export default function Weather({ weatherData, currentWeather, fetchWeatherData }) {
    const forecast = weatherData;
    const actual = currentWeather;
    let colores = 'black';

    const [selectedItem, setSelectedItem] = useState(actual);
    const [modalVisible, setModalVisible] = useState(false);

    function getBackgroundColor(sunriseTime, sunsetTime) {
        const sunriseDate = new Date((sunriseTime + actual.timezone) * 1000);
        const sunsetDate = new Date((sunsetTime + actual.timezone) * 1000);
        const sunriseHour = sunriseDate.getHours();
        const sunsetHour = sunsetDate.getHours();
        let currentHour = new Date(Date.now()).getHours() + (actual.timezone / 3600 - 1);
        if(currentHour < 0 ){
            currentHour = 24 + currentHour;
        }
       /*  console.log('Sunrise ' + sunriseHour);
        console.log('Sunset ' + sunsetHour);
        console.log('Current ' + currentHour); */
        if (currentHour >= sunriseHour - 1 && currentHour <= sunriseHour + 1) {
            // Si es el amanecer, devuelve un gradiente lineal que simula un cielo al amanecer
            return {
              colors: ['#ffcc00', '#ff9933', '#fac241', '#66ccff', '#0fa8f5'].reverse(),
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            };
          } else if (currentHour >= sunsetHour - 1 && currentHour <= sunsetHour + 1) {
            // Si es el anochecer, devuelve un gradiente lineal que simula un cielo al atardecer
            return {
              colors: ['#FFB347', '#FFA347', '#FF8347', '#FF6047', '#D11F4C', '#6D1B7B', '#14142B'].reverse(),
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            };
          } else if (currentHour > sunriseHour + 1 && currentHour < sunsetHour - 1) {
            // Si es de día, devuelve un gradiente lineal que simula un cielo despejado
            return {
              colors: ['#3498db', '#9dc3e6', '#d4eaff'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 }
            };
          } else {
            // Si es de noche, devuelve un gradiente lineal que simula un cielo nocturno
            return {
              colors: ['#001d63', '#165091', '#2465b0'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            };
          }
    }

    return (
        <LinearGradient {...getBackgroundColor(actual.sys.sunrise, actual.sys.sunset)} style={{ flex: 1 }} >
            <SafeAreaView style={styles.container}>

                <Busqueda fetchWeatherData={fetchWeatherData}></Busqueda>

                <ScrollView >
                    <Text style={styles.title}>
                        {actual.name}
                    </Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: Dimensions.get('screen').height / 2.9 }}>
                        <View>
                            <Text style={styles.tempActual}>
                                {Math.round(actual.main.temp)}ºC
                            </Text>
                        </View>
                        <View style={styles.temp}>
                            <Text style={styles.descripcion}>
                                {actual.weather[0].description.charAt(0).toUpperCase() + actual.weather[0].description.slice(1).toLowerCase() + ' '}
                                {Math.round(actual.main.temp_min)}ºC/{Math.round(actual.main.temp_max)}ºC
                            </Text>
                            <Text>
                                {

                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.extraInfo}>
                        <View style={styles.info}>
                            <View>
                                <Image
                                    source={require('../assets/sensacion-termica.png')}
                                    style={{ width: 41, height: 43, marginLeft: 50 }} />
                                <Text style={styles.text}>
                                    {Math.round(actual.main.feels_like)}ºC
                                </Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                Sensación térmica
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <View>
                                <Image
                                    source={require('../assets/humedad.png')}
                                    style={{ width: 43, height: 43, marginLeft: 50 }} />
                                <Text style={styles.text}>
                                    {Math.round(actual.main.humidity)}%
                                </Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                Nivel de humedad
                            </Text>
                        </View>
                    </View>
                    <View style={styles.extraInfo}>
                        <View style={styles.info}>
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                    N
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                        O
                                    </Text>
                                    <View>
                                        <Image
                                            source={require('../assets/flecha.png')}
                                            style={{ width: 41, height: 43, transform: [{ rotate: `${actual.wind.deg}deg` }] }} />
                                    </View>
                                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                        E
                                    </Text>
                                </View>
                                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                    S
                                </Text>
                                <Text style={styles.text}>
                                    {(actual.wind.speed * 3.6).toFixed(1)} km/h
                                </Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                Viento
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/presion.png')}
                                    style={{ width: 100, height: 100 }} />
                                <Text style={styles.text}>
                                    {actual.main.pressure} mbar
                                </Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                Presión
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, paddingLeft: 10, backgroundColor: 'rgba(220, 236, 255, 0.5)', justifyContent: 'center', borderRadius: 5, width: Dimensions.get('screen').width - 20, alignSelf: 'center', marginBottom: 10 }}>
                            <EvilIcons style={{ padding: 0, margin: 0 }} name="clock" size={30} color={colores} />
                            <Text style={[styles.subtitle, { color: colores }]}>Pronóstico por horas</Text>
                        </View>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            horizontal
                            data={forecast.list}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={
                                (hora) => {
                                    let weather = hora.item.weather[0];
                                    let dt = new Date(hora.item.dt * 1000);
                                    const hours = dt.getHours().toString().padStart(2, "0");
                                    const minutes = dt.getMinutes().toString().padStart(2, "0");
                                    const timeString = `${hours}:${minutes}`;
                                    let dia = dt.getDate().toString().padStart(2, "0");
                                    let mes = (dt.getMonth() + 1).toString().padStart(2, "0");
                                    let anio = dt.getFullYear().toString();
                                    let fechaFormateada = `${dia}/${mes}/${anio}`;
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setSelectedItem(hora.item);
                                            setModalVisible(true);
                                        }}>
                                            <View style={styles.hora}>
                                                <Text style={styles.text}>{timeString}</Text>
                                                <Image
                                                    style={styles.smallIcon}
                                                    source={{
                                                        uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`
                                                    }} />
                                                <Text style={styles.text}>{Math.round(hora.item.main.temp)}ºC</Text>
                                                <Text style={{
                                                    fontSize: 20,
                                                    textAlign: 'center',
                                                    maxWidth: '100%'
                                                }}>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1).toLowerCase()}</Text>
                                                <Text>{fechaFormateada}</Text>
                                                <Text style={{ top: 0 }}>Ver detalles {'>'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    </View>
                </ScrollView>

                <Modal
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                    transparent={true}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)' }}>
                            <View style={{ backgroundColor: 'white', width: Dimensions.get('screen').width - 40, flex: 1, maxHeight: Dimensions.get('screen').height / 2, borderRadius: 10 }}>
                                <LinearGradient
                                    {...getBackgroundColor(actual.sys.sunrise, actual.sys.sunset)}
                                    style={{ flex: 1, borderRadius: 10 }}
                                >
                                    <TouchableHighlight underlayColor="rgba(255,255,255,0.25)" style={{ position: 'absolute', top: 10, right: 10, borderRadius: 10 }} onPress={() => setModalVisible(false)}>
                                        <EvilIcons name="close" size={40} color={colores} />
                                    </TouchableHighlight>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 10, marginBottom: -20 }}>
                                        <Text style={{ fontSize: 30, color:'white' }}>{Math.round(selectedItem.main.temp)}ºC</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 24, color:'white' }}>{Math.round(selectedItem.main.temp_min)}ºC/{Math.round(selectedItem.main.temp_max)}ºC</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.extraInfo, {height:Dimensions.get('screen').height / 6.5}]}>
                                        <View style={styles.info}>
                                            <View>
                                                <Image
                                                    source={require('../assets/sensacion-termica.png')}
                                                    style={{ width: 41, height: 43, marginLeft: 50 }} />
                                                <Text style={styles.text}>
                                                    {Math.round(selectedItem.main.feels_like)}ºC
                                                </Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                Sensación térmica
                                            </Text>
                                        </View>
                                        <View style={styles.info}>
                                            <View>
                                                <Image
                                                    source={require('../assets/humedad.png')}
                                                    style={{ width: 43, height: 43, marginLeft: 50 }} />
                                                <Text style={styles.text}>
                                                    {Math.round(selectedItem.main.humidity)}%
                                                </Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                Nivel de humedad
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.extraInfo, {height:Dimensions.get('screen').height / 4.75}]}>
                                        <View style={styles.info}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                    N
                                                </Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                        O
                                                    </Text>
                                                    <View>
                                                        <Image
                                                            source={require('../assets/flecha.png')}
                                                            style={{ width: 41, height: 43, transform: [{ rotate: `${selectedItem.wind.deg}deg` }] }} />
                                                    </View>
                                                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                        E
                                                    </Text>
                                                </View>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                    S
                                                </Text>
                                                <Text style={styles.text}>
                                                    {(selectedItem.wind.speed * 3.6).toFixed(1)} km/h
                                                </Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                Viento
                                            </Text>
                                        </View>
                                        <View style={styles.info}>
                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../assets/presion.png')}
                                                    style={{ width: 100, height: 100 }} />
                                                <Text style={styles.text}>
                                                    {selectedItem.main.pressure} mbar
                                                </Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                                Presión
                                            </Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 48,
        color: 'white'
    },
    temp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actual: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },
    largeIcon: {
        width: 300,
        height: 250,
        margin: -15
    },
    tempActual: {
        fontSize: 100,
        textAlign: 'center',
        color: 'white'
    },
    descripcion: {
        fontSize: 24,
        width: '100%',
        textAlign: 'center',
        marginBottom: 5,
        color: 'white'
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: 'rgba(220, 236, 255, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        padding: 10
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        marginVertical: 12,
    }, hora: {
        padding: 3,
        margin: 3,
        width: 150,
        alignItems: 'center',
        backgroundColor: 'rgba(220, 236, 255, 0.5)',
        borderRadius: 20,
        marginBottom: 10,
        height: 230
    },
    smallIcon: {
        width: 100,
        height: 100,
        margin: -10
    }
});
