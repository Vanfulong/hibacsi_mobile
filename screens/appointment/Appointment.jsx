import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator, Appbar, Avatar, Divider } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import {
  ButtonDay,
  ButtonTime,
  HeightSpacer,
  LoadingModal,
  ModalBooking,
  Notify,
} from "../../components";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import genListDate from "../../helper/genListDate";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native";
import axiosClients from "../../helper/axiosClients";
import { Image } from "react-native";

const Appointment = ({ navigation, route }) => {
  const doctor = route.params.doctor;
  if (!doctor) {
    navigation.goBack();
  }
  const [image, setImage] = useState(doctor.account.avatar)
  const [listDate, setListDate] = useState([]);
  const [day, setDay] = useState({});
  const [pOfday, setPOfDay] = useState("morning");
  const [schedulerDoctor, setSchedulerDoctor] = useState([]);
  const [filterScheduler, setFilterScheduler] = useState([]);
  const [time, setTime] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [notify, setNotify] = useState({
    status: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    setLoadingData(true);
    setListDate(genListDate());
    axiosClients.get(`/getschedulerdoctor/?doctor=${doctor.id}`).then((res) => {
      setSchedulerDoctor(res);
      setLoadingData(false);
    }).catch(()=>{
      setLoadingData(false);
    });
  }, []);

  useEffect(() => {
    if (listDate.length > 0) {
      setDay(listDate[0] || null);
    }
  }, [listDate]);
  useEffect(() => {
    if (schedulerDoctor.morning) {
      let tempData = schedulerDoctor[pOfday].filter(
        (item) => item.days_of_week == day.id
      );
      setFilterScheduler([...tempData]);
    }
  }, [day, pOfday, schedulerDoctor]);
  let specialties;
  if (doctor.specialties.length > 1) {
    specialties = doctor.specialties
      .map(function (specialty) {
        return specialty.specialty.name;
      })
      .join(", ");
  } else {
    specialties = doctor.specialties[0].specialty.name;
  }
  function convertDateFormat(inputDate) {
    var parts = inputDate.split("/");
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];
    var newFormatDate = year + "/" + month + "/" + day;

    return newFormatDate;
  }
  console.log(filterScheduler);
  const bookingDocter = () => {
    const data = {
      id_doctor: doctor.id,
      id_schedule: time,
      date: convertDateFormat(day.date),
    };
    console.log(data);
    setOpenModal(false);
    setLoading(true);
    axiosClients
      .post("/booking/", { ...data })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setNotify({
          status: true,
          type: "success",
          message: "Đã đặt lịch hẹn thành công",
        });
      })
      .catch((err) => {
        console.log("loi");
        console.log(err);
        setLoading(false);
        setNotify({
          status: true,
          type: "error",
          message: "Đã có lỗi xảy ra",
        });
      });
  };
  const handleImageErr = () => {
    console.log("first");
    setImage(
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
    );
  };
  return (
    <>
      <SafeAreaView style={reusable.container}>
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
          <Text style={styles.title}>Đặt lịch hẹn</Text>
        </Appbar.Header>
        <HeightSpacer height={20} />
        <View style={styles.containerDoctor}>
          {/* <Avatar.Text size={80} label="XD" /> */}
          <View style={styles.containerImg}>
            <Image
              style={styles.imageDoctor}
              source={{
                uri: image,
              }}
              onError={(event)=>handleImageErr(event)}
            />
          </View>
          <View style={{ justifyContent: "center", width:"70%" }}>
            <Text style={styles.textTitle}>{doctor.name}</Text>
            <HeightSpacer height={6} />
            <View style={{ flexDirection: "row", alignItems: "center", width:"90%" }}>
              <MaterialIcons name="badge" size={16} color={COLORS.blue} />
              <Text style={styles.textDes}>Chuyên khoa: {specialties}</Text>
            </View>
            <HeightSpacer height={6} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="attach-money"
                size={16}
                color={COLORS.green}
              />
              <Text style={styles.textDes}>
                Phí khám cố định:{" "}
                {parseFloat(doctor.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </View>
          </View>
        </View>
        <HeightSpacer height={30} />
        <Divider />
        <HeightSpacer height={20} />
        <View>
          <Text style={styles.title}>Ngày</Text>
          <HeightSpacer height={10} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {listDate.length > 0 ? (
              listDate.map((item) => (
                <ButtonDay
                  key={item.id}
                  item={item}
                  setDay={setDay}
                  active={day}
                />
              ))
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
        <HeightSpacer height={20} />

        <View>
          <Text style={styles.title}>Thời gian</Text>
          <HeightSpacer height={10} />
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => setPOfDay("morning")}>
              <View
                style={[
                  styles.tab,
                  pOfday == "morning" ? styles.tabActive : "",
                ]}
              >
                <Text style={styles.textTab}>Sáng</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setPOfDay("afternoon")}>
              <View
                style={[
                  styles.tab,
                  pOfday == "afternoon" ? styles.tabActive : "",
                ]}
              >
                <Text style={styles.textTab}>Chiều</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setPOfDay("evening")}>
              <View
                style={[
                  styles.tab,
                  pOfday == "evening" ? styles.tabActive : "",
                ]}
              >
                <Text style={styles.textTab}>Tối</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <HeightSpacer height={10} />
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                animating={true}
                color={COLORS.blue}
                size={50}
              />
            </View>
          ) : (
            ""
          )}
          {filterScheduler.length > 0 ? (
            <FlatList
              data={filterScheduler}
              renderItem={({ item }) => (
                <View style={{ width: "32.2%", marginRight: "1.5%" }}>
                  <ButtonTime setTime={setTime} item={item} active={time} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={{ gap: 10 }}
            />
          ) : (
            <View
              style={{
                height: 100,
                width: "1",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.xmedium,
                  color: COLORS.dark,
                  fontFamily: "regular",
                }}
              >
                Không có lịch trống
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: COLORS.lightGrey,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: COLORS.blue,
                width: "80%",
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "medium",
                  fontSize: SIZES.medium,
                  color: COLORS.white,
                }}
              >
                Đặt lịch hẹn
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ModalBooking
          modal={openModal}
          setModal={setOpenModal}
          confirm={() => bookingDocter()}
        />
        <Notify
          modal={notify.status}
          setModal={setNotify}
          text={notify.message}
          type={notify.type}
        />
      </SafeAreaView>
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  title: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
  backIcon: {
    // backgroundColor: COLORS.white,
    borderRadius: 50,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  containerDoctor: {
    flexDirection: "row",
    gap: 20,
  },
  textTitle: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
  textDes: {
    fontSize: SIZES.xmedium,
    fontFamily: "medium",
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
  tabActive: {
    borderBottomColor: COLORS.blue,
  },
  textTab: {
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
  },
  imageDoctor: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 10,
  },
  containerImg: {
    width: "30%",
    height: 100,
  },
});
