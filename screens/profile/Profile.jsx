import { View, Text, StyleSheet, ScrollView ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Divider } from 'react-native-paper'
import { HeightSpacer, RowSetting } from '../../components'
import { COLORS, SIZES } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
import { API_URL } from '@env';

const Profile = () => {
  const { onLogout, currentUser } = useAuth()
  return (
    <SafeAreaView>
      <View style={styles.containerHeader}>
        {
           currentUser.account.avatar?
           <Image style={{ width: 130, height: 130 , borderRadius:80}} src={`${API_URL}${currentUser.account.avatar}`} />
             :
             <Avatar.Text size={80} label="XD" />
        }
        <HeightSpacer height={20}/>
        <Text style={styles.name}>{currentUser.name}</Text>
      </View>
      <HeightSpacer height={30}/>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal:20}}>

        <RowSetting icon={'user'} text={'Thông tin tài khoản'} navigationTo={'ProfileDetail'}/>
        <Divider/>
        <RowSetting icon={'setting'} text={'Cài đặt'} navigationTo={'Setting'}/>
        <Divider/>
        <RowSetting icon={'infocirlceo'} text={'Trung tâm trợ giúp'} navigationTo={'PrivacyPolicy'}/>
        <Divider/>
        <RowSetting icon={'lock'} text={'Chính sách bảo mật'} navigationTo={'PrivacyPolicy'}/>
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