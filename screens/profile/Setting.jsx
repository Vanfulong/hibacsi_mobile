import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Avatar, Divider } from 'react-native-paper'
import { HeightSpacer, RowSetting } from '../../components'
import { COLORS, SIZES } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
const Setting = ({navigation}) => {
  const { onLogout } = useAuth()
  return (
    <SafeAreaView>
       <Appbar.Header
        style={{
          zIndex: 99,
          backgroundColor: "transparent",
        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}
          size={20}
        />
        {/* <Text style={styles.title}>Hồ sơ</Text> */}
      </Appbar.Header>
      <HeightSpacer height={0}/>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal:20}}>

        <RowSetting icon={'lock'} text={'Đổi mật khẩu'} navigationTo={'ChangePassword'}/>
        <Divider/>
        <RowSetting icon={'logout'} text={'Đăng xuất'} onPress={()=>onLogout()} />
        <Divider/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Setting
const styles = StyleSheet.create({
  containerHeader:{
    paddingTop:80,
    alignItems:'center',
    justifyContent:'center'
  },
  name:{
    fontFamily:'medium',
    fontSize:SIZES.medium,
    color: COLORS.dark
  },
  backIcon: {
    // backgroundColor: COLORS.white,
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  title: {
    fontSize: SIZES.xmedium + 2,
    fontFamily: "regular",
    color: COLORS.dark,
  },
})