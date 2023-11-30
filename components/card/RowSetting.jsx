import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../context/AuthContext';
const RowSetting = ({icon, text, navigationTo,onPress}) => {
    const {navigate} = useNavigation()
    const {onLogout} = useAuth()
  return (
    <TouchableWithoutFeedback onPress={()=>{
        if(onPress){
            onPress();
        }
        navigate(navigationTo?navigationTo:'Home')
    }}>
        <View style={styles.container}>
            <View style={styles.leftBlock}>
            <AntDesign name={icon?icon:'user'} size={18} color={COLORS.blue} />
                <Text style={styles.text}>{text?text:'Mac dinh'}</Text>
            </View>
        <AntDesign name="right" size={18} color={COLORS.blue} />
        </View>
    </TouchableWithoutFeedback>
  )
}

export default RowSetting

const styles = StyleSheet.create({
    container:{
        // paddingHorizontal:20,
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text:{
        fontFamily:'regular',
        fontSize:SIZES.xmedium,
        color: COLORS.dark
    },
    leftBlock:{
        flexDirection:'row',
        gap:8,
        alignItems:'center'
    }
})