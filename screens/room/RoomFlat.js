import { Pressable, Text, ImageBackground, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const Stack = createNativeStackNavigator()



export default function RoomFlat({ room, navigation }) {
    
    const Item = ({ title }) => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{room[1].roomname}</Text>
          <Text style={{ margin: 20 }}>Luotu {room[1].created}</Text>
          <Text style={{ margin: 20 }}>Tekijä {room[1].host}</Text>
        </View>
      );
    const renderItem = ({ item }) => (
        <Item title={room[1].roomname} />
      );

    return (
            
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Room', {room: room})}>
                <FlatList
                data={room}
                keyExtractor={(item, index)=>index.toString()}
                renderItem={renderItem}
                />
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
