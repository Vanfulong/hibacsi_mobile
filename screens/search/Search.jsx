import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Divider,
  Searchbar,
} from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/reusable/reusable.style";
import { CardDoctor, CardHospital, HeightSpacer } from "../../components";
import { TouchableWithoutFeedback } from "react-native";
import axiosClients from "../../helper/axiosClients";
import { useApp } from "../../context/AppContext";
import { ScrollView } from "react-native";

const Search = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    doctor: {
      count: 0,
    },
    hospital: {
      count: 0,
    },
    specialty: {
      count: 0,
    },
  });
  const { city } = useApp();

  const countAll = () => {
    return (
      data.doctor["count"] + data.hospital["count"] + data.specialty["count"]
    );
  };

  const handleSearch = async () => {
    // Thực hiện tìm kiếm với giá trị searchText
    let doctor, specialty, hospital;
    console.log("Đang tìm kiếm:");
    try {
      setLoading(true);
      doctor = await axiosClients.get(
        `/search_doctor666/?name=${searchValue}&city=${city}`
      );
      hospital = await axiosClients.get(
        `/search_hospital666/?name=${searchValue}&city=${city}`
      );
      specialty = await axiosClients.get(
        `/search_specialty666/?name=${searchValue}&city=${city}`
      );
      setData({
        doctor,
        hospital,
        specialty,
      });
      setLoading(false);
    } catch (error) {}
  };
  console.log(data);
  return (
    <>
      <SafeAreaView style={reusable.container}>
        <View>
          <HeightSpacer height={20} />
          <View style={styles.containerHeader}>
            <View style={{ flexGrow: 1 }}>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <AntDesign
                  name="arrowleft"
                  size={20}
                  color="black"
                  style={{ margin: 0 }}
                />
              </TouchableWithoutFeedback>
            </View>
            <Searchbar
              placeholder="Tìm kiếm"
              onChangeText={(text) => setSearchValue(text)}
              value={searchValue}
              showDivider
              style={styles.contarnerSearchBar}
              inputStyle={styles.inputSearchBar}
              onSubmitEditing={handleSearch}
            />
          </View>

          <HeightSpacer height={10} />
          {/* filter component */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            <View style={styles.filterContainer}>
              {countAll() > 0 ? (
                <View style={styles.filterActive}>
                  <Text style={styles.textFilterActive}>Tất cả</Text>
                </View>
              ) : (
                ""
              )}
              {data.doctor["count"] > 0 ? (
                <View style={styles.filter}>
                  <Text style={styles.textFilter}>
                    {data.doctor ? data.doctor["count"] : "0"} Bác sĩ
                  </Text>
                </View>
              ) : (
                ""
              )}

              {data.hospital["count"] > 0 ? (
                <View style={styles.filter}>
                  <Text style={styles.textFilter}>
                    {data.hospital ? data.hospital["count"] : "0"} Bệnh viện
                  </Text>
                </View>
              ) : (
                ""
              )}

              {data.specialty["count"] > 0 ? (
                <View style={styles.filter}>
                  <Text style={styles.textFilter}>
                    {data.specialty ? data.specialty["count"] : "0"} Chuyên khoa
                  </Text>
                </View>
              ) : (
                ""
              )}
            </View>
          </ScrollView>
          {/* end filter */}

          <HeightSpacer height={20} />

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                animating={true}
                color={COLORS.blue}
                size={50}
              />
            </View>
          ) : (
            <View>
              {countAll() > 0 ? (
                <View>
                  {data.doctor["count"] > 0 ? (
                    <View>
                      <View style={styles.containerTitle}>
                        <Text style={styles.title}>Bác sĩ</Text>
                        <View style={styles.rightTitle}>
                          <Text style={styles.textRightTitle}>Xem tất cả</Text>
                          <AntDesign
                            name="right"
                            size={12}
                            color={COLORS.dark}
                          />
                        </View>
                      </View>
                      <HeightSpacer height={6} />
                      {data.doctor
                        ? data.doctor["results"].map((doctor) => (
                            <CardDoctor doctor={doctor} />
                          ))
                        : ""}
                      <HeightSpacer height={8} />
                      <Divider />
                    </View>
                  ) : (
                    ""
                  )}
                  {data.hospital["count"] > 0 ? (
                    <View>
                      <HeightSpacer height={20} />
                      <View style={styles.containerTitle}>
                        <Text style={styles.title}>Bệnh viện</Text>
                        <View style={styles.rightTitle}>
                          <Text style={styles.textRightTitle}>Xem tất cả</Text>
                          <AntDesign
                            name="right"
                            size={12}
                            color={COLORS.dark}
                          />
                        </View>
                      </View>
                      <HeightSpacer height={6} />
                      {data.hospital
                        ? data.hospital["results"].map((hospital) => (
                            <CardHospital Hospital={hospital} />
                          ))
                        : ""}
                      <HeightSpacer height={8} />
                      <Divider />
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              ) : (
                <View style={{alignItems:'center', justifyContent:'center', height:'50%'}}>
                  <Text style={styles.textFilter}>Không có kết quả nào</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;
const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  contarnerSearchBar: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderColor: COLORS.dark,
    borderWidth: 0.3,
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    flexGrow: 17,
  },
  inputSearchBar: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    minHeight: 0,
  },
  filterContainer: {
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  filter: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
  },
  textFilter: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
    color: COLORS.dark,
  },
  filterActive: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.blue,
    borderRadius: 20,
  },
  textFilterActive: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
    color: COLORS.white,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.medium - 2,
    color: COLORS.dark,
  },
  rightTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    opacity: 0.5,
  },
  textRightTitle: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium - 1,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
});
