import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";
import React from "react";
import { useEffect } from "react";
import { COLORS, SIZES } from "../../../constants/theme";
import { TouchableWithoutFeedback } from "react-native";

const ModalBooking = ({ modal, setModal, confirm }) => {
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    if (modal) {
      showModal();
    } else {
      hideModal();
    }
  }, [modal]);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setModal(false);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Text style={styles.textBody}>Bạn có muốn đặt lịch hẹn không ?</Text>
      </View>

      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={()=>hideModal()}>
          <View style={styles.button}>
            <Text>Hủy</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>confirm()}>
          <View style={styles.buttonConfirm}>
            <Text style={styles.textConfirm}>Xác Nhận</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ModalBooking;

const styles = StyleSheet.create({
  header: {},
  body: {
    paddingVertical:40
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  container: {
    backgroundColor: "white",

    marginHorizontal: 20,
    borderRadius: 10,
  },
  textBody: {
    fontFamily: "regular",
    fontSize: SIZES.xmedium,
    color: COLORS.dark,
    textAlign: "center",
  },

  buttonConfirm: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: COLORS.lightGrey,
  },
  textConfirm: {
    color: COLORS.white,
    fontSize: SIZES.xmedium,
    fontFamily: "medium",
  },
});
