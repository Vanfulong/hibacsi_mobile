import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/reusable/reusable.style";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { HeightSpacer, ReusableText } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native";
const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
const Login = ({ navigation }) => {
  const { setAuthState } = useAuth();
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    setAuthState({ token: "", authenticated: true });
  };
  return (
    <SafeAreaView style={reusable.container}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => console.log(values)}
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
              <View>
                <ReusableText
                  text={"Dang Nhap"}
                  family={"bold"}
                  size={SIZES.xLarge}
                  color={COLORS.black}
                  align={"center"}
                />
              </View>
              <HeightSpacer height={30} />
              <View style={styles.containerInput}>
                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  error={!!errors.email}
                  autoCapitalize="none"
                  autoComplete="username"
                  textContentType="emailAddress"
                  underlineColor="transparent"
                  mode="outlined"
                  activeOutlineColor={COLORS.blue}
                />
                <Text style={styles.errorMessage}>{errors.email}</Text>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  label="Password"
                  returnKeyType="done"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={!!errors.password}
                  secureTextEntry={secure}
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
                />
                <Text style={styles.errorMessage}>{errors.password}</Text>
              </View>

              <HeightSpacer height={30} />

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
              >
                Press me
              </Button>
            </View>
          )}
        </Formik>
        <HeightSpacer height={30}/>
        <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
          <Text style={{}}>Ban chua co tai khoan?</Text>
          <TouchableWithoutFeedback onPress={()=> navigation.navigate('Register')}>
            <Text style={{marginLeft:10, color:COLORS.blue}}>Dang ki</Text>
          </TouchableWithoutFeedback>
        </View>
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
});
export default Login;
