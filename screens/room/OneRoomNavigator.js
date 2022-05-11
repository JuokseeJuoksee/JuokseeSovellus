import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "./Chat";
import Room from "./Room";

const Top = createMaterialTopTabNavigator()

export default function OneRoomNavigator({ route }) {

    return (
        <Top.Navigator>
            <Top.Screen name="room" component={Room} initialParams={{ roomId: route.params.roomId }} options={{ title: "Tilanne" }} />
            <Top.Screen name="chat" component={Chat} initialParams={{ roomId: route.params.roomId }} options={{ title: "Viestit" }} />
        </Top.Navigator>
    )
}