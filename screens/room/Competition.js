import { runnerElo, runningIndex, runningIndexWithSpeed, teamVersusElo } from "elosystems";
import { View, Button, ImageBackground } from "react-native";


export default function Competition() {


console.log(runningIndex(100, 30))

// attributes: players elo, distance in KM, min/km speed
console.log(runningIndexWithSpeed(100, 20,4))

// attributes: players current elo, placement, AvgElo,amountOfParticipants
console.log(runnerElo(70, 1, 90, 5))


    
    return (

        <View style={{
            flex: 1,
            // marginTop:50 
        }}>
        
            
        </View>
    )
}

