import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';




export default function Slider() {
    const [sliderList, setSliderList] = useState([])

    useEffect(() => {
        GetSliderList();
    }, [])
    

const GetSliderList = async () => {
    setSliderList([]);
    const q=query(collection(db, 'Slider'))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        setSliderList(prev => [...prev, doc.data()])
    })
}


  return (
    <View>
        <Text style={{
            fontFamily: 'outfit-bold',
            paddingLeft: 20,
            fontSize: 20,
            paddingTop: 20,
            marginBottom: 5
        }}>
            #Special for you
        </Text>

        <FlatList 
            data={sliderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 20}}
            renderItem={({item, index}) => (
                <Image source={{uri:item.imageUrl}} 
                    style={{
                        width: 300,
                        height: 130,
                        borderRadius: 15,
                        marginRight: 15
                    }}
                />
            )}
        />
    </View>
  )
}