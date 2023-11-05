import { View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../../constants/theme'
const SearchButton = () => {
  const navigation = useNavigation();
  return (
    <View >
          <Button
          title={"Tìm kiếm ..."}
          icon={{
            name: 'search',
            type: 'font-awesome',
            size: 15,
            color: '#888'
          }
          }
          titleStyle={{
            color:'#888',
            marginLeft:10,
            fontSize: SIZES.medium
          }}
          buttonStyle={{
            borderRadius:10,
            justifyContent: 'flex-start',
            backgroundColor: COLORS.lightBlue
          }}
          onPress={()=>navigation.navigate('Search')}
        
          />
    
    </View>
  )
}

export default SearchButton