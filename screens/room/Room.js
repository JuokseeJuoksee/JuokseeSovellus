import { View, Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { Avatar, Button, Icon, ListItem } from "react-native-elements"
import { db } from "../../database/firebase";
import { onValue, ref, update } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth} from "firebase/auth"
import { app } from '../../database/firebase'

const auth = getAuth(app)

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        padding:7,
        borderStyle:'solid',
        borderWidth:1,
        marginTop:5,
        borderRadius: 8,
        borderColor:'white'
    },
    text:{
        marginTop:10,
        width:'80%',
        color:'white'
    }
})

export default function Room({ navigation, route }) {

    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [fullUsers, setFullUsers] = useState([])

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

    useEffect(() => {
        users.forEach(element => {
            const userRef = ref(db, 'users/' + element)
            onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                setFullUsers(arr => [...arr, data])
         })
        })
    }, [users])

    useEffect(() => console.log(fullUsers),[fullUsers])

    const userToRoom = () => {
        update(
            ref(db, `rooms/${route.params.roomId}` ),{
                users: [auth.currentUser.uid, ...users] 
            }
        )
    }

    const isUserInRoom = () => {
        let boolean = false
        users.forEach(user => {
            if(user == auth.currentUser.uid) boolean = true
        })
        
        return boolean
    }

    const renderUsers = (item) => {
        return <TouchableOpacity style={styles.row}
                    title={item.item.athlete_name}
                    onPress={() => console.log(item.item.athlete_name)}
                >
                    <Text style={styles.text}>{item.item.athlete_name}</Text>
                    <Avatar rounded source={item.item.athlete_picture ? { uri: item.item.athlete_picture } : DefAvatar}  />
                </TouchableOpacity>
                
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
                    flex: 1,
                    backgroundColor: "#F25C05",
                    alignItems: "center"
                }}>
                    {isUserInRoom() ? <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 30 }}>Mukana Skabassa</Text> : <View>
                        <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 30 }}>Et ole huoneessa</Text>
                        <Button
                        title="liity Skabaan"
                        onPress={userToRoom}
                        ></Button>
                        </View>}

                    <FlatList
                        style={{width:'90%'}}
                        data={fullUsers}
                        renderItem={renderUsers}
                        keyExtractor={user=> user.userId}
                    ></FlatList>
                </View>

            </View>
        </View>
    )
}