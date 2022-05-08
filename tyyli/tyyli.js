import { StyleSheet } from "react-native";


const tyylit = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10, 
        width: '80%'
    },
    textInput: {
        width: '80%',
        backgroundColor: 'white',
        opacity: 0.7,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 10
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        height: '80%',
        width: '90%',
        backgroundColor: 'white',
        opacity: 0.7,
        borderRadius: 20,
        alignItems: 'center', 
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200
      },
    logoutbutton: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        padding: 20,
        borderRadius:20,
        left: 25,
        marginVertical: - 20
        
    },
    loginbutton: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        padding: 20,
        borderRadius: 20,
        left: 205,
        bottom: 37 
        
    },
    buttontext: {
        color: 'white',
        fontSize: 14
    },
    profileName:{
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,

    },
    profileEmail: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10
    }
})

export default tyylit;