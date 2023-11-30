import { View, Text, VirtualizedList, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CardDoctor from "../card/CardDoctor";
import HeightSpacer from "../reusable/HeightSpacer";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import ReusableText from "../reusable/ReusableText";
import { Button, Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import axiosClients from "../../helper/axiosClients";
const DoctorHot = () => {
  const [listDoctor, setListDoctor] = useState([]);
  useEffect(()=>{
    const getListDoctor = async ()=>{
      const data = await axiosClients.get('/doctors/')
      setListDoctor([...data.results])
    }
    getListDoctor();
  }, [])
  return (
    <View>
      <HeightSpacer height={SIZES.xLarge} />
      <ReusableText
        text={"Bác sĩ nổi bật"}
        family={"bold"}
        size={SIZES.medium}
        color={COLORS.black}
      />
      {
        listDoctor.length==0?'':listDoctor.map((doctor) => (
          <View key={doctor.id} style={styles.container}>
            <CardDoctor doctor={doctor} />
          </View>
        ))
      }
      
    </View>
  );
};

export default DoctorHot;
const styles = StyleSheet.create({
  
});
