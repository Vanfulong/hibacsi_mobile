import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import axiosClients from "../../helper/axiosClients";
import { useState } from "react";
import { useEffect } from "react";
import { CardAppointment, HeightSpacer } from "../../components";
import { ScrollView } from "react-native";

const AppointmentHistory = ({ navigation }) => {
  const [data, setData] = useState(null)
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState('not_confirm');
  const fetchData = async () => {
    const results = await axiosClients.get("/appointmentsbyuser");
    setAppointments(()=>results[tab]);
    setData(results)
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    if(data){
      setAppointments(data[tab])
    }
  },[tab])
  
  const cancleAppointment = (appointment)=> {
    axiosClients.post(`statusappointment/${appointment.id}/`, {
      'status': 2
    }).then(()=>{
      fetchData();
      console.log(' test   dfsa')
    }).catch(()=>{
      console.log(first)
    })

    console.log(appointment)
  }
  
  return (
    <SafeAreaView style={reusable.container}>
      <Appbar.Header
        style={{
          backgroundColor: "white",
          marginLeft: -12,
        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          size={16}
        />
        <Text style={styles.title}>Lịch sử lịch hẹn</Text>
      </Appbar.Header>

      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback onPress={()=>setTab('not_confirm')}>
          <View style={[styles.tab, tab=='not_confirm'? styles.tabActive : '']}>
            <Text style={[styles.textTab]}>Chờ xác nhận</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>setTab('coming')}>
          <View style={[styles.tab, tab=='coming'? styles.tabActive : '']}>
            <Text style={[styles.textTab]}>Chờ xác nhận</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>setTab('confirmed')}  >
          <View style={[styles.tab, tab=='confirmed'? styles.tabActive : '']}>
            <Text style={[styles.textTab]}>Chờ xác nhận</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <HeightSpacer height={20} />
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        {appointments.length > 0
          ? appointments.map((appointment) => (
              <View key={appointment.id} >
                <CardAppointment appointment={appointment} status={tab} action={cancleAppointment}/>
                <HeightSpacer height={20} />
              </View>
            ))
          : ""}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentHistory;

const styles = StyleSheet.create({
  backIcon: {
    borderRadius: 50,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    paddingVertical: 10,
    flex: 1,
  },
  textTab: {
    fontSize: SIZES.xmedium,
    fontFamily: "regular",
  },
  tabActive:{
    borderBottomColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue
  }
});
