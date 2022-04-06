import * as React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
// import {Storage, sessionStorage } from '../classes/Storage'
import axios from 'axios';
import Training from './Training';

export default function Trainings({trainings, navigation, users}) {

  const renderItem = ({item}) => {
    let user
    users.forEach(element => {
      if (element.athlete_id == item.athlete.id) {
        user = element
      }
    })
    return <Training item={item} navigation={navigation} user={user}/>
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          style={{width:'90%'}}
          data={trainings}
          renderItem={renderItem}
          keyExtractor={training => training.id}
        >
        </FlatList>
       
      </View>
    );
  }