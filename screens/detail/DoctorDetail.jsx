import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Appbar, Avatar } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import { HeightSpacer } from "../../components";
import { Rating } from "react-native-ratings";
import { Image } from "react-native";
const DoctorDetail = ({ navigation, route }) => {
  const data = route.params.doctor;
  const [image, setImage] = useState(data.account.avatar || "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg")

  let specialties;
  if (data.specialties.length > 1) {
    specialties = data.specialties.map(function (specialty) {
      return specialty.specialty.name;
    });
  } else {
    specialties = [data.specialties[0].specialty.name];
  }
  const handleImageErr = () => {
    console.log("first");
    setImage(
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
    );
  };
  return (
    <>
      <Appbar.Header
        style={{
          position: "absolute",
          zIndex: 99,
          backgroundColor: "transparent",
          marginTop: 20,
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
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.background} />
        <View style={styles.avatar}>
          {/* <Avatar.Text size={120} label="XD" /> */}
          <Image
            style={{ width: 130, height: 130, borderRadius: 80 }}
            onError={(event) => handleImageErr(event)}
            src={image}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: -30 }}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={{ flexDirection: "row", gap: 10, flexWrap:'wrap', marginHorizontal:20, alignItems:'center', justifyContent:'center' }}>
            {specialties.map((specialty) => (
              <View style={styles.bSpec} key={specialty}>
                <Text style={styles.bSpecText}>{specialty}</Text>
              </View>
            ))}
          </View>
          <HeightSpacer height={10} />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textCus}>Đánh giá: </Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={20}
              readonly
              startingValue={data.rating}
              style={{ backgroundColor: "transparent" }}
            />
          </View>
        </View>
        <View style={[styles.container, { marginTop: 20, width:"100%-80" }]}>
          <Text style={styles.title}>Thông tin bác sĩ</Text>
          <HeightSpacer height={10} />
          <Text style={styles.description}>{data.describe}</Text>
          <HeightSpacer height={5} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="work" size={16} color={COLORS.gray} />
            <Text style={styles.description}>
              Kinh nghiệm làm việc: {data.years_of_experience} năm
            </Text>
          </View>
          <HeightSpacer height={5} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="attach-money" size={16} color={COLORS.green} />
            <Text style={styles.description}>
              Phí tham khám cố định:{" "}
              {parseFloat(data.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <HeightSpacer height={15} />
          <Text style={styles.title}>Thông tin bệnh viện</Text>
          <HeightSpacer height={5} />
          <View style={{width:"100%"}}>
            <Text style={styles.description}>{data.hospital.info}</Text>
            <HeightSpacer height={5} />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialIcons name="info" size={14} color={COLORS.gray} />
              <Text style={styles.description}>
                Tên bệnh viện : {data.hospital.name}
              </Text>
            </View>
            <HeightSpacer height={5} />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10, width:"90%" }}
            >
              <MaterialIcons
                name="location-pin"
                size={14}
                color={COLORS.gray}
              />
              <Text style={styles.description}>
                Địa chỉ : {data.hospital.address}
              </Text>
            </View>
          </View>
        </View>
        <HeightSpacer height={100} />
      </ScrollView>
      <View style={styles.containerBut}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Appointment", { doctor: data })}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: COLORS.blue,
              width: "80%",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: SIZES.medium,
                color: COLORS.white,
              }}
            >
              Đặt lịch hẹn
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default DoctorDetail;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  background: {
    backgroundColor: COLORS.lightBlue,
    width: "100%",
    height: 200,
  },
  avatar: {
    bottom: 60,
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.dark,
  },
  title: {
    fontSize: SIZES.xmedium + 2,
    fontFamily: "bold",
    color: COLORS.blue,
  },
  description: {
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
    textAlign: "justify",
    lineHeight: 20,
  },
  bSpec: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
  },
  bSpecText: {
    color: COLORS.blue,
    fontSize: SIZES.xmedium,
    fontFamily: "medium",
  },
  textCus: {
    fontSize: SIZES.xmedium,
    fontFamily: "medium",
    color: COLORS.dark,
  },
  containerBut: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    backgroundColor: "white",
  },
});
