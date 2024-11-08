import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function intro({business}) {

    const router = useRouter();
    const {user} = useUser();

    const onDelete = () => {
        Alert.alert('Do you want to Delete', 'Do you really want to Delete this business?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: ()=>deleteBusiness()

            }
        ])
    }

    const deleteBusiness = async() => {
        console.log("Delete Business")
        await deleteDoc(doc(db, 'BusinessList', business?.id));
        router.back();
        ToastAndroid.show('Business Deleted', ToastAndroid.LONG)
    }

  return (
    <View>
        <View style={{
            position: 'absolute',
            zIndex: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 20
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            
            <Ionicons name="heart-outline" size={40} color="white" />
        </View>
        <Image source={{uri: business?.imageUrl}}
            style={{
                width: '100%',
                height: 300
            }}
        />

        <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            padding: 20,
            marginTop: -20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25

        }}>
            <View style={{
                padding: 20,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                    }}
                >{business?.name}</Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: 'outfit'
                    }}
                >{business?.address}</Text>


            </View>
            {user?.primaryEmailAddress?.emailAddress==business?.userEmail&&
            <TouchableOpacity onPress={()=>onDelete()}>
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>}
        </View>
    </View>
  )
}