import { runnerElo, runningIndex, runningIndexWithSpeed, teamVersusElo } from "elosystems";
import { onValue, ref, update } from "firebase/database";
import { useEffect, React, useState } from "react";
import { View, Button, ImageBackground, Text } from "react-native";
import { getAuth} from "firebase/auth"
import { app, db } from '../../database/firebase'
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const auth = getAuth(app)

export default function Competition(props) {

const [chartData, setChartData] = useState([])
const [loaded, setLoaded] = useState(false)
const [ended, setEnded] = useState(false)
const [endsIn, setEndsIn] = useState()


// TODO: jos ekaa kertaa huomataan että loppuu niin elo päivitys
useEffect(() => {
    onValue(
        ref(db, `rooms/${props.roomId}`), (snapshot) => {
            const data = snapshot.val()
         
           if(new Date(data.endsIn) > new Date()){
                console.log("kisa vielä päällä",data.endsIn)
           }else{
               console.log("kisa päättynyt")
               setEnded(true)

           }
           setEndsIn(data.endsIn)
        }
    )

}, [])

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
                if(new Date(endsIn) > new Date(km.start_date)){
                    totalKm = totalKm + km.distance
                }
            })

            // npm paketti ohjelmistokurssilta
            const points= runningIndex(element.athlete_elo, totalKm/1000)
               

            console.log(points)
            arr.push({athlete_name: element.athlete_name, athlete_elo: element.athlete_elo, points: points})
        }
    })

    setChartData(arr)
    setLoaded(true)
    console.log("aeaea",arr)

}, [props])






// laskee avg elon osallistujien välillä
const calculateAvg = ()=>{
    let indvElo = 0;
    chartData.forEach((item)=>{
        indvElo += item.athlete_elo
    }); 
    return indvElo/chartData.length
}

// TODO: jatkokehitysmahdollisuus
// kutsutaan kun kilpailu päättyy
const onCompetitionEnd = ()=>{

    const avgElo = calculateAvg()

    const sorted = chartData.sort(function (a, b) {
        return b.points - a.points;
    })

    sorted.forEach((item, index)=>{
      const newElo = runnerElo(item.athlete_elo, index+1, avgElo, chartData.length) 

    // päivittää userin uuden elon
    update(
        ref(db, `users/${item.userId}` ),{
            elo: newElo 
        }
    )

    
    })

    // laittaa kiplailun päättyneeksi, (ei testattu)
    update(
        ref(db, `rooms/${props.roomId}` ),{
            ended: true 
        }
    )

}
    
    return (

        <View style={{
            marginTop:50 
        }}>
        {ended && 
        <>
            <Text style={{alignSelf: "flex-start", fontSize: 15}}>kisa päättynyt</Text>
            <Text style={{alignSelf: "center", fontSize: 25}}>Tulokset:</Text>
        </>
        }


        {loaded && 
        <VictoryChart width={350}>
          <VictoryBar 
            alignment="start" style={{ data: { fill: "orange" } }} 
            data={chartData} x="athlete_name" y="points" 
            horizontal={false}
        />
          
        </VictoryChart>
        }
      

        </View>
    )
}

