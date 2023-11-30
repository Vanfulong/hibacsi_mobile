import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableWithoutFeedback } from "react-native";
import convertToShortTimeFormat from "../../helper/formatTime";

const ButtonTime = ({ item, setTime, active }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setTime(item.id)}>
      <View style={[styles.container,active == item.id ? styles.active:'' ]}>
        <Text style={[styles.text,active==item.id?{color:COLORS.white}:{color:COLORS.dark}]}>
          {convertToShortTimeFormat(item.start)} -{" "}
          {convertToShortTimeFormat(item.end)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonTime;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.dark,
    borderWidth: 0.3,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    fontFamily: "regular",
    color: COLORS.dark,
    fontSize: SIZES.xmedium,
  },
  active:{
    backgroundColor:COLORS.blue,
    borderWidth:0
  },
});
