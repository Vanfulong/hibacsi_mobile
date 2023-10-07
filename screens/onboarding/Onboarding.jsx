import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slides } from "../../components";

const Onboarding = () => {
  const slides = [
    {
      id: 1,
      image: require("../../assets/images/1.png"),
      title: "Connect people\naround the world",
    },
    {
      id: 2,
      image: require("../../assets/images/2.png"),
      title: "Connect people\naround the world",
    },
    {
      id: 3,
      image: require("../../assets/images/3.png"),
      title: "Connect people\naround the world",
    },
  ];

  return (
    // <SafeAreaView style={styles.safeArea}>
    //   <Text>Onboarding</Text>
    // </SafeAreaView>
    <FlatList
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={slides}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Slides item={item} />}
    />
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  // safeArea: {
  //   marginTop: StatusBar.currentHeight,
  //   flex: 1,
  //   // backgroundColor:'fff'
  // },
});
