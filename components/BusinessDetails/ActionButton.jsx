import { View, Text, FlatList, Image, Linking, Share } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function ActionButton({business}) {

const actionButtonMenu = [
    {
        id: 1,
        name: 'Call',
        icon: require('./../../assets/images/call.png'),
        url: 'tel: '+business?.contact
    },

    {
        id: 2,
        name: 'Location',
        icon: require('./../../assets/images/location.png'),
        url: 'https://www.google.com/maps/search/?api=1&query='+business?.address
    },

    {
        id: 3,
        name: 'Web',
        icon: require('./../../assets/images/world.png'),
        url: business?.website
    },

    {
        id: 4,
        name: 'Share',
        icon: require('./../../assets/images/share.png'),
        url: business?.website
    }

]

    const onPressHandle = (item) => {
        if (item.name == 'Share') {
            Share.share({
                message: business?.name+"\n Address:"+business?.address+"\n Find more details on Business Directory App by Shogo Mark"
            })
        }
        Linking.openURL(item.url)
    }

  return (
    <View
        style={{
            padding: 20,
            backgroundColor: '#fff'
        }}
    >
      <FlatList 
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item, index}) => (
            <TouchableOpacity 
            onPress={() => onPressHandle(item)}
            key={index}>
                <Image source={item?.icon}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'outfit-medium',
                        textAlign: 'center',
                        marginTop: 3
                    }}
                >{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}