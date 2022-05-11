import { View, Button, Image, Text } from "react-native";
import LogoutButton from "../../components/buttons/LogoutButton";
import StravaButton from "../../components/buttons/StravaButton";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react"
import { onValue, ref, set } from "firebase/database";
import { db } from "../../database/firebase";
import { Avatar, ListItem } from "react-native-elements";
import userContext from "../../context/user/userContext"
import tyylit from "../../tyyli/tyyli";
import { getAuth } from 'firebase/auth';
import { app } from '../../database/firebase'
import DefAvatar from "../../assets/avatar.png"

export default function Profile({navigation}) {

    
    const { state } = useContext(userContext)
    
    const auth = getAuth(app)
    const user = auth.currentUser;
   

    const renderAvatar = () => {

        let picture
        let email
        let name

        const userRef = ref(db, 'users/' + auth.currentUser.uid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            picture = data.athlete_picture
            email = user.email
            name = data.athlete_name
            console.log(user)
        })

        return (
        <View style={{alignItems: 'center'}}>
            <Avatar 
            size= 'large' 
            rounded 
            source={picture? {uri: picture} : DefAvatar}
            containerStyle={{ marginTop: 20}}
            />
            <Text style={tyylit.profileEmail}>{email}</Text>
            <Text style={tyylit.profileName}>{name}</Text>
        </View>
        )

    }

        
    return (
        <View style={{
            flex: 1
        }}>
            <View>
            <Image source={require('../../assets/stravaprofile.png')}/>               
            </View>
            <View style={{alignItems: 'center'}}>
            {renderAvatar()}
            </View>
            <View style={tyylit.profile}>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom:10}}>Tervetuloa skabaan</Text>
            </View>
            <View>
            <LogoutButton />
            <StravaButton />
            </View>
        </View>
    )
}