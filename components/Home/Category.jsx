import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import CategoryItem from '../Home/CategoryItem'
import { useRouter } from 'expo-router';



export default function Category({explore=false, onCategorySelect}) {

    const [categoryList, setCategoryList] = useState([])

    const router = useRouter();

    useEffect(() => {
        GetCategoryList();
    }, [])
      
const GetCategoryList = async() => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
        setCategoryList(prev=>[...prev, doc.data()]);
    })
}

const onCategoryPressHandler = (item) => {
    if (!explore) {
        router.push('/businesslist/'+item.name)
    } else {
        onCategorySelect(item.name)
    }
}

  return (
    <View>
      {!explore &&
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
                }}>Category 
            </Text>
            <Text style={{
                color: Colors.PRIMARY,
                fontFamily: 'outfit-medium',

            }}>View All</Text>
        </View>}

        <FlatList 
            data={categoryList}
            horizontal={true}
            renderItem={({item, index}) => (
                <CategoryItem 
                category={item} 
                key={index}
                onCategoryPress={(category) => onCategoryPressHandler(item)}
                />
            )}
        />
        
    </View>  
  )
}