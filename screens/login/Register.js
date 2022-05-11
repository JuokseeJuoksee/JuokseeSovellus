import { useState } from 'react';
import { View, ImageBackground, Text, TextInput } from 'react-native';
import RegisterButton from '../../components/buttons/RegisterButton';
import Image from '../../assets/runner.png'
import tyylit from "../../tyyli/tyyli";


export default function Register({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    return (
        <View style={{
            flex:1,
        }}>
            <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={Image}
            >
                <View style={styles.box}>
                    <Text style={styles.button}>Tervetuloa rekisteröitymään!</Text>
                    <TextInput 
                        placeholder="  Käyttäjänimi tai email"
                        keyboardType="email-address"
                        style={styles.textInput}
                        onChangeText={username => setEmail(username)}
                        value={email} 
                    />
                    <TextInput 
                        placeholder="  Salasana"
                        style={styles.textInput}                     
                        onChangeText={pass => setPassword(pass)}
                        value={password}  
                    />
                    <TextInput 
                        placeholder="  Salasana uudelleen"
                        style={styles.textInput}                    
                        onChangeText={pass => setPasswordAgain(pass)}
                        value={passwordAgain}  
                    />
                    <View style={styles.button}>
                        <RegisterButton email={email} password={password} passwordAgain={passwordAgain} />
                    </View>
                </View>
                

            </ImageBackground>


        </View>
    )
}

const styles = tyylit
