import UserContext from "./userContext";
import { useReducer } from "react";
import { LOGIN, LOGOUT, REGISTER,SEEN_WELCOME, STRAVA } from "./userActions";
import userReducer from "./userReducer";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../database/firebase";

export default function UserState(props) {
    

    const initialState = {
        user: null,
        seenWelcome: false,
        strava: false
    }
       

    const [state, dispatch] = useReducer(userReducer, initialState)

    const login = (user) => {
        // dispatch({
        //     type: LOGIN,
        //     payload: user
        // })
        onValue(
            ref(db, `users/${user.uid}`), (snapshot) => {
                const data = snapshot.val()
                console.log(data)
                dispatch({
                    type: LOGIN,
                    payload: data
                })       
                data.athlete_id ? strava(true) : strava(null)
            }
        )
    }

    const strava = (boolean) => {
        dispatch({
            type: STRAVA,
            payload: boolean
        })
    }
 

    const logout = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    const register = (user) => {
        // console.log(user.user)
        // dispatch({
        //     type: REGISTER,
        //     payload: user
        // })
        set(
            ref(db, `users/${user.user.uid}`), {
                userId: user.user.uid
            }
        )
        .finally(() => login(user.user))
        .catch(err => console.log(err))
    }

    const seenWelcome = () => {
        dispatch({
            type: SEEN_WELCOME,
            payload: true
        })
    }

    return (
        <UserContext.Provider value={{
            state, login, logout, register, seenWelcome, strava
        }}>
            {props.children}
        </UserContext.Provider>
    )
}