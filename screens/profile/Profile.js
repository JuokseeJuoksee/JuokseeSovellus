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

export default function Profile({navigation}) {

    const [users, setUsers] = useState([])
    const { state } = useContext(userContext)
    
    useEffect(() => {
        onValue(
            ref(db, "users"), (snapshot) => {
                const data = snapshot.val()
                setUsers(Object.entries(data))
            }
        )
    }, [])

    const userAvatar = () => {
        const url = users.filter(user => user[0] === senderId).map(item => item[1].athlete_picture)
        const pictureUrl = url[0]
        
    }
        
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{marginTop: 20}}>
            <Image source={require('../../assets/stravaprofile.png')}/>               
            </View>
            {/* <ListItem>
            <Avatar rounded source={userAvatar}  />
            </ListItem> */}
            <View style={tyylit.profile}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>Tervetuloa skabaan</Text>
            </View>
            <View>
            <LogoutButton />
            <StravaButton />
            </View>
        </View>
    )
}