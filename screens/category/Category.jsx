import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer, LoadingModal, ReusableText } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { StyleSheet } from "react-native";
import axiosClients from "../../helper/axiosClients";
import { MaterialIcons } from "@expo/vector-icons";

const Category = ({ navigation }) => {
  const categorys = [
    {
      id: 1,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "Chỉ số cân nặng",
    },
    {
      id: 2,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 3,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 4,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 5,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 6,
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await axiosClients.get("/categories/?limit=100");
      setData(results.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const iconBMI = require("../../assets/images/3373123.png");
  const iconTool = require("../../assets/images/medical-app.png");
  const iconSchedule = require("../../assets/images/schedule.png");

  return (
    <SafeAreaView style={reusable.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {loading ? <LoadingModal text={""} /> : ""}
        <View style={{ flex: 1, paddingBottom: 60 }}>
          <HeightSpacer height={SIZES.small} />
          <ReusableText
            text={"Công cụ"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AppointmentHistory")}
              >
                <View>
                  <View style={styles.containerImg}>
                    {/* <FontAwesome5
                  name="calendar-alt"
                  size={32}
                  color={COLORS.blue}
                /> */}
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={iconSchedule}
                    />
                  </View>
                  <Text style={styles.title}>Lịch sử đặt hẹn</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <HeightSpacer height={SIZES.small} />
          <ReusableText
            text={"Sức khỏe"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.navigate("Bmi")}>
                <View>
                  <View style={styles.containerImg}>
                    <Image style={{ width: 32, height: 32 }} source={iconBMI} />
                  </View>
                  <Text style={styles.title}>Tính chỉ số BMI</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <HeightSpacer height={SIZES.small} />
          <ReusableText
            text={"Chuyên mục"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {data.map((category) => (
              <View style={styles.container} key={category.id}>
                <TouchableOpacity onPress={() => navigation.navigate("CategoryDetail",{category:category})}>
                  <View>
                    <View style={styles.containerImg}>
                      {category.icon ? (
                        <Image
                          style={{ width: 32, height: 32 }}
                          src={category.icon}
                        />
                      ) : (
                        <MaterialIcons
                          name="category"
                          size={24}
                          color={COLORS.blue}
                        />
                      )}
                    </View>
                    <Text style={styles.title}>{category.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    width: "20%",
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
