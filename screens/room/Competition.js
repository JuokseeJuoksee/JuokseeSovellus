import { runnerElo, runningIndex, runningIndexWithSpeed, teamVersusElo } from "elosystems";
import { onValue, ref, update } from "firebase/database";
import { useEffect, React, useState } from "react";
import { View, Button, ImageBackground, Text } from "react-native";
import { getAuth} from "firebase/auth"
import { app, db } from '../../database/firebase'

const auth = getAuth(app)

export default function Competition(props) {

const [chartData, setChartData] = useState([])



useEffect(() => {
    const arr = []
    let totalKm=0;
    // console.log(runningIndex(100, 55))
    props.usersAndTrainings.forEach(element => {
        totalKm=0
        if(element.trainings.data[0]===undefined || element.trainings.data[0]===[]){
            arr.push({athlete_name: element.athlete_name, athlete_elo: element.athlete_elo, points: 1})
        }
        else{
            element.trainings.data.forEach(km=>{
                totalKm = totalKm + km.distance
            })

            // npm paketti ohjelmistokurssilta
             const points= runningIndex(element.athlete_elo, totalKm/1000)
               

            console.log(points)
             arr.push({athlete_name: element.athlete_name, athlete_elo: element.athlete_elo, points: points})
        }
    })

    setChartData(arr)

}, [props])

const calculateAvg = ()=>{
    let indvElo = 0;
    chartData.forEach((item)=>{
        indvElo += item.athlete_elo
    }); 
    return indvElo/chartData.length
}

// kutsutaan kun kilpailu päättyy
const onCompetitionEnd = ()=>{

    
    const avgElo = calculateAvg()

    const sorted = chartData.sort(function (a, b) {
        return b.points - a.points;
    })

    sorted.forEach((item, index)=>{
      const newElo = runnerElo(item.athlete_elo, index+1, avgElo, chartData.length) 

      update(
        ref(db, `users/${item.userId}` ),{
             elo: newElo 
        }
    )

    })
}
    
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

