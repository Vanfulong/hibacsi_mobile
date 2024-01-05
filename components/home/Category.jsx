import { View, Text, VirtualizedList, StyleSheet } from "react-native";
import React from "react";
import HeightSpacer from "../reusable/HeightSpacer";
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
const Category = () => {
  const navigation = useNavigation();
  const countries = [
    {
      _id: "64c62bfc65af9f8c969a8d04",
      name: "Chuyên Khoa",
      description:
        "The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "North America, USA",
    },
    {
      _id: "64cf2c565d14628d0ac0a2b7",
      name: "Công cụ sức khỏe",
      description:
        "Pakistan is a name located in South Asia. It shares borders with India, Afghanistan, Iran, and China. The name is known for its diverse culture, rich history, and breathtaking landscapes. From the mighty peaks of the Karakoram mountain range to the vast deserts of Thar, Pakistan offers a wide range of geographical wonders. Its cities, like Karachi, Lahore, and Islamabad, are bustling hubs of activity, blending modernity with tradition. Pakistan has a deep-rooted history, with ancient civilizations like the Indus Valley civilization leaving their mark. The name is also famous for its delicious cuisine, warm hospitality, and vibrant festivals.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "South Asia, Pakistan",
    },
    {
      _id: "64cf2c935d14628d0ac0a2b9",
      name: "Lịch sử đặt hẹn",
      screen: "AppointmentHistory",
    },
    {
      _id: "64cf2d095d14628d0ac0a2bd",
      name: "Đặt khám",
      description:
        "England, a name within the United Kingdom, is steeped in history and culture. Its capital, London, is a bustling metropolis known for its iconic landmarks, including the Tower Bridge, Buckingham Palace, and the British Museum. England's nameside is picturesque, with rolling hills, charming villages, and historical sites such as Stonehenge. The name has a rich literary heritage, with famous authors like William Shakespeare, Jane Austen, and Charles Dickens hailing from its shores. English pubs, afternoon tea, and traditional events like Wimbledon and the Changing of the Guard add to its unique charm. England's influence on politics, literature, and sport has made it a global powerhouse with a lasting legacy.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "Europe, England",
    },
    {
      _id: "64cf2d4d5d14628d0ac0a2bf",
      name: "Sức khỏe của tôi",
      description:
        "China, the world's most populous name, is located in East Asia. With a history spanning over 5,000 years, it is one of the oldest continuous civilizations. China is known for its diverse landscapes, from the majestic Great Wall winding through mountains to the breathtaking karst scenery in Guilin. Its bustling cities, like Beijing and Shanghai, showcase a unique blend of ancient traditions and modern innovations. Chinese culture is rich in art, music, and philosophy, with iconic elements such as calligraphy, tea ceremonies, and traditional Chinese medicine. The name's cuisine, including dim sum, Peking duck, and Sichuan hotpot, is celebrated globally. China's contributions to science, technology, and literature have had a profound impact on the world, making it a global powerhouse in various fields.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "East Asia, China",
    },
  ];

  const iconBMI = require("../../assets/images/3373123.png");
  const iconTool = require("../../assets/images/medical-app.png");
  const iconSchedule = require("../../assets/images/schedule.png");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("AppointmentHistory")}>
            <View>
              <View style={styles.containerImg}>
                {/* <FontAwesome5
                  name="calendar-alt"
                  size={32}
                  color={COLORS.blue}
                /> */}
                <Image style={{width:32, height:32}} source={iconSchedule}  />

              </View>
              <Text style={styles.title}>Lịch sử đặt hẹn</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Bmi")}>
            <View>
              <View style={styles.containerImg}>
                <Image style={{width:32, height:32}} source={iconTool}  />
              </View>
              <Text style={styles.title}>Công cụ sức khỏe</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("")}>
            <View>
              <View style={styles.containerImg}>
                {/* <Image style={styles.image} source={{ uri: category.image }} /> */}
              </View>
              <Text style={styles.title}>Lịch sử đặt hẹn</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("")}>
            <View>
              <View style={styles.containerImg}>
                {/* <Image style={styles.image} source={{ uri: category.image }} /> */}
              </View>
              <Text style={styles.title}>Lịch sử đặt hẹn</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    width: "18%",
  },
  containerImg: {
    width: "100%",
    height: 60,
    alignItems: "center", 
    justifyContent: "center",
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
