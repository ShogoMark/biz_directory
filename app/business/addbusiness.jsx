import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import { db, storage } from '../../config/FirebaseConfig';
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo';



export default function AddBusiness() {

  const navigation = useNavigation();
  const [image, setImage] = useState(null)
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('')
  const {user} = useUser();
  
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [website, setWebsite] = useState('')
  const [about, setAbout] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true
    })
    GetCategoryList();
  }, [])

  const onImagePick = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    setImage(result?.assets[0].uri)
    //console.log(result);
  }

  const GetCategoryList = async() => {
    setCategoryList([]);
    const q=query(collection(db, 'Category'));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      setCategoryList(prev=>[...prev, {
        label: (doc.data()).name,
        value: (doc.data()).name
      }])
    })
  }

  const onAddNewBusiness = async() => {
    setLoading(true)
    const fileName = Date.now().toString()+'.jpg';
    const resp=await fetch(image);

    const blob= await resp.blob();

    const imageRef = ref(storage, 'businessDirect/'+fileName);

    uploadBytes(imageRef, blob).then((snapshot)=>{
      console.log('File Uploaded...')
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl)
        saveBusinessDetail(downloadUrl)
      })
    })
    setLoading(false)
  }

  const saveBusinessDetail = async(imageUrl)=>{
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name:name,
        address:address,
        contact:contact,
        about:about,
        website:website,
        category:category,
        username:user?.fullName,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userImage:user?.imageUrl,
        imageUrl:imageUrl
      })
        setLoading(false);
      ToastAndroid.show('New business added', ToastAndroid.LONG)
  }

  return (
    <ScrollView style={{
      padding: 20,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Add New Business</Text>
      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY
      }}>Fill all details in order to add new business</Text>

      <TouchableOpacity style={{
        marginTop: 20,
      }} 
        onPress={()=>onImagePick()}
      >
       {!image? <Image source={require('../../assets/images/placeholder.png')} 
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
          }}
        /> :
        <Image source={{uri: image}} 
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />
        }
      </TouchableOpacity>

      <View>
          <TextInput placeholder='Name'
          onChangeText={(v)=>setName(v)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: 'outfit'
            }}
          
          />

        <TextInput placeholder='Address'
        onChangeText={(v)=>setAddress(v)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: 'outfit'
            }}
          
          />

        <TextInput placeholder='Contact'
        onChangeText={(v)=>setContact(v)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: 'outfit'
            }}
          
          />

        <TextInput placeholder='Website'
        onChangeText={(v)=>setWebsite(v)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: 'outfit'
            }}
          

            
          />

        <TextInput placeholder='About'
        onChangeText={(v)=>setAbout(v)}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: 'outfit',
              height: 100
            }}
          
          />
          <View style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: '#fff',
              marginTop: 10,
              borderColor: Colors.PRIMARY}}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) =>
                setCategory(itemValue)
              }>
                {categoryList.map((category, index) => (
                    <Picker.Item key={index} label={category.label} value={category.value} />
                ))}
            </Picker>
          </View>

      </View>
      <TouchableOpacity 
        disabled={loading}
        style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        marginTop: 20
      }}
      onPress={()=>onAddNewBusiness()}  
      >
        {loading?
        <ActivityIndicator
          color='#fff'
          size={'large'}
        />:
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            color: '#fff'
          }}>Add New Business</Text>}
      </TouchableOpacity>

      <View style={{
        height: 100
      }}>

      </View>

      
    </ScrollView>
    
  )
}