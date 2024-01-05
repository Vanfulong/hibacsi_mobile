import { View, Text, ScrollView, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { HeightSpacer, LoadingModal } from "../../components";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const chabot = require("../../assets/images/chat-bot.png");
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}
    >
      <View style={styles.container}>
        <HeightSpacer height={20}/>
        <Text style={styles.tilte}>Bác sĩ AI</Text>
        <View style={styles.containerImg}>
          <Image source={chabot} style={styles.img} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ height: "40%" }}
        >
          <View>
            <Text style={styles.text}>
              Xin lưu ý rằng chatbot tư vấn sức khỏe này chỉ mang tính chất tham
              khảo và không thay thế cho ý kiến chuyên gia y tế. Dưới đây là một
              số điều quan trọng mà bạn nên xem xét khi sử dụng dịch vụ của
              chúng tôi:Giới Hạn Tư Vấn: Chatbot được thiết kế để cung cấp
              thông tin tổng quan về sức khỏe và không nên được coi là nguồn tư
              vấn chính xác cho tình trạng sức khỏe cá nhân. Hãy tham khảo ý
              kiến của bác sĩ hoặc chuyên gia y tế nếu bạn có bất kỳ vấn đề y tế
              cụ thể nào. Bảo Mật Thông Tin: Vui lòng không chia sẻ thông tin y
              tế cá nhân quan trọng thông qua chatbot. Chatbot không lưu giữ
              thông tin này và không thể đảm bảo tính bảo mật của dữ liệu truyền
              qua mạng. Không Tự Chẩn Đoán: Chatbot không thể đưa ra chẩn đoán y
              tế. Nếu bạn gặp vấn đề sức khỏe, hãy thăm bác sĩ để được đánh giá
              và tư vấn chính xác. Tư Vấn Điều Trị: Bất kỳ gợi ý về điều trị nào
              từ chatbot đều chỉ mang tính chất tham khảo. Luôn thảo luận với
              bác sĩ trước khi thực hiện bất kỳ biện pháp điều trị nào. Cập Nhật
              Thường Xuyên: Các thông tin mà chatbot cung cấp có thể không phản
              ánh được những tiến triển mới nhất trong lĩnh vực y học. Hãy kiểm
              tra thường xuyên để đảm bảo bạn nhận được thông tin mới nhất và
              chính xác nhất. Chatbot tư vấn sức khỏe chỉ là công cụ hỗ trợ và
              không thể thay thế cho sự chăm sóc của các chuyên gia y tế. Sức
              khỏe của bạn là quan trọng, hãy chú ý và tìm kiếm sự tư vấn chính
              xác từ các nguồn đáng tin cậy.
            </Text>
          </View>
        </ScrollView>
        <HeightSpacer height={20} />
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("Chatting") }>
          <View style={styles.button}>
            <Text style={styles.textButton}>Bắt đầu trò chuyện</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    textAlign: "justify",
  },
  tilte: {
    fontFamily: "medium",
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
  containerImg: {
    width: "50%",
    height: 200,
    alignItems:'center',
    justifyContent:'center'
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  button: {
    paddingHorizontal:20,
    paddingVertical: 10,
    backgroundColor: COLORS.blue,
    borderRadius:10
  },
  textButton: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.white
  }
});
