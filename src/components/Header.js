import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";

const Header = (props) => {
  return (
    <View style={styles.root}>
      <Icon
        name={"menu"}
        type={"ionicons"}
        size={30} color={Colors.white}
        onPress={() => {}} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: hp(6.5),
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: wp(4),
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: wp(4.5),
    fontFamily: "Oswald-bold",
    marginLeft: wp(4),
  },
});

export default Header;
