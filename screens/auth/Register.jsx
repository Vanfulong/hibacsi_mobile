import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/reusable/reusable.style";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { HeightSpacer, LoadingModal, ReusableText } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native";
import axiosClients from "../../helper/axiosClients";
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().min(2, "Too Short").required("Requi"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
const Login = ({ navigation }) => {
  const { onRegister } = useAuth();
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      await axiosClients.post("/auth/register/user/", {
        email: values.email,
        password: values.password,
        username: values.username,
      }).then(()=>{
      setLoading(false);
      navigation.navigate("Login");

      }).catch((err)=>{
      setLoading(false);

        console.log(err)
      })


    } catch (error) {
      console.log(error)
      setLoading(false);
      Alert.alert("", "Đăng kí tài khoản thất bại. Vui lòng thử lại");
    }
  };
  return (
    <SafeAreaView style={reusable.container}>
      {loading ? <LoadingModal /> : ""}
      <View style={styles.container}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleRegister(values)}
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
              <View>
                <ReusableText
                  text={"Đăng kí"}
                  family={"bold"}
                  size={SIZES.xLarge}
                  color={COLORS.black}
                  align={"center"}
                />
              </View>
              <HeightSpacer height={30} />
              <View style={styles.containerInput}>
                <TextInput
                  label="Tên tài khoản"
                  returnKeyType="next"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  error={!!errors.username}
                  autoCapitalize="none"
                  autoComplete="username"
                  underlineColor="transparent"
                  mode="outlined"
                  activeOutlineColor={COLORS.blue}
                  style={{
                    backgroundColor: "white",
                  }}
                />
                <Text style={styles.errorMessage}>{errors.username}</Text>
              </View>
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
                  style={{
                    backgroundColor: "white",
                  }}
                />
                <Text style={styles.errorMessage}>{errors.email}</Text>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  label="Mật khẩu"
                  returnKeyType="next"
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
                  style={{
                    backgroundColor: "white",
                  }}
                />
                <Text style={styles.errorMessage}>{errors.password}</Text>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  label="Nhập lại mật khẩu"
                  returnKeyType="done"
                  value={values.repeatPassword}
                  onChangeText={handleChange("repeatPassword")}
                  error={!!errors.repeatPassword}
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
                  style={{
                    backgroundColor: "white",
                  }}
                />
                <Text style={styles.errorMessage}>{errors.repeatPassword}</Text>
              </View>
              <HeightSpacer height={30} />

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
              >
                Đăng kí
              </Button>
            </View>
          )}
        </Formik>
        <HeightSpacer height={30} />
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{}}>Đã có tài khoản?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ marginLeft: 10, color: COLORS.blue }}>
              Đăng nhập
            </Text>
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
    marginVertical: 3,
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
