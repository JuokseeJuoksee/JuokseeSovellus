import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { Storage, sessionStorage } from '../../storage/Storage'

export default function Map() {


    const [coords, setCoords] = React.useState()
    const points = Polyline.decode(sessionStorage.getItem('polyline'))

    const getCoords = () => {
        setCoords(points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        }))

    }

    React.useState(() => getCoords(),[])

    return(
        <>
        <MapView style={{ flex: 1 }} initialRegion={{
        latitude: points[0][0],
        longitude: points[0][1],
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
        }}>

        <MapView.Polyline 
          coordinates={coords}
          strokeWidth={2}
          strokeColor="red"/>
        </MapView>
        </>
    )
}