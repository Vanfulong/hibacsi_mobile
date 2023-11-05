import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { Rating, AirbnbRating } from 'react-native-ratings';
const CardDoctor = ({ doctor }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBody}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imageDoctor}
            source={{
              uri: doctor.image,
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>{doctor.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <FontAwesome5
              name="briefcase-medical"
              size={12}
              color={COLORS.gray}
            />
            <Text style={styles.content}>Khoa nhi</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Octicons name="location" size={13} color={COLORS.gray} />

            <Text style={styles.content}>Bệnh viện AAAAA</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <FontAwesome5 name="money-bill" size={13} color={COLORS.blue} />

            <Text style={styles.content}>500.000 đ</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center" , gap:6}}>
            
          <Rating
            type='star'
            ratingCount={5}
            imageSize={16}
            readonly
            startingValue={3.5}
            
          />
          <Text style={{fontSize:13, fontFamily:'bold'}}>4.0</Text>
          </View>
        </View>
      </View>
      <Button
        mode="contained"
        style={{
          backgroundColor: "#dbeafe",
          borderRadius: 5,
        }}
        onPress={() => console.log("Pressed")}
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
