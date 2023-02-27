import React from 'react'
import { View, Text, TextInput, Dimensions } from 'react-native'
import { ListItem } from '@rneui/base';
import { useState } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const Busqueda = ({ fetchWeatherData }) => {

    const [lista, setLista] = useState('');
    const [busqueda, setBusqueda] = useState('');
    colors = ['rgba(220, 236, 255, 0.5)', 'black'];


    function buscar(text) {
        if (text !== '') {
            const urlGetCities = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=71fa8fd4c2f406c48484fde2e9bc40de`;
            axios({
                method: 'GET',
                url: urlGetCities,
            }).then((response) => {
                let datos = [];
                let array = [];
                response.data.forEach((e, i) => {
                    datos[0] = '';
                    datos[1] = [];
                    datos[0] += e.name;
                    if (e.state !== '' && e.state != undefined) {
                        datos[0] += ', ' + e.state;
                    }
                    datos[0] += ', ' + e.country;
                    datos[1] = [e.lat, e.lon];
                    let coordinates = datos[1];

                    let text = React.createElement(Text, {}, datos[0]);
                    if (i === 0 && response.data.length === 1) {
                        let listItem = (
                            <ListItem
                                key={i}
                                onTouchStart={() => {
                                    fetchWeatherData(coordinates[0], coordinates[1]);
                                }}
                                containerStyle={{
                                    borderRadius: 5,
                                    backgroundColor: colors[0],
                                    width: Dimensions.get('screen').width - 20,
                                }}
                            >
                                <ListItem.Content containerStyle={{ backgroundColor: colors[0] }}>
                                    <ListItem.Title style={{ color: 'black' }}>{text}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        );
                        array.push(listItem);
                    } else if (i === 0 && response.data.length > 1) {
                        let listItem = (
                            <ListItem
                                key={i}
                                onTouchStart={() => {
                                    fetchWeatherData(coordinates[0], coordinates[1]);
                                }}
                                containerStyle={{
                                    borderTopRightRadius: 5,
                                    borderTopLeftRadius: 5,
                                    backgroundColor: colors[0],
                                    width: Dimensions.get('screen').width - 20,
                                }}
                            >
                                <ListItem.Content containerStyle={{ backgroundColor: colors[0] }}>
                                    <ListItem.Title style={{ color: 'black' }}>{text}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        );
                        array.push(listItem);
                    } else if (i === response.data.length - 1) {
                        let listItem = (
                            <ListItem
                                key={datos[1]}
                                onTouchStart={() => {
                                    fetchWeatherData(coordinates[0], coordinates[1]);
                                }}
                                containerStyle={{
                                    borderBottomRightRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    backgroundColor: colors[0],
                                    width: Dimensions.get('screen').width - 20,
                                }}
                            >
                                <ListItem.Content containerStyle={{ backgroundColor: colors[0] }}>
                                    <ListItem.Title style={{ color: 'black' }}>{text}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        );
                        array.push(listItem);
                    } else {
                        let listItem = (
                            <ListItem
                                key={datos[1]}
                                onTouchStart={() => {
                                    fetchWeatherData(coordinates[0], coordinates[1]);
                                }}
                                containerStyle={{
                                    backgroundColor: colors[0],
                                    width: Dimensions.get('screen').width - 20,
                                }}
                            >
                                <ListItem.Content containerStyle={{ backgroundColor: colors[0] }}>
                                    <ListItem.Title style={{ color: 'black' }}>{text}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        );
                        array.push(listItem);
                    }
                })
                let listaFinal = React.createElement(View, {}, array);
                setLista(listaFinal);
            }).catch((e) => {
                alert(e);
            });
        }
    }

    function updateSearch(text) {
        setBusqueda(text);
        buscar(text);
        if (text === '') {
            setLista('');
        }
    }

    return (

        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <View style={[styles.searchBar, { backgroundColor: colors[0] }]}>
                <View style={{ flexDirection: 'row', width: '90%' }}>
                    <EvilIcons name="search" size={30} color="black" />
                    <TextInput style={{ width: '100%', fontSize: 18, color: 'black' }}
                        placeholder='Buscar...'
                        value={busqueda}
                        onChangeText={(text) => updateSearch(text)}
                    />
                </View>
                {busqueda !== '' ? (<EvilIcons name='close' size={30} style={{ color: 'black' }} onPress={() => { setLista(''); setBusqueda(''); }} />) : (<View></View>)}
            </View>
            <View style={{ width: Dimensions.get('screen').width - 20, alignItems: 'center', marginTop: 10 }}>
                {lista}
            </View>
        </View>

    )
}

export default Busqueda

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBar: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        gap: 5,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    }
});
