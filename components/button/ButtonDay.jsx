import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { TouchableWithoutFeedback } from 'react-native'

const ButtonDay = ({item, setDay, active}) => {
  if(!active.id){
    active = {
      id: 999
    }
  }
  return (
    <TouchableWithoutFeedback onPress={()=>setDay(item)}>
      <View style={[styles.container, active.id==item.id?styles.active:'']}>
        <Text style={[styles.text,active.id==item.id?{color:COLORS.white}:{color:COLORS.dark}]}>{item.daysOfWeek}</Text>
        <Text style={[styles.day,active.id==item.id?{color:COLORS.white}:{color:COLORS.dark}]}>{item.day}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ButtonDay

const styles = StyleSheet.create({
    container:{
        borderColor: COLORS.dark,
        borderWidth: 0.3,
        paddingHorizontal:25,
        paddingVertical:5,
        alignItems:'center',
        borderRadius:30
    },
    text:{
        fontFamily:'regular',
        fontSize: SIZES.small
    },
    day:{
      fontFamily:'bold',
      fontSize: SIZES.xmedium
    },
    active:{
      backgroundColor:COLORS.blue,
      borderWidth:0
    },

})