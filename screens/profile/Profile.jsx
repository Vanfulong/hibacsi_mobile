import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <Input
          containerStyle={{ marginBottom: -10 }}
          disabledInputStyle={{}}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: COLORS.lightGrey,
          }}
          inputStyle={{}}
          label="Họ và tên"
          labelStyle={{ marginBottom: 4 }}
          value="Van Phu Long"
          leftIconContainerStyle={{}}
          rightIcon={
            <Icon name="close" size={20} onPress={() => console.log("first")} />
          }
          rightIconContainerStyle={{}}
          placeholder="Enter Name"
          leftIcon
        />
        <Input
          containerStyle={{ marginBottom: -10, padding: 0 }}
          disabledInputStyle={{}}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 0,
            borderColor: COLORS.lightGrey,
          }}
          inputStyle={{ margin: 0 }}
          label="So dien thoai"
          labelStyle={{ marginBottom: 4 }}
          value="935080640"
          leftIconContainerStyle={{}}
          leftIcon={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text style={{ fontSize: SIZES.medium }}>+84</Text>
              <View
                style={{
                  width: 0,
                  height: 20,
                  marginLeft: 6,
                  marginRight: 5,
                  borderColor: COLORS.lightGrey,
                  borderRightWidth: 1,
                }}
              />
            </View>
          }
          rightIconContainerStyle={{}}
          placeholder="Enter Name"
        />
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("first");
          }}
        >
          <View>
            <Input
              containerStyle={{}}
              disabledInputStyle={{}}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: COLORS.lightGrey,
              }}
              inputStyle={{}}
              label="Ngay sinh"
              labelStyle={{ marginBottom: 4 }}
              value="06/11/2002"
              leftIconContainerStyle={{}}
              rightIcon={
                <Ionicons name="calendar" size={24} color={COLORS.blue} />
              }
              disabled
              rightIconContainerStyle={{}}
              placeholder="Enter Name"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
