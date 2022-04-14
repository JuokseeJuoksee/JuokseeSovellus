import { View, Text, ImageBackground, FlatList } from "react-native";
import { db } from "../../database/firebase";
import { onValue, ref, set } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import BackgroundImage from "../../assets/chatback.jpg";
import { useContext } from "react";
import userContext from "../../context/user/userContext";
import { Avatar, Button, Input } from "react-native-elements";
import DefAvatar from "../../assets/avatar.png";

export default function Chat({ route }) {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const { state } = useContext(userContext)
    const [room, setRoom] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        onValue(
            ref(db, `rooms/${route.params.roomId}`), (snapshot) => {
                const data = snapshot.val()
                setMessages(data.messages)
                setRoom(data)
            }
        )
    }, [])

    useEffect(() => {
        onValue(
            ref(db, "users"), (snapshot) => {
                const data = snapshot.val()
                setUsers(Object.entries(data))
            }
        )
    }, [])

    const sendMessage = () => {
        set(
            ref(db, `rooms/${route.params.roomId}`), {
                ...room,
                messages: [{message: message, send: new Date().getTime(), sender: state.user.userId}, ...messages]
            }
        )
        .then(() => setMessage(''))
        .catch(err => console.log(err))
    }

    const YouMessage = (mes) => {
        const senderId = mes.sender
        const url = users.filter(user => user[0] === senderId).map(item => item[1].athlete_picture)
        const pictureUrl = url[0]
        return (
            <View style={{
                backgroundColor: "#F25C05",
                width: '80%',
                marginLeft: "auto",
                marginRight: 5,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20
            }}>
                <View style={{
                    flexDirection: "row"
                }}>                    
                    <Avatar rounded source={pictureUrl ? { uri: pictureUrl } : DefAvatar}  />
                    <Text style={{ fontFamily: 'Dosis' }}>
                        {new Date(mes.send).getDate().toLocaleString()}.{new Date(mes.send).getMonth() + 1}.{new Date(mes.send).getFullYear()}
                    </Text>
                </View>
                <Text style={{ fontFamily: 'Dosis', fontSize: 20, margin: 10 }}>{mes.message}</Text>
            </View>
        )
    }

    const OtherMessage = (mes) => {
        const senderId = mes.sender
        const url = users.filter(user => user[0] === senderId).map(item => item[1].athlete_picture)
        const pictureUrl = url[0]
        return (
            <View style={{
                backgroundColor: "white",
                width: '80%',
                marginLeft: 5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20
            }}>
                <View style={{
                    flexDirection: "row"
                }}>                    
                    <Avatar rounded source={pictureUrl ? { uri: pictureUrl } : DefAvatar}  />
                    <Text style={{ fontFamily: 'Dosis' }}>
                        {new Date(mes.send).getDate().toLocaleString()}.{new Date(mes.send).getMonth() + 1}.{new Date(mes.send).getFullYear()}
                    </Text>
                </View>
                <Text style={{ fontFamily: 'Dosis', fontSize: 20, margin: 10 }}>{mes.message}</Text>
            </View>
        )
    }

    const ListSeperator = () => {
        return (
            <View style={{
                height: 10
            }} />
        )
    }

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={{
                    flex: 1
                }}
            >
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        justifyContent: "center",
                        marginTop: 10,
                        opacity: 0.9,
                    }}>
                        <Input 
                            placeholder="Viestisi..."
                            containerStyle={{
                                width: '60%'
                            }}
                            value={message}
                            onChangeText={txt => setMessage(txt)}
                        />
                        <Button 
                            title="Lähetä"
                            titleStyle={{
                                fontFamily: 'Dosis'
                            }}
                            type="outline"
                            onPress={sendMessage}
                        />
                    </View>
                </View>

                <View style={{
                    flex: 5
                }}>
                    <FlatList 
                        data={messages}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => item.sender === state.user.userId ? YouMessage(item) : OtherMessage(item)}
                        ItemSeparatorComponent={ListSeperator}
                    />
                </View>

            </ImageBackground>
        </View>
    )
}