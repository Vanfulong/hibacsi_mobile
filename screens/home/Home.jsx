import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer, ReusableText, WitdhSpacer, Category, DoctorHot, ModalChooseCity } from "../../components/";
import { SIZES, COLORS } from "../../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styles from "./Home.style";
import SearchButton from "../../components/home/SearchButton";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
const Home = ({ navigation }) => {
  const { currentUser } = useAuth();
  const {city} = useApp();

  const [openModalChoseCity, setOpenModalChooseCity] = useState(false)

  useEffect(()=>{
    if(!city){
      setOpenModalChooseCity(true);
    }
    console.log('test ', city)
  })

  const cityRaw = {
    'HaNoi' : 'Hà Nội',
    'HoChiMinh': 'Thành phố Hồ Chí Minh',
    'DaNang' : 'Đà Nẵng'
  }
 
  return (
    <>
    <SafeAreaView style={reusable.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>

        <View style={{flex:1, paddingBottom:60}}>
          <HeightSpacer height={SIZES.small} />

       
          <View style={reusable.rowWidthSpace("space-between")}>
            <View>
              <TouchableOpacity onPress={()=>setOpenModalChooseCity(true)}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'center'}}>
                  <MaterialIcons name="location-on" size={18} color={COLORS.blue} />
                  <WitdhSpacer width={6}/>
                  <ReusableText
                    text={cityRaw[city]}
                    family={"bold"}
                    size={SIZES.Large}
                    color={COLORS.black}
                  />
                  <WitdhSpacer width={5} />
                  <AntDesign
                    style={{ top:2 }}
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
            <SearchButton/>
          </View>
      

  
          <View>
            <HeightSpacer height={SIZES.xLarge} />
            <Category />
            <HeightSpacer height={SIZES.large} />
            <View
            height={0.2}
            width={'100%'}
            backgroundColor="#757575"
          />
          </View>

          <View>
            <DoctorHot/>
          </View>

        </View>
      </ScrollView>
      <ModalChooseCity modal={openModalChoseCity} setModal={setOpenModalChooseCity} />
    </SafeAreaView>
    </>
  );
};

export default Home;


