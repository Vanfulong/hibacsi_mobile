import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../components/reusable/reusable.style";
import { HeightSpacer } from "../components";
import { Appbar } from "react-native-paper";

const PrivacyPolicy = ({navigation}) => {
  return (
    <SafeAreaView style={reusable.container}>
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
        <Text style={styles.title}>Chính sách bảo mật</Text>
      </Appbar.Header>
      <ScrollView 
            showsVerticalScrollIndicator={false}
            >
        <HeightSpacer height={20} />
        <Text style={styles.des}>
          Chào mừng bạn đến với ứng dụng đặt lịch khám và tra cứu thông tin y tế
          của chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và
          đảm bảo rằng mọi hoạt động trực tuyến của bạn đều được thực hiện một
          cách an toàn và bảo mật. Dưới đây là chính sách bảo mật của chúng tôi:
        </Text>
        <HeightSpacer height={20} />
        <Text style={styles.title}>1. Thu thập thông tin cá nhân:</Text>
        <HeightSpacer height={10} />

        <Text style={styles.des}>
          Chúng tôi có thể thu thập thông tin cá nhân của bạn như tên, địa chỉ
          email, số điện thoại và thông tin y tế cơ bản để đảm bảo quá trình đặt
          lịch và cung cấp dịch vụ tra cứu thông tin y tế tốt nhất. Chúng tôi
          cam kết không chia sẻ thông tin này với bất kỳ bên thứ ba nào mà không
          có sự đồng ý của bạn.
        </Text>
        <HeightSpacer height={20} />

        <Text style={styles.title}>2. Bảo mật dữ liệu:</Text>
        <HeightSpacer height={10} />

        <Text style={styles.des}>
          Chúng tôi sử dụng các biện pháp bảo mật hiện đại để bảo vệ thông tin
          cá nhân của bạn khỏi mọi rủi ro mất mát, truy cập trái phép, thay đổi
          hay tiết lộ không đúng đắn. Dữ liệu của bạn được lưu trữ trên các máy
          chủ an toàn và chỉ có những người có quyền truy cập mới có thể xem
          được.
        </Text>
        <HeightSpacer height={20} />
        <Text style={styles.title}>3. Sử dụng Cookie:</Text>
        <HeightSpacer height={10} />
        <Text style={styles.des}>
          Chúng tôi có thể sử dụng cookie để cải thiện trải nghiệm của bạn trên
          ứng dụng. Cookie là các tệp nhỏ được lưu trữ trên thiết bị của bạn và
          giúp chúng tôi hiểu cách bạn tương tác với ứng dụng.
        </Text>
        <HeightSpacer height={20} />
        <Text style={styles.title}>4. Quyền lợi của người dùng:</Text>
        <HeightSpacer height={10} />
        <Text style={styles.des}>
          Bạn có quyền yêu cầu xem, sửa đổi, hoặc xóa thông tin cá nhân của mình
          bất kỳ lúc nào. Chúng tôi cũng cung cấp quyền lựa chọn về cách chúng
          tôi sử dụng thông tin của bạn.
        </Text>
        <HeightSpacer height={20} />
        <Text style={styles.title}>5. Cập nhật chính sách:</Text>
        <HeightSpacer height={10} />
        <Text style={styles.des}>
          Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian mà
          không cần thông báo trước. Mọi thay đổi sẽ được công bố trên ứng dụng
          của chúng tôi và áp dụng ngay lập tức.
        </Text>
        <HeightSpacer height={10} />
        <Text style={styles.des}>
          Bằng cách sử dụng ứng dụng của chúng tôi, bạn đồng ý với chính sách
          bảo mật này. Chúng tôi đánh giá cao sự tin tưởng của bạn và cam kết
          bảo vệ thông tin cá nhân của bạn một cách tốt nhất có thể. Nếu bạn có
          bất kỳ câu hỏi hoặc lo ngại nào về chính sách bảo mật của chúng tôi,
          vui lòng liên hệ với chúng tôi qua các thông tin liên lạc được cung
          cấp trên ứng dụng.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  title: {
    fontFamily: "medium",
    fontSize: SIZES.xmedium,
    color: COLORS.black,
  },
  des: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    color: COLORS.dark,
    textAlign: "justify",
  },
  backIcon: {
    // backgroundColor: COLORS.white,
    borderRadius: 50,
    marginRight: 10,
    borderColor: COLORS.lightGrey,
    borderWidth: 0.3,
  },
});
