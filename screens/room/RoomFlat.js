import { Pressable, Text, ImageBackground, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const Stack = createNativeStackNavigator()



export default function RoomFlat({ room, navigation }) {

    return (
            
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Room', {room: room})}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{room[1].roomname}</Text>
                </TouchableOpacity>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    margin: 10,
    padding: 20,
    width: '95%',
    opacity: 0.85,
    borderTopRightRadius:30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
    }
});
