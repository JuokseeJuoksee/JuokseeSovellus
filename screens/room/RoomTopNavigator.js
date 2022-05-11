import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ImageBackground } from "react-native";
import RoomNavigator from "./RoomNavigator";
import Rooms from "./Rooms";
import StravaImage from "../../assets/stravarun.jpg";

const Top = createMaterialTopTabNavigator()

export default function RoomTopNavigator() {

    return (
        <ImageBackground
            source={StravaImage}
            resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%'
                }}
        >
            <Top.Navigator
                screenOptions={{
                        tabBarActiveTintColor: "black",
                        tabBarLabelStyle: { fontFamily: 'Dosis', fontSize: 30, },
                        tabBarStyle: { flex: 0.3, justifyContent: "center", opacity: 0.7 },
                    }}
            >
                {/* <Top.Screen name="myrooms" component={RoomNavigator} initialParams={{ myRooms: true }} options={{ title: "Omat kilpailuni" }} /> */}
                <Top.Screen name="allrooms" component={RoomNavigator} options={{ title: "Skabat" }} />            
            </Top.Navigator>
        </ImageBackground>
    )
}