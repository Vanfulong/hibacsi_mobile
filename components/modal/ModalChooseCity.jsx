import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button, PaperProvider, Divider } from "react-native-paper";
import React from "react";
import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const ModalChooseCity = ({ modal, setModal, confirm }) => {
  const [visible, setVisible] = React.useState(false);
  const [modalCity, setModalCity] = useState("");
  const { setCity} = useApp();
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
  const submit = () => {
    setCity(modalCity);
    hideModal()
  }

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
      style={{
        justifyContent: "flex-end",
        paddingBottom: 40,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.textHeader}>Chọn thành phố cư trú</Text>
      </View>
      <View style={styles.body}>
        <Divider/>
        <View style={[styles.li, modalCity=='DaNang'?styles.active:'']}>
          <TouchableWithoutFeedback onPress={()=> setModalCity('DaNang')}>
            <Text style={styles.textBody}>Đà Nẵng</Text>
          </TouchableWithoutFeedback>
        </View>
        <Divider/>
        <View style={[styles.li, modalCity=='HoChiMinh'?styles.active:'']}>
          <TouchableWithoutFeedback onPress={()=> setModalCity('HoChiMinh')}>
            <Text style={styles.textBody}>Thành phố Hồ Chí Minh</Text>
          </TouchableWithoutFeedback>
        </View>
        <Divider/>
        <View style={[styles.li, modalCity=='HaNoi'?styles.active:'']}>
          <TouchableWithoutFeedback onPress={()=> setModalCity('HaNoi')}>
            <Text style={styles.textBody}>Hà Nội</Text>
          </TouchableWithoutFeedback>
        </View>
        <Divider/>
      </View>

      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={() => submit()}>
          <View style={styles.buttonConfirm}>
            <Text style={styles.textConfirm}>Xác Nhận</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ModalChooseCity;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textHeader: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.dark,
    textAlign: "center",
  },
  body: {
    paddingVertical: 40,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  container: {
    backgroundColor: "white",
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
    justifyContent:'center',
    alignItems:'center'
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
  li: {
    paddingVertical: 15,
  },
  active:{
    backgroundColor: COLORS.lightBlue
  }
});
