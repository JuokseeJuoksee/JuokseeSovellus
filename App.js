import UserState from './context/user/UserState';
import Navigator from './Navigator';
import { useFonts } from 'expo-font';

export default function App() {

  const [loading] = useFonts({
    Dosis: require("./assets/fonts/Dosis-Light.ttf")
  })

  while (!loading) {
    return null
  }

  return (
    <UserState>
      <Navigator />
    </UserState>
  );
}

