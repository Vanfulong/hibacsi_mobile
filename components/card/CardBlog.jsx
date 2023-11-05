import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Image } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";

const CardBlog = ({ url }) => {
  return (
    <>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imageDoctor}
            source={{
              uri: url,
            }}
          />
        </View>
        <View style={{ justifyContent: "space-between", maxWidth: "75%" }}>
          <Text
            style={{
              fontSize: SIZES.small,
              color: COLORS.blue,
              fontFamily: "medium",
            }}
          >
            Chuyên mục
          </Text>
          <Text numberOfLines={2} style={{ fontSize: SIZES.medium - 2, fontFamily: "medium" }}>
            'Yêu cầu Bộ Giáo dục soạn SGK là đi ngược xu hướng quốc tế'
          </Text>
          <Text style={{ fontSize: SIZES.small, color: COLORS.dark }}>
            1 phút trước
          </Text>
        </View>
      </View>
      <HeightSpacer height={15}/>
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#757575", opacity:0.3 }}
      />
      <HeightSpacer height={15}/>

    </>
  );
};

export default CardBlog;

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
    width: "20%",
    height: 75,
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
