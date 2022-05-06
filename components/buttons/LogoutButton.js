import { Button, Alert, TouchableOpacity, Text } from 'react-native';
import { app } from '../../database/firebase'
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import userContext from '../../context/user/userContext';
import tyylit from "../../tyyli/tyyli"

const auth = getAuth(app)

export default function LogoutButton({email, password, login}) {
    
    const { logout } = useContext(userContext)

    const tryLogout = () => {
        signOut(auth)
        .then(() => logout())
        .catch(err => console.log(err))
    }

    return (
        <TouchableOpacity
            style={tyylit.logoutbutton}
            title='KIRJAUDU ULOS' 
            onPress={tryLogout}
        >
        <Text style={tyylit.buttontext}>Kirjaudu Ulos </Text>
        </TouchableOpacity>
    )
}