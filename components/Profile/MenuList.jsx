import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


export default function MenuList() {

    const {signOut} = useAuth(); 

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('../../assets/images/addBusiness.png'),
            path: '/business/addbusiness'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/business.png'),
            path: '/business/myBusiness'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/newShare.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('../../assets/images/Logout.png'),
            path: 'logout'
        },
]

const router = useRouter();

const onMenuClick = (item) => {
    if (item.path == "logout") {

        signOut();
        return;
    }

    if (item.path == "share") {
        Share.share(
            {
               message: 'Download the Business Directory App by Shogo Mark'
            }
        )
    }

    router.push(item.path)
}

  return (
    <View style={{
        marginTop: 40
    }}>
        <FlatList 
            data={menuList}
            numColumns={2}
            renderItem={({item, index})=>(
                <TouchableOpacity 
                    onPress={()=>onMenuClick(item)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    flex: 1,
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                    margin: 10,
                    backgroundColor: '#fff'
                }}>
                    <Image source={item.icon} 
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                    <Text
                        style={{
                          fontFamily: 'outfit-medium',
                          fontSize: 17,
                          flex:1
                        }}
                    >{item.name}</Text>
                </TouchableOpacity>
            )}
        />
        <Text style={{
            fontFamily: 'outfit',
            textAlign: 'center',
            marginTop: 40,
            color: Colors.GRAY
        }}>Developed by Shogo Mark @ 2024</Text>
    </View>
  )
}