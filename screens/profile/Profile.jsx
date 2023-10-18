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
const Profile = () => {
  const { setAuthState } = useAuth();
  return (
    <>
      <Appbar.Header style={{ position: "absolute", zIndex:99, backgroundColor: 'transparent', marginTop:20}} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => {console.log('first')}} style={styles.backIcon} size={20} />
        <Text style={styles.title}>Hồ sơ</Text>
      </Appbar.Header>
      <View style={styles.bannerProfile}>
        <Avatar.Text size={80} label="XD" />
      </View>
      <View style={reusable.container}>
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
          style={{ marginVertical: 30 }}
          mode="contained"
          onPress={() => setAuthState({ token: "", authenticated: false })}
        >
          Logout
        </Button>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  bannerProfile: {
    borderRadius: 30,
    height: SIZES.height / 2.5,
    backgroundColor: COLORS.blue,
    width: SIZES.width,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: 'medium'
  },
  backIcon:{
    backgroundColor: COLORS.white,
    borderRadius:10,
    marginLeft:20,
    marginRight:10
  }
});
