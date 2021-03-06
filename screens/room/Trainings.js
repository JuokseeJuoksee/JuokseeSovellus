import * as React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
// import {Storage, sessionStorage } from '../classes/Storage'
import axios from 'axios';
import Training from './Training';
import { getAuth} from "firebase/auth"
import { app } from '../../database/firebase'
import { push, ref, set,update, onValue } from "firebase/database"
import { db } from '../../database/firebase'
import {CLIENT_SECRET} from "@env"

const auth = getAuth(app)
export default function Trainings({ route, navigation }) {

  const [trainings, setTrainings] = React.useState([])
  const user = route.params;
  // const setShowTrainings = props.setShowTrainings


  const renderItem = ({item}) => {
    return <Training item={item} user={user} navigation={navigation}/>
  }

  const getTrainings = () => {
        
    // console.log('getting users trainings')

    axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers : {
        'Authorization':`Bearer ${user.access_token}`
      }
    })
    .then(res => {
      
            res.data.forEach(element => {
                setTrainings(arr => [...arr, element])
            })
    })
    .catch(err => { 
        console.error(err)
        getAccessToken(user)
    })
  } 

  const getAccessToken = (user) => {
    console.log('getting new tokens')

    // console.log(user.refresh_token)

    axios.post(`https://www.strava.com/api/v3/oauth/token?client_id=76862&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${user.refresh_token}`)
    .then(res => {
        putTokensToUser(res.data, user)})
    .catch(err => console.error(err))
  }

  const putTokensToUser = (tokens, user) => {
    console.log('tokens to user')
    try {
        update(
        ref(db, 'users/' + user.userId), {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        }
    ) } catch {console.log('jokin meni pieleen')}

}
  React.useEffect(() => getTrainings(),[])
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#F25C05'}}>
        <FlatList
          style={{width:'90%'}}
          data={trainings}
          renderItem={renderItem}
          keyExtractor={training => training.id}
        >
        </FlatList>
        {/* <Button
          title='go back'
          onPress={() => setShowTrainings(false)}
        ></Button> */}
      </View>
    );
  }