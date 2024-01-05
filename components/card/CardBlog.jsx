import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Image } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { useNavigation } from "@react-navigation/native";

const CardBlog = ({ url, title, category, time, content }) => {
  const navigation = useNavigation(); 
  const [image, setImage] = useState(url)

  const handleImageErr = () => {
    setImage(
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
    );
  };
  return (
    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Blog",{blog:content})}>
      <View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imageDoctor}
            source={{
              uri: image,
            }}
            onError={()=>{
              setImage("https://i1-vnexpress.vnecdn.net/2023/10/31/hoi-nghi-trung-uong-8-16987570-8842-1792-1698760747.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=Z1cd68fhorr5PqmVzKtD8A")
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
            {category.name}
          </Text>
          <Text numberOfLines={2} style={{ fontSize: SIZES.medium - 2, fontFamily: "medium" }}>
            {title}
          </Text>
          <Text style={{ fontSize: SIZES.small, color: COLORS.dark }}>
            {time}
          </Text>
        </View>
      </View>
      <HeightSpacer height={15}/>
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#757575", opacity:0.3 }}
      />
      <HeightSpacer height={15}/>
      </View>
      

    </TouchableWithoutFeedback>
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
