import { runnerElo, runningIndex, runningIndexWithSpeed, teamVersusElo } from "elosystems";
import { useEffect, React, useState } from "react";
import { View, Button, ImageBackground, Text } from "react-native";


export default function Competition(props) {

const [chartData, setChartData] = useState([])


useEffect(() => {
    const arr = []
    let totalKm=0;

    props.usersAndTrainings.forEach(element => {
        if(element.trainings.data[0]===undefined || element.trainings.data[0]===[]){
            arr.push({athlete_name: element.athlete_name, athlete_elo: element.athlete_elo, points: 1})
        }
        else{
            element.trainings.data.forEach(km=>{
                totalKm = totalKm + km.distance
            })

            // npm paketti ohjelmistokurssilta
            const points = runningIndex(element.athlete_elo, totalKm/1000)

            arr.push({athlete_name: element.athlete_name, athlete_elo: element.athlete_elo, points: points})
        }
    })

    setChartData(arr)
   
}, [props])


    
    return (

    
        <View style={{
             flex: 1,
            marginTop:50 
        }}>
        
        {chartData.map(item=>
            <Text style={{fontSize:20}}>{item.athlete_name} : {item.points} point(s)</Text>
        )}

            
        </View>
    )
}

