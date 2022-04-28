import { View, Text, ImageBackground } from "react-native";
import userContext from "./context/user/userContext";
import { useContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app, db } from "./database/firebase";
import { onValue, ref } from "firebase/database";
import Image from "./assets/background.jpg";

const auth = getAuth(app)

export default function WelcomePage() {

    const { login, strava, logout} = useContext(userContext)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(!user.uid){
                logout()
            }
            else if(user) {
                const uid = user.uid
                onValue(
                    ref(db, `users/${uid}`), (snapshot) => {
                        const data  = snapshot.val()
                        login(data)
                        console.log(data)
                        if(data){
                            if (data.athlete_id) {
                                strava(true)
                            }else{
                                strava(null) 
                            }
                            
                        }
                    }
                )
            }
        })
    },[])

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