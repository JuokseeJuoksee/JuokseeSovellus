import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Map from './Map';
import OneRoomNavigator from './OneRoomNavigator';
import Rooms from './Rooms';
import Trainings from './Trainings';

const Stack = createNativeStackNavigator()

export default function RoomNavigator({ route }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={Rooms}   options={{ headerShown: false }} />
            <Stack.Screen name="OneRoomNavigator" component={OneRoomNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="Trainings" component={Trainings}  />
            <Stack.Screen name="Map" component={Map}  />
        </Stack.Navigator>
    )
}