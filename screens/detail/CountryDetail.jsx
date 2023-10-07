import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const CountryDetail = ({navigate}) => {
  const route = useRoute();
  const {item} = route.params;
  console.log(item);
  return (
    <View>
      <Text>CountryDetail</Text>
    </View>
  )
}

export default CountryDetail