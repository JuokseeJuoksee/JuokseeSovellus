import { View, Text, ImageBackground } from "react-native"
import { Avatar, Button, Icon } from "react-native-elements"
import { db } from "../../database/firebase";
import { onValue, ref } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";

export default function Room({ navigation, route }) {

    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        onValue(
            ref(db, `rooms/${route.params.roomId}`), (snapshot) => {
                const data = snapshot.val()
                setUsers(data.users)
            }
        )
    }, [])

    useEffect(() => {
        onValue(
            ref(db, "users"), (snapshot) => {
                const data = snapshot.val()
                const all = Object.entries(data).map(item => ({[item[0]]: item[1].athlete_picture}))
                setAllUsers(all)
            }
        )
    }, [])

    return (
        <View style={{
            flex: 1
        }}>
            <Button 
                title="Takaisin kilpailuihin"
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
            <View style={{
                
            }}>

            </View>

            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text>Tilanne</Text>
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: "#F25C05",
                    alignItems: "center"
                }}>
                    <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 30 }}>Mukana Skabassa</Text>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        
                    </View>
                </View>

            </View>
        </View>
    )
}