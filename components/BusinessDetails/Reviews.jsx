import { View, Text, TextInput, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({business}) {

    const [ratings, setRatings] = useState(4)
    const [userInput, setUserInput] = useState()
    const { user } = useUser();

    const onSubmit = async() => {
        const docRef = doc(db, 'BusinessList', business?.id)

        await updateDoc(docRef, {
            reviews: arrayUnion({
                ratings: ratings,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl
            })
        })
        ToastAndroid.show('Comment Added Successfully !', ToastAndroid.BOTTOM)
    }

    return (
    <View style={{
        padding: 20,
        backgroundColor: '#fff'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>Reviews</Text>

      <View>
        <Rating
        imageSize={20}
        showRating={false}
        onFinishRating={(rating) => setRatings(rating)}
        style={{ paddingVertical: 10 }}
        />

        <TextInput
            placeholder='Write your comment'
            numberOfLines={4}
            onChangeText={(value)=>setUserInput(value)}
            style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                borderColor: Colors.GRAY,
                textAlignVertical: 'top'
            }}
        />
        <TouchableOpacity
            disabled={!userInput}
            style={{
                padding: 10,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 6,
                marginTop: 10
            }}
            onPress={()=>onSubmit()}
        >
            <Text
                style={{
                    fontFamily: 'outfit',
                    color: '#fff',
                    textAlign: 'center'
                }}
            >Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Display previous preview */}

      <View>
        {business?.reviews?.map((item, index) => (
            <View style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginVertical: 15,
                padding: 10,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                borderRadius: 15
            }}>
                <Image source={{uri: item.userImage}}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium'
                    }}>{item.userName}</Text>
                    <Rating 
                        imageSize={20}
                        ratingCount={item.rating}
                        style={{
                            alignItems: 'flex-start'
                        }}
                    />
                    <Text>{item.comment}</Text>
                </View>
            </View>
        ))}
      </View>
    </View>
  )
}