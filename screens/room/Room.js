import { View, Text, ImageBackground, FlatList } from "react-native"
import { Avatar, Button, Icon, ListItem } from "react-native-elements"
import { db } from "../../database/firebase";
import { onValue, ref } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import DefAvatar from "../../assets/avatar.png";

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
                setAllUsers(Object.values(data))
            }
        )
    }, [])

    const RenderItem = item => {
        return (
            <View style={{
                margin: 5
            }}>
                <Avatar onPress={() => navigation.navigate("userstrainings", {user: item, roomId: route.params.roomId})} rounded source={item.athlete_picture ? { uri: item.athlete_picture } : DefAvatar} />
            </View>
        )
    }

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
                    flex: 0.3,
                    backgroundColor: "#F25C05",
                    alignItems: "center"
                }}>
                    <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 30 }}>Mukana Skabassa</Text>
                        <FlatList 
                            horizontal={true}
                            data={allUsers.filter(user => users.includes(user.userId))}
                            keyExtractor={(item, index) => index}
                            renderItem={({item}) => RenderItem(item)}
                        />
                       
                </View>

            </View>
        </View>
    )
}