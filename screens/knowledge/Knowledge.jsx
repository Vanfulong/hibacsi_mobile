import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/reusable/reusable.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import CardBlog from "../../components/card/CardBlog";
import { HeightSpacer, LoadingModal } from "../../components";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import axiosClients from "../../helper/axiosClients";

const Knowledge = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosClients.get("/blogs/?current_page=1");
        setData(res.results);
        setLoading(false);
      } catch (error) {
        alert("Lỗi kết nối");
      }
      
    };
    fetchData();
  }
  , []);
  console.log(data.results)
  return (
    <SafeAreaView style={reusable.container}>
      {
        loading ? <LoadingModal  /> :  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Ionicons name="newspaper-outline" size={18} color={COLORS.blue} />
          <Text style={{ fontSize: SIZES.medium, fontFamily: "bold", color: COLORS.blue }}>
            Bài viết mới
          </Text>
        </View>
        <HeightSpacer height={20} />
        <View>
          <View>
            {
              data.length>0 &&  data.map((item, index) => {
                return (
                  <CardBlog
                    key={index}
                    url={
                      "https://i1-vnexpress.vnecdn.net/2023/10/31/hoi-nghi-trung-uong-8-16987570-8842-1792-1698760747.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=Z1cd68fhorr5PqmVzKtD8A"
                    }
                    title={item.title}
                    category={item.id_category}
                    time={item.created_at}
                    content={item.content}
                  />
                )
              } )
            }
           
            {/* <Button
              style={{ borderRadius: 5, borderWidth: 0.5 }}
              textColor={COLORS.blue}
              mode="outlined"
              onPress={() => console.log("Pressed")}
              
            >
              Xem thêm...
            </Button> */}
          </View>
              
          
        </View>
      </ScrollView>
      }
     
    </SafeAreaView>
  );
};

export default Knowledge;
