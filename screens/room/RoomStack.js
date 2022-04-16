import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "./Room";
import UsersTrainings from "./UsersTrainings";

const Stack = createNativeStackNavigator()

export default function RoomStack({ route }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="room" component={Room} initialParams={{ roomId: route.params.roomId }} options={{ headerShown: false }} />
            <Stack.Screen name="userstrainings" component={UsersTrainings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}