import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
const CardDoctor = ({ doctor }) => {
  
  const [image, setImage] = useState(doctor.account.avatar)
  const navigation = useNavigation();
  let specialties = ""
  if(doctor.specialties.length > 1){
    
     specialties = doctor.specialties.map(function(specialty) {
      return specialty.specialty.name;
  }).join(', ')
  }
  else{
    if(doctor.specialties.length == 1){
      specialties = doctor.specialties[0].specialty.name
    }else{
      specialties = ''
    }
  }
  const handleImageErr = () => {
    console.log("first");
    setImage(
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
    );
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("DoctorDetail",{doctor})}>
        <View style={styles.containerBody}>
          <View style={styles.containerImg}>
            <Image
              style={styles.imageDoctor}
              source={{
                uri: image,
              }}
              onError={(event)=>handleImageErr(event)}
            />
          </View>
          <View style={{width:"70%"}}>
            <Text style={styles.title}>{doctor.name}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4, maxWidth:'90%'}}
            >
              <FontAwesome5
                name="briefcase-medical"
                size={12}
                color={COLORS.gray}
              />

              <Text style={styles.content}>{specialties}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 ,maxWidth:'90%' }}
            >
              <Octicons name="location" size={13} color={COLORS.gray} />

              <Text style={styles.content}>{doctor.hospital.name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <FontAwesome5 name="money-bill" size={13} color={COLORS.blue} />

              <Text style={styles.content}>{parseFloat(doctor.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Rating
                type="star"
                ratingCount={5}
                imageSize={16}
                readonly
                startingValue={doctor.rating}
              />
              <Text style={{ fontSize: 13, fontFamily: "bold" }}>{doctor.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Button
        mode="contained"
        style={{
          backgroundColor: "#dbeafe",
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate("Appointment",{doctor})}
      >
        <Text
          style={{
            color: COLORS.blue,
            fontFamily: "bold",
            fontSize: SIZES.xmedium,
          }}
        >
          Đặt lịch hẹn
        </Text>
      </Button>
    </View>
  );
};

export default CardDoctor;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    bottom: 5,
    right: 0,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    padding: 15,
  },
  containerBody: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  imageDoctor: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 10,
  },
  containerImg: {
    width: "30%",
    height: 100,
  },
  title: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
  },
  content: {
    textAlign: "left",
    color: COLORS.gray,
    fontSize: 13,
    
  },
});
