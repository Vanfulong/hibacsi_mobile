import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import {
  HeightSpacer,
  ReusableText,
  WitdhSpacer,
  Category,
  DoctorHot,
  ModalChooseCity,
  Hospital,
} from "../../components/";
import { SIZES, COLORS } from "../../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styles from "./Home.style";
import SearchButton from "../../components/home/SearchButton";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import axiosClients from "../../helper/axiosClients";
import { ActivityIndicator } from "react-native-paper";
const Home = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { city } = useApp();
  const [openModalChoseCity, setOpenModalChooseCity] = useState(false);

  const [listHospital, setListHospital] = useState([]);

  const [listDoctor, setListDoctor] = useState([]);

  const [loading, setLoading] = useState(false);

  const getListHospital = async () => {
    const data = await axiosClients.get("/hospitals/");
    setListHospital([...data.results]);
  };

  const getListDoctor = async () => {
    const data = await axiosClients.get("/doctors/");
    setListDoctor([...data.results]);
  };
  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);
        await getListDoctor();
        await getListHospital();
        setLoading(false);
      } catch (error) {
        Alert.alert("", "Có lỗi xảy ra");
      }
    };
    fecthData();
  }, []);

  useEffect(() => {
    if (!city) {
      setOpenModalChooseCity(true);
    }
    console.log("test ", city);
  });

  const cityRaw = {
    HaNoi: "Hà Nội",
    HoChiMinh: "Thành phố Hồ Chí Minh",
    DaNang: "Đà Nẵng",
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getListDoctor();
    await getListHospital();
    setRefreshing(false);
  }, []);

  return (
    <>
      <SafeAreaView style={reusable.container}>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1, paddingBottom: 60 }}>
            <HeightSpacer height={SIZES.small} />

            <View style={reusable.rowWidthSpace("space-between")}>
              <View>
                <TouchableOpacity onPress={() => setOpenModalChooseCity(true)}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialIcons
                      name="location-on"
                      size={18}
                      color={COLORS.blue}
                    />
                    <WitdhSpacer width={6} />
                    <ReusableText
                      text={cityRaw[city]}
                      family={"bold"}
                      size={SIZES.Large}
                      color={COLORS.black}
                    />
                    <WitdhSpacer width={5} />
                    <AntDesign
                      style={{ top: 2 }}
                      name="down"
                      size={14}
                      color={COLORS.gray}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ReusableText
                text={`Hi, ${currentUser.first_name}`}
                family={"medium"}
                size={SIZES.Large}
                color={COLORS.black}
              />
            </View>

            <View>
              <HeightSpacer height={SIZES.xLarge} />
              <SearchButton />
            </View>
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator
                  animating={true}
                  color={COLORS.blue}
                  size={50}
                />
              </View>
            ) : (
              <>
                <View>
              <DoctorHot listDoctor={listDoctor} />
            </View>
            <View>
              <Hospital listHospital={listHospital} />
            </View>
              </>
            )}
            
          </View>
        </ScrollView>
        <ModalChooseCity
          modal={openModalChoseCity}
          setModal={setOpenModalChooseCity}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
