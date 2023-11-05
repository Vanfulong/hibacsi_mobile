import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer, ReusableText } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import CardCategory from "../../components/card/CardCategory";

const Category = () => {
  const categorys = [
    {
      id: 1,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "Chỉ số cân nặng",
    },
    {
      id: 2,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 3,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 4,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 5,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
    {
      id: 6,
      url: "https://www.satdl.com/uploads/product-category/15921324768095.png",
      name: "category",
    },
  ];

  return (
    <SafeAreaView style={reusable.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingBottom: 60 }}>
          <HeightSpacer height={SIZES.small} />
          <ReusableText
            text={"Công cụ sức khỏe"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <View style={{flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
            {categorys.map((category) => (
             
                <CardCategory key={category.id} category={category} />
           
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
