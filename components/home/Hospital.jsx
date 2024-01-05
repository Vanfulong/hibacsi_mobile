import { View, Text, VirtualizedList, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CardHospital from "../card/CardHospital";
import HeightSpacer from "../reusable/HeightSpacer";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import ReusableText from "../reusable/ReusableText";
import { Button, Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import axiosClients from "../../helper/axiosClients";
const Hospital = ({listHospital}) => {
  
  return (
    <View>
      <HeightSpacer height={SIZES.xLarge} />
      <ReusableText
        text={"Bệnh viện nổi bật"}
        family={"bold"}
        size={SIZES.medium}
        color={COLORS.black}
      />
      {
        listHospital.length==0?'':listHospital.map((Hospital) => (
          <View key={Hospital.id} style={styles.container}>
            <CardHospital Hospital={Hospital} />
          </View>
        ))
      }
      
    </View>
  );
};

export default Hospital;
const styles = StyleSheet.create({
  
});
