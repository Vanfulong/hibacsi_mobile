import React from "react";
import { View, Modal, StyleSheet, Text, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/theme";
export default function LoadingModal(props) {
  return (
    <Modal
      animationType=" fade"
      transparent={true}
      visible={props.modalVisible}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          {props.task ? (
            <Text style={styles.modalText}>{props.task}</Text>
          ) : (
           
              props.text &&
              <Text style={styles.modalText}>{props.text || ''}</Text>
           
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },
  modalView: {
    margin: 20,
    padding:20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
  },
  shadowoffset: {
    width: 0,
    height: 2,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 17,
    marginLeft: 15,
  },
});
