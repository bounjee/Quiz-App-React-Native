import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Title from '../components/title'




const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Title titleText="Home"/>
        <View style={styles.bannerContainer}>
        <Image source={require('../assets/quiz.png')}
        style={styles.banner}
        resizeMode='contain'
        />

        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    banner:{
        height:300,
        width:300,
    },
    bannerContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    container:{
        paddingTop:40,
        paddingHorizontal:20,
        height:'100%'
    },
    button:{
        width:'100%',
        backgroundColor: '#004E98',
        padding:16,
        borderRadius:4,
        alignItems: 'center',
        marginBottom:25
    },
    buttonText:{
        fontSize:20,
        fontWeight: '500',
        color: '#EBEBEB'
    }
})