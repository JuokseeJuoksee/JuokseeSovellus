import { Button } from 'react-native';
import { app } from '../../database/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import userContext from '../../context/user/userContext';
import { db } from "../../database/firebase";
import { onValue, ref } from 'firebase/database';

const auth = getAuth(app)

export default function LoginButton({email, password}) {
    
    const { login } = useContext(userContext)

    const tryLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            if (user) {
                const uid = user.user.uid
                onValue(
                    ref(db, `users/${uid}`), (snapshot) => {
                        // DATA = KÄYTTÄJÄ
                        const data = snapshot.val()
                        login(data)
                    }
                )
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Button 
            title='Kirjaudu' 
            onPress={tryLogin}
        />
    )
}