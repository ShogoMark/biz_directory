import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from '@/config/FirebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import Intro from '../../components/BusinessDetails/intro';
import ActionButton from '../../components/BusinessDetails/ActionButton';
import About from '../../components/BusinessDetails/About';
import Reviews from '../../components/BusinessDetails/Reviews';


export default function businessid() {

const {businessid} = useLocalSearchParams();
const [business, setBusiness] = useState();
const [loading, setLoading] = useState(false);

useEffect(() => {
    GetBusinessDetailById();
}, [])

/*Used to get Businesslist by id*/
    const GetBusinessDetailById = async()=> {
        setLoading(true)
        const docRef=doc(db, 'BusinessList', businessid)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusiness({id: docSnap.id, ...docSnap.data()})
            setLoading(false)
        } else {
            console.log('No such document')
            setLoading(false)
        }
    }

  return (
    <ScrollView>
    {loading?<ActivityIndicator
        style={{
            marginTop: '70%'
        }} 
        size={'large'}
        color={Colors.PRIMARY}
    />:
        <View>
            {/* intro section */}
            <Intro business={business}/>
            {/* action button section */}
            <ActionButton business={business} />
            {/* about section */}
            <About business={business} />

            {/* review section */}    

            <Reviews business={business} />        
        </View>
    }
    </ScrollView>
  )
}