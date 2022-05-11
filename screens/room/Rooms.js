import { onValue, ref} from "firebase/database"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { View, ImageBackground, FlatList, TouchableOpacity, Text } from "react-native"
import { Avatar, Icon, ListItem } from "react-native-elements"
import Image from '../../assets/background.jpg'
import userContext from "../../context/user/userContext"
import { db } from '../../database/firebase'
import DefAvatar from "../../assets/avatar.png"

export default function Rooms({navigation}) {   
    
    const [rooms, setRooms] = useState([])

    // KÄYTTÄJÄ MUKANA HUONEESSA
    const [roomsWhereUser, setRoomsWhereUser] = useState([])
    const { state } = useContext(userContext)

    // FILTTERI PÄÄLLÄ (VAIN HUONEET, JOISSA KÄYTTÄJÄ MUKANA, NÄKYVÄT)
    const [showUsersRooms, setShowUsersRooms] = useState(false)

    useEffect(() => {
        onValue(
            ref(db, 'rooms'), (snapshot) => {
                let data = snapshot.val()
                setRooms(Object.entries(data))
                setRoomsWhereUser(Object.entries(data).filter(room => room[1].users.includes(state.user.userId)))
            }
        ) 
    }, [])

    

    const ListSeparator = () => {
        return <View style={{ height: 40, borderBottomColor: "grey", borderBottomWidth: 1, opacity: 0 }} />
    }

    const RenderedItem = item => {
        return (
            <ListItem>
                <Avatar 
                    source={item[1].hostPictureUrl ? { uri: item[1].hostPictureUrl } : DefAvatar }
                />
                <ListItem.Content>
                    <ListItem.Title>{item[1].roomname}</ListItem.Title>
                    <ListItem.Subtitle>Osallistujia: {item[1].users.length}</ListItem.Subtitle>
                    <ListItem.Subtitle>
                        Luotu: {new Date(item[1].created).getDate().toLocaleString()}.{new Date(item[1].created).getMonth() + 1}.{new Date(item[1].created).getFullYear()}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    size={50}
                    color="#F25C05"
                    onPress={() => navigation.navigate("OneRoomNavigator", {
                        roomId: item[0]
                    })}
                />
            </ListItem>
        )
    }
   
    return (
    <View style={{
        flex: 1
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
        <FlatList 
            style={{
                width: '90%',
                marginTop: 20
            }}
            data={showUsersRooms ? roomsWhereUser : rooms}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => RenderedItem(item) }
            listSeparator={ListSeparator}
        />
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.99)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 90,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    height: 90,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    opacity: 0.8
                }}
                onPress={() => setShowUsersRooms(!showUsersRooms)}
            >
                <Icon name='accessibility' size={30} color='#01a699'  />
                {showUsersRooms ? <Text style={{ fontFamily: 'Dosis' }}>Näytä kaikki</Text> : <Text style={{ fontFamily: 'Dosis' }}>Skabani</Text>}
            </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}

// 