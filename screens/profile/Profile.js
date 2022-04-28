import { View, Button, Image } from "react-native";
import LogoutButton from "../../components/buttons/LogoutButton";
import StravaButton from "../../components/buttons/StravaButton";


export default function Profile({navigation}) {

    
    return (
        <View style={{
            flex: 1,
        }}>
            <View>
            <Image source={require('../../assets/stravaprofile.png')}/>               
            </View>
            <View>
            <LogoutButton />
            <StravaButton />
            </View>
        </View>
    )
}