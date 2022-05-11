import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest} from 'expo-auth-session'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { app, db } from '../../database/firebase'
import { getAuth} from "firebase/auth"
import { push, ref, set} from "firebase/database"
import * as AuthSession from 'expo-auth-session';
import userContext from '../../context/user/userContext'
import LogoutButton from './LogoutButton'
import tyylit from "../../tyyli/tyyli"
import {CLIENT_SECRET} from "@env"


const discovery = {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
  };

const auth = getAuth(app)

export default function StravaButton() {

    const { login, register, strava } = React.useContext(userContext)
    const [device, setDevice] = React.useState('')

    React.useEffect(() => {
      setDevice(Platform.OS === 'ios' ? 'ios' : 'android')
    },[])

    const redirecturlIOS =
     makeRedirectUri({
     preferLocalhost: true
    })

    const redirecturlANDROID =  makeRedirectUri({
        // TÄHÄN OIKEALLA TAVALLA
       })
 
       //exp://192.168.1.3:19000

    const [request, response, promptAsync] = useAuthRequest(
       
        {
          clientId: '76862',
          scopes: ['activity:read_all'],
          redirectUri: device === 'android' ? redirecturlANDROID : redirecturlIOS

        },
        discovery
      );
      
    React.useEffect(() => {
        if (response?.type === 'success') {
          const { code } = response.params
          getAthleteTokens(code)
          }
    }, [response]);

    const getAthleteTokens = (code) => {
        axios.post(`https://www.strava.com/oauth/token?client_id=76862&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`)
        .then(res => {
            console.log(res.data)
            putTokensToUser(res.data)})
            //  strava(true)
        .catch(err => console.error(err))
    }

    const putTokensToUser = (tokens) => {
        set(
            ref(db, 'users/' + auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                athlete_id: tokens.athlete.id,
                athlete_name: tokens.athlete.username,
                athlete_picture: tokens.athlete.profile
            }
        )
        .catch(err => Alert.alert("Jokin meni pieleen"+err))
    }


    return(
       
<>

        <TouchableOpacity
        style={tyylit.loginbutton}
        onPress={() => {
            promptAsync();
        }}>
        <Text style={tyylit.buttontext}>Kirjaudu Stravaan</Text>
        </TouchableOpacity>

      {/* <LogoutButton></LogoutButton> */}
        
</>
    )
}const styles = StyleSheet.create({
    
    buttonContainer2: {
      margin:'auto',
      alignItems:'center'
      },
    button: {
      flex: 1,
      alignItems: 'center',
      color: "red"
    },
    text: {
      fontSize: 20,
      
    },
  });