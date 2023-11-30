import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Divider } from 'react-native-paper'
import { HeightSpacer, RowSetting } from '../../components'
import { COLORS, SIZES } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
const Profile = () => {
  const { onLogout } = useAuth()
  return (
    <SafeAreaView>
      <View style={styles.containerHeader}>
        <Avatar.Text size={80} label="XD" />
        <HeightSpacer height={20}/>
        <Text style={styles.name}>Văn Phú Long</Text>
      </View>
      <HeightSpacer height={30}/>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal:20}}>

        <RowSetting icon={'user'} text={'Thông tin tài khoản'} navigationTo={'ProfileDetail'}/>
        <Divider/>
        <RowSetting icon={'setting'} text={'Cài đặt'} navigationTo={'ProfileDetail'}/>
        <Divider/>
        <RowSetting icon={'infocirlceo'} text={'Trung tâm trợ giúp'} navigationTo={'ProfileDetail'}/>
        <Divider/>
        <RowSetting icon={'lock'} text={'Chính sách bảo mật'} navigationTo={'ProfileDetail'}/>
        <Divider/>
        <RowSetting icon={'logout'} text={'Đăng xuất'} onPress={()=>onLogout()} />
        <Divider/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
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
  }
})