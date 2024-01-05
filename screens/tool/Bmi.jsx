import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Avatar, Divider, TextInput } from "react-native-paper";
import { HeightSpacer, RowSetting } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import SegmentedProgressBar from "../../helper/index";
const Bmi = ({ navigation }) => {
  const [activeGender, setActiveGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmiResult, setBmiResult] = useState({ bmi: "", result: "" });
  const validateForm = () => {
    if (!age || !height || !weight || !activeGender) {
      Alert.alert("", "Vui lòng nhập đủ các trường");
    } else {
      countBmi();
    }
  };
  const countBmi = () => {
    const bmi = (parseFloat(weight) / (parseFloat(height) / 100) ** 2).toFixed(
      2
    );

    let result = "";
    if (bmi < 18.5) {
      result = "Nhẹ cân";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Cân nặng bình thường";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Thừa cân";
    } else if (bmi >= 30 && bmi <= 34.9) {
      result = "Béo phì độ I";
    } else if (bmi >= 35) {
      result = "Béo phì độ II";
    }

    // Set the BMI result
    setBmiResult({ bmi, result });

    // Reset the form
    setAge("");
    setHeight("");
    setWeight("");
    setActiveGender("");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
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
        <Text style={styles.title}>Công cụ tính chỉ số BMI</Text>
      </Appbar.Header>
      <HeightSpacer height={0} />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <Text style={{ fontFamily: "medium", fontSize: SIZES.xmedium }}>
            Giới tính
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableWithoutFeedback onPress={() => setActiveGender("Nam")}>
              <View
                style={[
                  styles.cardGender,
                  activeGender == "Nam" ? styles.cardGenderActive : "",
                ]}
              >
                <Text
                  style={[
                    styles.textGender,
                    activeGender == "Nam" ? styles.textGenderActive : "",
                  ]}
                >
                  Nam
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => setActiveGender("Nu")}>
              <View
                style={[
                  styles.cardGender,
                  activeGender == "Nu" ? styles.cardGenderActive : "",
                ]}
              >
                <Text
                  style={[
                    styles.textGender,
                    activeGender == "Nu" ? styles.textGenderActive : "",
                  ]}
                >
                  Nữ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <HeightSpacer height={20} />
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <Text style={{ fontFamily: "medium", fontSize: SIZES.xmedium }}>
            Chiều cao ( cm )
          </Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            value={height}
            autoCapitalize="none"
            underlineColor="transparent"
            activeOutlineColor={COLORS.blue}
            activeUnderlineColor={COLORS.blue}
            outlineColor={COLORS.lightGrey}
            contentStyle={styles.text}
            onChangeText={(text) => setHeight(text)}
          />
        </View>
        <HeightSpacer height={20} />

        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <Text style={{ fontFamily: "medium", fontSize: SIZES.xmedium }}>
            Trọng lượng ( kg )
          </Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            value={weight}
            autoCapitalize="none"
            underlineColor="transparent"
            activeOutlineColor={COLORS.blue}
            activeUnderlineColor={COLORS.blue}
            outlineColor={COLORS.lightGrey}
            contentStyle={styles.text}
            onChangeText={(text) => setWeight(text)}
          />
        </View>
        <HeightSpacer height={20} />

        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <Text style={{ fontFamily: "medium", fontSize: SIZES.xmedium }}>
            Tuổi
          </Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            value={age}
            autoCapitalize="none"
            underlineColor="transparent"
            activeOutlineColor={COLORS.blue}
            activeUnderlineColor={COLORS.blue}
            outlineColor={COLORS.lightGrey}
            contentStyle={styles.text}
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <HeightSpacer height={20} />
        <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
          <Text style={styles.submitButtonText}>Tính chỉ số BMI</Text>
        </TouchableOpacity>
        <HeightSpacer height={20} />
        {bmiResult.bmi ? (
          <View style={{ marginHorizontal: 20, gap: 10 }}>
            <Text style={{ fontFamily: "medium", fontSize: SIZES.medium }}>
              Kết quả
            </Text>
            <SegmentedProgressBar
              showSeparatorValue
              borderRadius={3}
              values={[0, 18.5, 23.0, 27.5, 40]}
              colors={["grey", "green", "orange", "red"]}
              labels={["underweight", "normal", "overweight", "obese"]}
              position={bmiResult.bmi}
            />
            <Text style={styles.textResult}>BMI : {bmiResult.bmi}</Text>
            <Text style={styles.textResult}>Dự đoán : {bmiResult.result}</Text>
            <HeightSpacer height={150} />
          </View>
        ) : (
          ""
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bmi;
const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    borderWidth: 0.3,
    borderColor: COLORS.lightGrey,
  },
  containerHeader: {
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.dark,
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
  cardGender: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.3,
    borderRadius: 10,
  },
  textGender: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
  },
  cardGenderActive: {
    backgroundColor: COLORS.lightBlue,
  },
  textGenderActive: {
    color: COLORS.blue,
  },
  text: {
    color: COLORS.dark,
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
  },
  submitButton: {
    backgroundColor: COLORS.blue,
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
  },
  textResult: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
    color: COLORS.dark,
  },
});
