import { View, Text, ImageBackground } from "react-native";
import userContext from "./context/user/userContext";
import { useContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app, db } from "./database/firebase";
import Image from "./assets/background.jpg";
import { push, ref, set, onValue} from "firebase/database"

const auth = getAuth(app)

export default function WelcomePage() {

    const { login, strava, state } = useContext(userContext)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? login({user: user}) : login({user: null})
        })
            

      

        
    },[])
    console.log("welcome",state)
    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    alignItems: "center",
                    justifyContent: "center"
                }}
                resizeMode="cover"
                source={Image}
            >
                <Text>Tervetuloa urheilemaan</Text>
            </ImageBackground>
        </View>
    )
}