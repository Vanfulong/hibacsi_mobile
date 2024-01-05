import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/reusable/reusable.style";
import { useState } from "react";
import { TextInput, Button, Appbar } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { HeightSpacer, LoadingModal, ReusableText } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native";
import axiosClients from "../../helper/axiosClients";
const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Vui lòng nhập mật khẩu"),
  newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
  repeatPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Required"),
});
const ChangePassword = ({ navigation }) => {
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const handleChangePassword = async(values) => {
    console.log(currentUser)
    setLoading(true)
    try {
      const result = await axiosClients.patch(`/accounts/${currentUser.id}/change_password`,{
        oldpassword : values.password,
        newpassword: values.newPassword
      })
      setLoading(false)
      if(result.error){
        setLoading(false) 
        Alert.alert("","Đổi mật khẩu thất bại. Vui lòng nhập đúng mật khẩu cũ")
  
      }
    } catch (error) {
      console.log(error)
      setLoading(false) 
        Alert.alert("","Đổi mật khẩu thất bại. Vui lòng nhập đúng mật khẩu cũ")
    }
    
  };
  return (
    <SafeAreaView style={{backgroundColor:'white', height:'100%'}}>
      {
        loading?<LoadingModal text={"Đổi mât khẩu ..."}/>:''
      }
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
        <Text>Đổi mật khẩu</Text>
      </Appbar.Header>
      
      <View style={{marginHorizontal:20}}>
        <Formik
          initialValues={{ password: "", newPassword : "", repeatPassword:"" }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values) => handleChangePassword(values)}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.containerInput}>
                <TextInput
                  label="Mật khẩu hiện tại"
                  returnKeyType="next"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={!!errors.password}
                  secureTextEntry={secure}
                  autoCapitalize="none"
                  underlineColor="transparent"
                  mode="outlined"
                  right={
                    <TextInput.Icon
                      icon="eye"
                      color={COLORS.blue}
                      onPress={() => setSecure((prev) => !prev)}
                    />
                  }
                  activeOutlineColor={COLORS.blue}
                  style={{
                    backgroundColor:'white',
                    borderColor:COLORS.lightGrey
                  }}
                  contentStyle={styles.text}
                />
                <Text style={styles.errorMessage}>{errors.password}</Text>
              </View>

              <View style={styles.containerInput}>
                <TextInput
                  label="Mật khẩu mới"
                  returnKeyType="next"
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  error={!!errors.newPassword}
                  autoCapitalize="none"
                  underlineColor="transparent"
                  mode="outlined"
                  activeOutlineColor={COLORS.blue}
                  style={{
                    backgroundColor:'white'
                  }}
                  contentStyle={styles.text}
                />
                <Text style={styles.errorMessage}>{errors.newPassword}</Text>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  label="Nhập lại mật khẩu"
                  returnKeyType="next"
                  value={values.repeatPassword}
                  onChangeText={handleChange("repeatPassword")}
                  error={!!errors.repeatPassword}
                  autoCapitalize="none"
                  underlineColor="transparent"
                  mode="outlined"
                  activeOutlineColor={COLORS.blue}
                  style={{
                    backgroundColor:'white'
                  }}
                  contentStyle={styles.text}
                />
                <Text style={styles.errorMessage}>{errors.repeatPassword}</Text>
              </View>
              <HeightSpacer height={30} />

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
              >
                <Text sty> Đổi mật khẩu </Text>
              </Button>
            </View>
          )}
        </Formik>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: SIZES.height,
    
  },
  containerInput: {
    marginVertical: 10,
  },
  button: {
    paddingVertical: 5,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
  },
  errorMessage: {
    color: COLORS.red,
  },
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
  text:{
    fontFamily:'regular',
    fontSize:SIZES.xmedium,
    color: COLORS.dark
  }
});

export default ChangePassword;
