import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { Image } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
const CardCategory = ({ category }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View >
          <View style={styles.containerImg}>
            <Image style={styles.image} source={{ uri: category.url }} />
          </View>
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  container: {
    width: "18%",
    marginVertical: 10,
  },
  containerImg: {
    width: "100%",
    height: 70,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "100%",
    objectFit: "contain",
  },
  title: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    textAlign: "center",
  },
});
