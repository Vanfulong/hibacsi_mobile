import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
const CardHospital = ({ Hospital }) => {
  
  const navigation = useNavigation();
  let specialties = ""
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("HospitalDetail",{Hospital})}>
        <View style={styles.containerBody}>
          <View style={styles.containerImg}>
            <Image
              style={styles.imageHospital}
              source={{
                uri: "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
              }}
            />
          </View>
          <View>
            <Text style={styles.title}>{Hospital.name}</Text>
              
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Octicons name="location" size={13} color={COLORS.gray} />

              <Text style={styles.content}>{Hospital.address}</Text>
            </View>
          
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    </View>
  );
};

export default CardHospital;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    bottom: 5,
    right: 0,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    padding: 8,
  },
  containerBody: {
    flexDirection: "row",
    gap: 10,
    // marginBottom: 10,
  },
  imageHospital: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 10,
  },
  containerImg: {
    width: "20%",
    height: 60,
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
