import { View, Text, VirtualizedList, FlatList } from "react-native";
import React from "react";
import CardDoctor from "../card/CardDoctor";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../../constants/theme";
const DoctorHot = () => {
  const doctorHot = [
    {
      id: 1,
      name: "Long",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg",
    },
    {
      id: 2,
      name: "Long",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg",
    },
    {
      id: 3,
      name: "Long",
      image:
        "https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg",
    },
  ];
  return (
    <View>
      <View>
        <FlatList
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
        />
      </View>
    </View>
  );
};

export default DoctorHot;
