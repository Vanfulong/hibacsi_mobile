import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import { Image } from "react-native";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import HeightSpacer from "../reusable/HeightSpacer";

const CardAppointment = ({ appointment, status, action }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          {appointment.date} - {appointment.schedule_doctor["schedule"].start}
        </Text>
      </View>
      <Divider />
      <HeightSpacer height={10} />
      <View style={styles.containerBody}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imageDoctor}
            source={{
              uri: "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>sjlkfs</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <FontAwesome5
              name="briefcase-medical"
              size={12}
              color={COLORS.gray}
            />

            <Text style={styles.content}>sdfsafsa</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Octicons name="location" size={13} color={COLORS.gray} />

            <Text style={styles.content}>name ne</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <FontAwesome5 name="money-bill" size={13} color={COLORS.blue} />

            <Text style={styles.content}>10000</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={16}
              readonly
              startingValue={3}
            />
            <Text style={{ fontSize: 13, fontFamily: "bold" }}>4</Text>
          </View>
        </View>
      </View>

      {status == "not_confirm" ? (
        <View>
          <Divider />
        <View style={{ alignItems: "flex-end" }}>
          
          <HeightSpacer height={10} />
          <TouchableWithoutFeedback onPress={()=>action(appointment)}>
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 8,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 0.3,
                borderColor: COLORS.lightGrey,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontFamily: "regular", fontSize: SIZES.xmedium }}>
                Hủy
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default CardAppointment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: COLORS.lightGrey,
  },
  header: {
    paddingBottom: 15,
  },
  textHeader: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
  },
  body: {},
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
