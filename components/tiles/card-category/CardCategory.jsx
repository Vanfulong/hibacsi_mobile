import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../../constants/theme";
import ReusableText from "../../reusable/ReusableText";
import NetworkImage from "../../reusable/NetworkImage";
import HeightSpacer from "../../reusable/HeightSpacer";
import { useNavigation } from "@react-navigation/native";
const Country = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('CountryDetail',item)}>
      <View>
        <NetworkImage
        source={item.imageUrl}
        borderRadius={12}
        width={60}
        height={60}
        />
        <HeightSpacer height={10}/>
        <ReusableText
          text={item.country}
          family={"medium"}
          size={SIZES.small }
          color={COLORS.black}
          align={"center"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Country;
