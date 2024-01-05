import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { Appbar, Avatar, Divider } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import { CardDoctor, HeightSpacer, LoadingModal } from "../../components";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import axiosClients from "../../helper/axiosClients";
import { Image } from "react-native";
const HospitalDetail = ({ navigation, route }) => {
  const hospital = route.params.Hospital;
  const [loadingData, setLoadingData] = React.useState(false);
  const [doctors, setDoctors] = useState([]);
  const [image, setImage] = useState(
    hospital.account.avatar ||
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      const data = await axiosClients.get(`/doctors/?hospital=${hospital.id}`);
      setDoctors(data.results);
      setLoadingData(false);
    };
    fetchData();
  }, []);

  const handleImageErr = () => {
    setImage(
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
    );
  };

  return (
    <SafeAreaView style={[reusable.container, { width: "100%" }]}>
      {loadingData ? <LoadingModal text={""} /> : ""}
      <Appbar.Header
        style={{
          backgroundColor: "transparent",
          marginLeft: -12,
        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          size={16}
        />
        {/* <Text style={styles.title}>Đặt lịch hẹn</Text> */}
      </Appbar.Header>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", width: "100%" }}
      >
        <View style={styles.containerDoctor}>
          {/* <Avatar.Text size={80} label="XD" /> */}
          <Image
            style={{ width: 130, height: 130, borderRadius: 80 }}
            onError={(event) => handleImageErr(event)}
            src={image}
          />
          <View style={{ justifyContent: "center", width: "100%-130" }}>
            <View style={{ width: "70%" }}>
              <Text style={styles.textTitle}>{hospital?.name || ""}</Text>
            </View>
            <HeightSpacer height={6} />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4, width:"70%" }}
            >
              <Octicons name="location" size={13} color={COLORS.gray} />

              <Text style={styles.content}>{hospital?.address || ""}</Text>
            </View>
            <HeightSpacer height={6} />
          </View>
        </View>
        <HeightSpacer height={20} />
        <Divider />
        <HeightSpacer height={20} />
        <Text style={styles.textTitle}>Thông tin</Text>
        <HeightSpacer height={10} />
        <Text style={styles.content}>{hospital?.info || ""}</Text>
        <HeightSpacer height={20} />
        <Text style={styles.textTitle}>Bác sĩ</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          {doctors.length > 0 &&
            doctors.map((doctor) => (
              <CardDoctor key={doctor.id} doctor={doctor} />
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalDetail;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
  background: {
    backgroundColor: COLORS.lightBlue,
    width: "100%",
    height: 200,
  },
  avatar: {
    bottom: 60,
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.medium,
    fontFamily: "medium",
    color: COLORS.dark,
  },
  containerDoctor: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  textTitle: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lightGrey,
    paddingVertical: 10,
    flex: 1,
  },
  textTab: {
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
  },
  tabActive: {
    borderBottomColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  content: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    color: COLORS.dark,
    textAlign: "justify",
  },
});
