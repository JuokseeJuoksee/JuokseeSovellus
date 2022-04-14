import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ImageBackground } from '@react-navigation/native';
import { useEffect, useContext } from 'react';
import Profile from './screens/profile/Profile';
import CreateRoom from './screens/room/CreateRoom';
import LoginNavigator from './screens/login/LoginNavigator';
import userContext from './context/user/userContext';
import WelcomePage from './WelcomePage';
import RoomTopNavigator from './screens/room/RoomTopNavigator';
import StravaWelcome from './screens/login/StravaWelcome';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function Navigator() {

  const { state, seenWelcome } = useContext(userContext)

  useEffect(() => {
    setTimeout(() => {
      seenWelcome()
    }, 2000);
  }, [])
  
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      focused ? size = 60 : 40
      focused ? color = "#F25C05" : "white"
      if (route.name === 'Login') {
        iconName = 'md-home';
      } else if (route.name === 'Kilpailut') {
        iconName = 'emoji-events';
      } else if (route.name === 'Luo') {
        iconName = 'construction';
      } else if (route.name === 'Profiili') {
        iconName = 'person';
      }
  
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarStyle: { opacity: 0.7, backgroundColor: "black", height: 70 },
    tabBarLabelStyle: { fontFamily: 'Dosis', fontSize: 15, color: "white" }
  });

 
// console.log(state)

  while (!state.seenWelcome) {
    return <WelcomePage />
  } 


  if (state.user && state.strava === true) {
    return (
      <NavigationContainer>      
          <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Profiili" component={Profile} options={{ headerShown: false, tabBarHideOnKeyboard: true }}  />
              <Tab.Screen name="Kilpailut" component={RoomTopNavigator} options={{ headerShown: false, tabBarHideOnKeyboard: true }} />
              <Tab.Screen name="Luo" component={CreateRoom} options={{ headerShown: false,tabBarHideOnKeyboard: true }} />
          </Tab.Navigator>
      </NavigationContainer>
    )
  } 
  else if(state.user && state.strava !== true){
    return(
      <NavigationContainer>      
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="StravaWelcome" component={StravaWelcome} options={{ headerShown: false, tabBarStyle: { display: 'none' }}}  />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  else {
    return (
      <NavigationContainer>      
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Login" component={LoginNavigator} options={{ headerShown: false, tabBarStyle: { display: 'none' }}}  />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  
}