import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors'
import Category from '@/components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'


export default function explore() {

  const [businessList, setBusinessList] = useState([]);

  const GetBusinessByCategory = async(category) => {
    setBusinessList([])
    const q=query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setBusinessList(prev=>[...prev, {id:doc.id, ...doc.data()}]);
      //console.log(doc.data())
    })
  }

  return (
    <View style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30
      }}>Explore More</Text>

      {/* Search Bar */}
      <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            gap: 10,
            alignItems: 'center',
            padding: 10,
            marginVertical: 10,
            marginTop: 15,
            borderRadius: 8,
            borderColor: Colors.PRIMARY,
            borderWidth: 1
        }}>
            <Ionicons name="search-outline" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder='Search...'
                style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                }}
            />
        </View>

      {/* Category */}
      <Category explore={true}
      onCategorySelect={(category) => GetBusinessByCategory(category)}
      />
      {/* Business List */}

      <ExploreBusinessList businessList={businessList} />
    </View>
  )
}