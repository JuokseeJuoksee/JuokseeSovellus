import { View, Text, ImageBackground, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { Avatar, Button, Icon, ListItem } from "react-native-elements"
import { db } from "../../database/firebase";
import { onValue, ref, update } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth} from "firebase/auth"
import { app } from '../../database/firebase'
import Competition from "./Competition";
import axios from "axios";
import { useContext } from "react";
import userContext from "../../context/user/userContext";

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

    const { state } = useContext(userContext)

    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [fullUsers, setFullUsers] = useState([])

    const [trainings, setTrainings] = useState([])

    const [room, setRoom] = useState()

    useEffect(() => {
        onValue(
            ref(db, `rooms/${route.params.roomId}`), (snapshot) => {
                setRoom(snapshot.val())
                setUsers(snapshot.val().users)
            }
        )
    }, [])

   

    // useEffect(() => {
    //     onValue(
    //         ref(db, `rooms/${route.params.roomId}`), (snapshot) => {
    //             const data = snapshot.val()
    //             setUsers(data.users)
                
    //         }
    //     )
    // }, [])

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
                getTrainings(data)

            })
        })
    }, [users])

   
    
   

    // useEffect(() => console.log(fullUsers),[fullUsers])

    const userToRoom = () => {
        update(
            ref(db, `rooms/${route.params.roomId}` ),{
                users: [auth.currentUser.uid, ...users] 
            }
        )
    }

    const isUserInRoom = () => {
        if (users.includes(state.user.userId)) {
            return true
        } 
        return false
        // let boolean = false
        // users.forEach(user => {
        //     if(user == auth.currentUser.uid) boolean = true
        // })
        
        // return boolean
    }

    const renderUsers = (item) => {
        return <TouchableOpacity style={styles.row}
                    title={item.item.athlete_name}
                    onPress={() => navigation.navigate("Trainings",item.item)}
                >
                    <Text style={styles.text}>{item.item.athlete_name}</Text>
                    <Avatar rounded source={item.item.athlete_picture ? { uri: item.item.athlete_picture } : DefAvatar}  />
                </TouchableOpacity>
                
    }

    // tähän vielä myöhemmin että onko juoksu yms nyt tulee kaikki
    //jos vanha accesstoken niin ei toimi vielä
    const getTrainings = (user) => {

        axios.get('https://www.strava.com/api/v3/athlete/activities' ,{
          headers : { 
            'Authorization': "Bearer "+user.access_token
          }
        })
        .then(res => {
            setTrainings(arr => [...arr, {athlete_name: user.athlete_name, athlete_elo: 100, trainings: res}])
        })
        .catch(err => { 
            console.error(err, "VANHA ACCESS TOKEN :)")
            getAccessToken(user)
        })
    }
    
    const getAccessToken = (user) => {
        console.log('getting new tokens')
    
        // console.log(user.refresh_token)
    
        axios.post(`https://www.strava.com/api/v3/oauth/token?client_id=76862&client_secret=67401766aa8757e4f2c742595091a8d3014137c6&grant_type=refresh_token&refresh_token=${user.refresh_token}`)
        .then(res => {
            putTokensToUser(res.data, user)})
        .catch(err => console.error(err))
      }
    
      const putTokensToUser = (tokens, user) => {
        console.log('tokens to user')
        console.log(tokens)
        console.log(user)
        try {
            update(
            ref(db, 'users/' + user.userId), {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
            }
        ) } catch {console.log('jokin meni pieleen')}
    
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
                    flex: 2,
                    alignContent: "center",
                    alignItems: "center",
                }}>
                    
                    <Competition usersAndTrainings={trainings} roomId={route.params.roomId}></Competition>
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: "#F25C05",
                    alignItems: "center",
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