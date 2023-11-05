import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Searchbar } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/reusable/reusable.style";

const Search = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
    <Appbar.Header statusBarHeight={20}>
      <Appbar.BackAction onPress={() => navigation.goBack()}  />
      <Appbar.Content title="Tim kiem" titleStyle={styles.title} />
    </Appbar.Header >
    <SafeAreaView style={reusable.container}>
      
      <View>
        
        <Searchbar 
          placeholder="Tìm kiếm"
          onChangeText={(text) => setSearchValue(text)}
          value={searchValue}
          showDivider
          style={{
            backgroundColor: COLORS.lightBlue,
            borderRadius: 10,
           
          }}
        />
      </View>
    </SafeAreaView>
    </>
  );
};

export default Search;
const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    width: SIZES.width,
  },
  title:{
    fontSize: SIZES.large
  }
});
