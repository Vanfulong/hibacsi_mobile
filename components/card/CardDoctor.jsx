import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { COLORS, SIZES } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import ReusableText from "../reusable/ReusableText";
import WitdhSpacer from "../reusable/WitdhSpacer";
import { FontAwesome5 } from '@expo/vector-icons';
const CardDoctor = ({ doctor }) => {
  return (
    <View style={{ marginLeft: -12 }}>
      <Card containerStyle={{ borderRadius: 10, width: 140 }}>
        <View style={{ position: "relative" }}>
          <Card.Image
            style={styles.imageDoctor}
            source={{
              uri: doctor.image,
            }}
          />
          <View style={styles.rating}>
            <AntDesign name="star" size={15} color="#FBC334" />
            <WitdhSpacer width={3} />
            <ReusableText
              text={"4.4"}
              family={"bold"}
              size={SIZES.small}
              color={COLORS.black}
            />
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
        <FontAwesome5 name="briefcase-medical" size={12} color={COLORS.lightGrey} />
        <Text style={{ textAlign: "left", color:COLORS.lightGrey }}>Khoa nhi</Text>
        </View>
        <Text style={{ textAlign: "left", fontFamily:'medium' }}>{doctor.name}</Text>
      </Card>
    </View>
  );
};

export default CardDoctor;

const styles = StyleSheet.create({
  rating: {
    position: "absolute",
    flexDirection: "row",
    width: 50,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 14,
    bottom: 5,
    right: 0,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
  },
  imageDoctor: {
    padding: 0,
    width: "100%",
    height: 130,
    resizeMode: "cover",
  },
});
