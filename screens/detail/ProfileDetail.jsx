import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Appbar, Avatar, Button, TextInput } from "react-native-paper";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer } from "../../components";
const ProfileDetail = ({navigation}) => {
  const { onLogout } = useAuth();
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ position: "absolute", zIndex:99, backgroundColor: 'transparent', marginTop:20}} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.backIcon} size={16} />
        <Text style={styles.title}>Hồ sơ</Text>
      </Appbar.Header>
      <View style={styles.bannerProfile}>
        <Avatar.Text size={80} label="XD" />
      </View>
      {/* <HeightSpacer height={10}/> */}
      <View style={styles.containerBody}>
        <TextInput
          style={styles.input}
          label="Ho Va Ten"
          returnKeyType="next"
          value={"Van Phu Long"}
          autoCapitalize="none"
          underlineColor="transparent"
          activeOutlineColor={COLORS.blue}
          outlineColor={COLORS.lightGrey}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="So dien thoai"
          mode="outlined"
          value="0935080640"
          outlineColor={COLORS.lightGrey}
          left={<TextInput.Affix text="+84" />}
        />
        <TextInput
          style={styles.input}
          label="Ngay sinh"
          mode="outlined"
          value="06/11/2002"
          disabled
          outlineColor={COLORS.lightGrey}
          right={<TextInput.Icon icon={"calendar"} color={COLORS.blue} />}
        />
        <Button
          style={{ marginVertical: 30, backgroundColor:COLORS.blue }}
          mode="contained"
          onPress={() => console.log('save')}
          labelStyle={{
            fontFamily:'medium',
            fontSize:SIZES.xmedium
          }}
        >
          Cập nhật thông tin
        </Button>
      </View>
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: 'white',
    fontFamily:'regular',
    fontSize:SIZES.xmedium
  },
  bannerProfile: {
    // borderRadius: 30,
    height: SIZES.height / 2.5,
    // backgroundColor: COLORS.blue,
    width: SIZES.width,
    // marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    backgroundColor: 'white',
    height:'100%'
  },
  containerBody:{
    paddingHorizontal:20
  },
  title:{
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: 'medium'
  },
  backIcon:{
    // backgroundColor: COLORS.white,
    borderRadius:50,
    marginLeft:20,
    marginRight:10,
    borderColor:COLORS.gray,
    borderWidth:0.3
  }
});
