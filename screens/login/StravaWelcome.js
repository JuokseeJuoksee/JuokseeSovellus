import { View, Button, ImageBackground } from "react-native";
import LogoutButton from "../../components/buttons/LogoutButton";
import StravaButton from "../../components/buttons/StravaButton";
import Image from "../../assets/stravarun.jpg"
import { onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app, db } from "../../database/firebase";
import { useContext, useEffect } from "react";
import userContext from "../../context/user/userContext";

export default function StravaWelcome({navigation}) {


    const auth = getAuth(app)

    const { strava } = useContext(userContext)

    useEffect(() => {
         
    const starCountRef = ref(db, 'users/' + auth.currentUser.uid+'/access_token');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        data ? strava(true) : strava(null)
    });
},[])
    
    return (
        <View style={{
            flex: 1,
            // marginTop:50 
        }}>
         <ImageBackground 
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                resizeMode="cover"
                source={Image}
            >  

            <StravaButton />
        </ImageBackground>

            
        </View>
    )
}