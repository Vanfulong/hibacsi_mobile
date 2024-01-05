import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Avatar, Divider, TextInput } from "react-native-paper";
import { HeightSpacer, RowSetting } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import RenderHtml from "react-native-render-html";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Blog = ({ navigation, route }) => {
  const [size,setSize] = useState(0)
  const increSize = () =>{
    setSize((prev)=> prev + 2)
  }
  const decreSize = () =>{
    setSize((prev)=> prev - 2)
  }
  const data = route.params.blog;
  const source = {
    html: data,
  };
  const cusStyle = {
    p : {
      fontFamily: 'regular',
      fontSize: SIZES.medium + size
    },
    h1: {
      fontFamily: 'medium',
      fontSize: SIZES.xLarge + size
    },
    h2:{
      fontFamily: 'medium',
      fontSize: SIZES.large + size
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Appbar.Header
        style={{
          zIndex: 99,
          backgroundColor: "transparent",
          justifyContent:'space-between',
          marginHorizontal:20

        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}
          size={20}
        />
        <View style={{flexDirection:'row', gap: 20}}> 

        <TouchableWithoutFeedback onPress={()=>increSize()}>

        <MaterialCommunityIcons name="format-font-size-increase" size={24} color="black" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>decreSize()}>

        <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="black" />
        </TouchableWithoutFeedback>
        </View>
      </Appbar.Header>
      <HeightSpacer height={0} />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <View>
            <RenderHtml source={source} contentWidth={SIZES.width - 40} systemFonts={['bold']} tagsStyles={cusStyle} />
          </View>
          <HeightSpacer height={30} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Blog;
const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    borderWidth: 0.3,
    borderColor: COLORS.lightGrey,
  },
  containerHeader: {
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  backIcon: {
    borderRadius: 50,
    marginLeft:-5,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  title: {
    fontSize: SIZES.xmedium + 2,
    fontFamily: "regular",
    color: COLORS.dark,
  },
});
