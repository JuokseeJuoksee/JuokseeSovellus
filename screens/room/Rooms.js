import { onValue, ref} from "firebase/database"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { View, ImageBackground, FlatList } from "react-native"
import { Avatar, ListItem } from "react-native-elements"
import Image from '../../assets/background.jpg'
import userContext from "../../context/user/userContext"
import { db } from '../../database/firebase'
import DefAvatar from "../../assets/avatar.png"

export default function Rooms({navigation}) {   
    
    const [rooms, setRooms] = useState([])
    const { state } = useContext(userContext)

    useEffect(() => {
        onValue(
            ref(db, 'rooms'), (snapshot) => {
                let data = snapshot.val()
                setRooms(Object.entries(data))
            }
        ) 
    }, [])

    const ListSeparator = () => {
        return <View style={{
            height: 8
        }}/>
    }

    const RenderedItem = item => {
        return (
            <ListItem style={{
                opacity: 0.8
            }}>
                <Avatar 
                    source={item[1].hostPictureUrl ? { uri: item[1].hostPictureUrl } : DefAvatar }
                    rounded
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
                marginTop: 40,
            }}
            data={rooms}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => RenderedItem(item) }
            ItemSeparatorComponent={ListSeparator}
        />
        </ImageBackground>
    </View>
    )
}

// 