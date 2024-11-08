import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import PopularBusinessCard from '../Home/PopularBusinessCard'


export default function PopularBusiness() {

  const [businessList, setBusinessList] = useState([])

  useEffect(() => {
    GetBusinessList();
  }, [])

  const GetBusinessList = async() => {
    setBusinessList([]);
    const q = query(collection(db, 'BusinessList'), limit(10));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      //console.log(doc.data())
      setBusinessList(prev=>[...prev, {id: doc.id, ...doc.data()}])
    })
  }

  return (
    <View style={{
      paddingBottom: 200,
    }}>
       <View style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', 
            marginTop: 10,
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold',
                }}>Popular Business 
            </Text>
            <Text style={{
                color: Colors.PRIMARY,
                fontFamily: 'outfit-medium',

            }}>View All</Text>
        </View>

        <FlatList 
          data={businessList}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <PopularBusinessCard 
              business={item}
              key={index}
            />
          )}
        />
    </View>
  )
}