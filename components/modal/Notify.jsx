import { StyleSheet, Text, View } from "react-native";
import { Modal } from "react-native-paper";
import React from "react";
import { useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';


const Notify = ({ text, setModal, type, modal }) => {
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
    setModal({
      status: false,
      type: '',
      message: ''
    })
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}></View>
      <View style={styles.body}>
        {type == "success" ? (
          <>
            <AntDesign name="checkcircle" size={40} color={COLORS.blue} />
            
          </>
        ) : (
          <>
            <AntDesign name="closecircle" size={40} color={COLORS.red} />
          </>
        )}

        <Text style={styles.textBody}>{text}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={() => hideModal()}>
          <View style={styles.button}>
            <Text>OKE</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default Notify;

const styles = StyleSheet.create({
  header: {},
  body: {
    paddingVertical: 40,
    
    justifyContent:'center',
    alignItems:'center'
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
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
    marginTop:20
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
