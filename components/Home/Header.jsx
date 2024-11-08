import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header() {

const {user} = useUser();

  return (
    <View style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <Image source={{uri:user?.imageUrl}}
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 99
                }}
            />
            <View>
                <Text style={{
                    color: '#fff'
                }}>Welcome, </Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'outfit-medium',
                    color: '#fff'
                }}>{user?.fullName}</Text>
            </View>
        </View>
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            gap: 10,
            alignItems: 'center',
            padding: 10,
            marginVertical: 10,
            marginTop: 15,
            borderRadius: 8
        }}>
            <Ionicons name="search-outline" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder='Search...'
                style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                }}
            />
        </View>
    </View>
  )
}