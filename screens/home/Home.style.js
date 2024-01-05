import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  box:{
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default styles;