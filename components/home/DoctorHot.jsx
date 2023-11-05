import { View, Text, VirtualizedList, FlatList } from "react-native";
import React from "react";
import CardDoctor from "../card/CardDoctor";
import HeightSpacer from "../reusable/HeightSpacer";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import ReusableText from "../reusable/ReusableText";
import { Button, Card } from "react-native-paper";
import { StyleSheet } from "react-native";
const DoctorHot = () => {
  const doctorHot = [
    {
      id: 1,
      name: "Nguyễn Văn Aa",
      image:
        "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    },
    {
      id: 2,
      name: "Nguyễn Văn Aa",
      image:
        "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    },
    {
      id: 3,
      name: "Nguyễn Văn Aa",
      image:
        "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    },
  ];
  return (
    <View>
      <HeightSpacer height={SIZES.xLarge} />
      <ReusableText
        text={"Bác sĩ nổi bật"}
        family={"bold"}
        size={SIZES.medium}
        color={COLORS.black}
      />
      {/* <FlatList
          data={doctorHot}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          // getItemCount={(data) => data.length}
          // getItem={(data, index) => data[index]}
          renderItem={({ item, index }) => (
            <View>
              <CardDoctor doctor={item} />
            </View>
          )}
          style={{padding:0}}
        /> */}
      {doctorHot.map((doctor) => (
        <View key={doctor.id} style={styles.container}>
          <CardDoctor doctor={doctor} />
        </View>
      ))}
    </View>
  );
};

export default DoctorHot;
const styles = StyleSheet.create({
  
});
