import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";
import {
  Appbar,
  Avatar,
  Button,
  RadioButton,
  TextInput,
} from "react-native-paper";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer, LoadingModal } from "../../components";
import axios from "axios";
import axiosClients from "../../helper/axiosClients";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosClientForm from "../../helper/axiosFormData";
import { API_URL } from '@env';
export const cvDate = (date) => {
  console.log("cvdate", date);
  let newFormatDate = null;
  if (date) {
    var parts = date.split("-");
    var day = parseInt(parts[2]);
    var month = parseInt(parts[1]);
    var year = parseInt(parts[0]);
    newFormatDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;
  }
  return newFormatDate;
};
const ProfileDetail = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [birthday, setBirthday] = useState(
    currentUser.birthday ? cvDate(currentUser.birthday) : ""
  );
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState(currentUser.address);
  const [gender, setGender] = useState(currentUser.gender);
  const [active, setActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [image, setImage] = useState(
    `${API_URL}${currentUser.account.avatar}`
  );
  const [file, setFile] = useState();
  function convertDateFormat(inputDate) {
    let newFormatDate = "";
    if (inputDate) {
      var parts = inputDate.split("/");
      var day = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      var year = parseInt(parts[2]);
      newFormatDate =
        year +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        (day < 10 ? "0" : "") +
        day;
      console.log("newFormatDate", newFormatDate);
    }
    return newFormatDate;
  }

  const handleSave = async () => {
    setLoading(true);
    if (image.match(/^file:\/\//)) {
      
      try {
        let localUri = file.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('avatar', { uri: localUri, name: filename, type });
        await axiosClientForm
          .patch(`/accounts/${currentUser.account.id}/`, formData)
          .then(() => {
            console.log("success");
            setLoading(false);

          })
          .catch((err) => {
            console.log(err);
            console.log(err.response.data);
            console.log(err.response.status);
            setLoading(false);
            Alert.alert("Có lỗi xảy ra, vui lòng thử lại");
          });
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
    await axiosClients
      .patch(`/users/${currentUser.id}/`, {
        name: name,
        phone: phone,
        address: address,
        gender: gender,
        birthday: convertDateFormat(birthday),
      })
      .then(async () => {
        setLoading(false);
        const result = await axiosClients.post("/token/verify/");
        let name = "bạn";
        if (result.name) {
          name = result.name.split(" ").pop();
        }
        console.log("results", result);
        setCurrentUser({
          ...result,
          first_name: name,
          birthday: result.birthday,
        });
        setImage(`${API_URL}${result.account.avatar}`)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert.alert("Có lỗi xảy ra, vui lòng thử lại");
      });
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setCalendar(false);
      return;
    } else {
      setCalendar(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setBirthday(currentDate.toLocaleDateString());
    }
  };

  const handleImageErr = () => {
    setImage(
      "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg"
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? <LoadingModal text={"Loading"} /> : ""}
      <Appbar.Header
        style={{
          position: "absolute",
          zIndex: 99,
          backgroundColor: "transparent",
          marginTop: 20,
        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          size={16}
        />
        <Text style={styles.title}>Hồ sơ</Text>
      </Appbar.Header>
      <View style={styles.bannerProfile}>
        {currentUser.account.avatar ? (
          <Image
            style={{ width: 130, height: 130, borderRadius: 80 }}
            onError={(event) => handleImageErr(event)}
            src={image}
          />
        ) : (
          <Avatar.Text size={80} label="XD" />
        )}
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <View
            style={{
              position: "absolute",
              bottom: SIZES.height / 5 - 60,
              right: SIZES.width / 2 - 70,
              padding: 10,
              backgroundColor: COLORS.lightGrey,
              borderRadius: 50,
            }}
          >
            <FontAwesome5
              name="pen"
              size={24}
              color={COLORS.dark}
              style={{ transform: [{ rotate: "260deg" }] }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* <HeightSpacer height={10}/> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerBody}>
          <TextInput
            style={styles.input}
            label="Họ và tên"
            returnKeyType="next"
            value={name}
            autoCapitalize="none"
            underlineColor="transparent"
            activeOutlineColor={COLORS.blue}
            outlineColor={COLORS.lightGrey}
            mode="outlined"
            contentStyle={styles.text}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            label="Số điện thoại"
            mode="outlined"
            value={phone}
            outlineColor={COLORS.lightGrey}
            left={<TextInput.Affix text="+84" />}
            contentStyle={styles.text}
            onChangeText={(text) => setPhone(text)}
          />
          <TouchableWithoutFeedback onPress={() => setCalendar(true)}>
            <TextInput
              style={styles.input}
              label="Ngày sinh"
              mode="outlined"
              value={birthday}
              disabled
              outlineColor={COLORS.lightGrey}
              right={
                <TextInput.Icon
                  icon={"calendar"}
                  color={COLORS.blue}
                  onPress={() => setCalendar(true)}
                />
              }
              contentStyle={styles.text}
            />
          </TouchableWithoutFeedback>
          {calendar == true ? (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onChange}
              display="spinner"
              maximumDate={new Date()}
            />
          ) : (
            ""
          )}

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>Giới tính : </Text>
            <RadioButton.Group
              onValueChange={(value) => setGender(value)}
              value={gender}
            >
              <View style={{ flexDirection: "row", gap: 4 }}>
                <RadioButton.Item
                  label="Nam"
                  value={true}
                  labelStyle={styles.text}
                  color={COLORS.blue}
                />
                <RadioButton.Item
                  label="Nữ"
                  value={false}
                  labelStyle={styles.text}
                  color={COLORS.blue}
                />
              </View>
            </RadioButton.Group>
          </View>
          <TextInput
            style={styles.input}
            label="Địa chỉ"
            returnKeyType="next"
            value={address}
            autoCapitalize="none"
            underlineColor="transparent"
            activeOutlineColor={COLORS.blue}
            outlineColor={COLORS.lightGrey}
            mode="outlined"
            contentStyle={styles.text}
            onChangeText={(text) => setAddress(text)}
          />
          <Button
            style={{ marginVertical: 30, backgroundColor: COLORS.blue }}
            mode="contained"
            onPress={() => handleSave()}
            labelStyle={{
              fontFamily: "medium",
              fontSize: SIZES.xmedium,
            }}
            disabled={active}
          >
            Cập nhật thông tin
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: "white",
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
  },
  bannerProfile: {
    borderRadius: 30,
    height: SIZES.height / 2.5,
    // backgroundColor: COLORS.blue,
    width: SIZES.width,
    // marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  containerBody: {
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
  backIcon: {
    // backgroundColor: COLORS.white,
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  text: {
    color: COLORS.dark,
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
  },
});
