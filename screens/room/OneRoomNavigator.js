import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "./Chat";
import Room from "./Room";
import StravaImage from "../../assets/stravarun.jpg"
import { ImageBackground } from "react-native";
import RoomStack from "./RoomStack";

const Top = createMaterialTopTabNavigator()

export default function OneRoomNavigator({ route }) {

    return (
        <ImageBackground
            resizeMode="cover"
            source={StravaImage}
            style={{
                flex: 1,

            }}
        >
            <Top.Navigator screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: { fontFamily: 'Dosis', fontSize: 25 },
                tabBarStyle: { flex: 0.2, justifyContent: "center", opacity: 0.8 },
                }}
            >
                <Top.Screen name="roomstack" component={RoomStack} initialParams={{ roomId: route.params.roomId }} options={{ title: "Tilanne" }} />
                <Top.Screen name="chat" component={Chat} initialParams={{ roomId: route.params.roomId }} options={{ title: "Viestit" }} />
            </Top.Navigator>
        </ImageBackground>
    )
}