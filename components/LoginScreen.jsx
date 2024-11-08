import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '@/hooks/useWarmupBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google'});

    const onPress =  React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = 

            await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {

            }
        }catch(err) {
            console.error("OAuth error ", err)
        }
    }, [])

 
  return (
    <View>
        <View
        style={{  
            alignItems: 'center',
            marginTop: 60,
        }}
    >
            <Image source={require('../assets/images/login.png')} style={{
                    width: 220,
                    height: 400,
                    borderRadius: 20,
                    borderWidth: 6,
                    borderColor: '#000'
            }}/>
        </View>

        <View style={styles.subcontainer}>
            <Text style={{
                fontSize: 30, 
                fontFamily: 'outfit-bold',
                textAlign: 'center'
            }}>Your Ultimate <Text style={{
                color: Colors.PRIMARY
            }}>Community Business Directory </Text>App</Text>

            <Text
                style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY
                }}
            >Find your favorite business near you and post your own business to your community</Text>

            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={{textAlign: 'center', color: '#fff', fontFamily: 'outfit'}}>Let's get started</Text>
            </TouchableOpacity>
        </View>
    </View>
    
  )
}


const styles = StyleSheet.create({
    subcontainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -60
    },

    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99
    }

})