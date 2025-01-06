import { db } from '@/service/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from '../components/InfoSection'
import Hotel from '../components/Hotel'
import PlacesToVisit from '../components/PlacesToVisit'
import Footer from '../components/Footer'

const ViewTrip = () => {
    const {tripId} = useParams()
    const [trip, setTrip] = useState([])

    const getTripData = async() =>{
        const docRef = doc(db,'AiTrips',tripId);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists){
            console.log("Document : ",docSnap.data());
            setTrip(docSnap.data())
        }else{
            console.log("No such document");
            toast("No Trip Found")
        }
    }

    useEffect(()=>{
        getTripData()
    },[tripId])

    
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <InfoSection tripInfo={trip}/>
        <Hotel tripInfo={trip}/>
        <PlacesToVisit tripInfo={trip}/>
        <Footer tripInfo={trip}/>
    </div>
  )
}

export default ViewTrip