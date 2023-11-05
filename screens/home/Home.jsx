import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import { HeightSpacer, ReusableText, WitdhSpacer, Category, DoctorHot } from "../../components/";
import { SIZES, COLORS } from "../../constants/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./Home.style";
import SearchButton from "../../components/home/SearchButton";
import { useAuth } from "../../context/AuthContext";
const Home = ({ navigation }) => {
  const { currentUser } = useAuth();
  
  return (
    <>
    <SafeAreaView style={reusable.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>

        <View style={{flex:1, paddingBottom:60}}>
          <HeightSpacer height={SIZES.small} />

       
          <View style={reusable.rowWidthSpace("space-between")}>
            <View>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons name="location" size={20} color="#0859C59F" />
                  <WitdhSpacer width={3}/>
                  <ReusableText
                    text={"Quảng Nam"}
                    family={"bold"}
                    size={SIZES.Large}
                    color={COLORS.black}
                  />
                  <WitdhSpacer width={5} />
                  <AntDesign
                    style={{ bottom: 1 }}
                    name="down"
                    size={16}
                    color="black"
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
    </SafeAreaView>
    </>
  );
};

export default Home;


