import { useEffect } from "react";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import { db } from "../../database/firebase";
import { onValue, ref } from "firebase/database";
import DefAvatar from "../../assets/avatar.png";

export default function UsersTrainings({ route, navigation }) {

    const [room, setRoom] = useState()

    useEffect(() => {  
        onValue(
            ref(db, `rooms/${route.params.roomId}`), (snapshot) => {
                const data = snapshot.val()
                setRoom(data)
            }
        )
    }, [])

    useEffect(() => {
        fetchUserTrainings()
    }, [])

    const fetchUserTrainings = () => {
        const user = route.params.user
        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${user.access_token}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <View style={{
            flex: 1
        }}>
            <Button 
                title="Kaikki"
                type="clear"
                titleStyle={{ fontFamily: 'Dosis', color: "#F25C05" }}
                iconPosition="left"
                icon={
                    <Icon name="arrow-back" color="#F25C05" />
                }
                buttonStyle={{
                    marginRight: "auto"
                }}
                onPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottomWidth: 0.2,
                        paddingBottom: 10,
                        marginLeft: 10
                    }}>
                        <Avatar rounded size={100} source={route.params.user.athlete_picture ? { uri: route.params.user.athlete_picture } : DefAvatar} />
                        <Text style={{ fontFamily: 'Dosis', marginLeft: 20, fontSize: 20 }}>Käyttäjän treenit</Text>
                    </View>
                    <View>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}