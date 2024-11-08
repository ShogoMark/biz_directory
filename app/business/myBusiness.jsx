import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors'


export default function myBusiness() {
    const [userBusinessList, setUserBusinessList] = useState([])
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTitle: "My Business",
            headerStyle: {
                backgroundColor: Colors.PRIMARY
            }
        })
        user&&GetUserBusiness();
    }, [user])

    // used to get business list by user

    const GetUserBusiness = async()=> {
        setLoading(true)
        setUserBusinessList([])
        const q = query(collection(db, 'BusinessList'), 
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserBusinessList(prev=>[...prev, {id:doc.id, ...doc.data()}])
        })

        setLoading(false)
    }

  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>My Business</Text>


      <FlatList 
        data={userBusinessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index}) => (
            <BusinessListCard business={item} 
                key={index}
            />
        )}
      />
    </View>
  )
}