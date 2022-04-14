import { createNativeStackNavigator } from'@react-navigation/native-stack';
import OneRoomNavigator from './OneRoomNavigator';
import Rooms from './Rooms';

const Stack = createNativeStackNavigator()

export default function RoomNavigator({ route }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={Rooms}   options={{ headerShown: false }} />
            <Stack.Screen name="OneRoomNavigator" component={OneRoomNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}