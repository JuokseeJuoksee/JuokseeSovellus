import { View, Button, Image, Text } from "react-native";
import LogoutButton from "../../components/buttons/LogoutButton";
import StravaButton from "../../components/buttons/StravaButton";
import tyylit from "../../tyyli/tyyli";

export default function Profile({navigation}) {

    
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{marginTop: 20}}>
            <Image source={require('../../assets/stravaprofile.png')}/>               
            </View>
            <View style={tyylit.profile}>
                <Text>Welcome to ...</Text>
            </View>
            <View style={{marginTop: 300}}>
            <LogoutButton />
            <StravaButton />
            </View>
        </View>
    )
}