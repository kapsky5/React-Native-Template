import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../constants/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Card } from "react-native-paper";

const CustomInputText = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.row}>
      <Card style={styles.card}>
        <View style={styles.iconBox}>
          <Icon name={props.iconName} type={props.iconType} size={30} color={Colors.lightBlack} />
        </View>
      </Card>
      <TextInput
        ref={props.refs}
        placeholder={props.placeholder}
        value={props.value}
        keyboardType={props.keyboardType}
        onChangeText={text => props.setValue(text)}
        style={[styles.input, { borderBottomColor: isFocused ? Colors.primary : Colors.lightBlack }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: wp(4),
    marginVertical: wp(1),
  },
  iconBox: {
    flex: 1,
    width: wp(12),
    height: wp(12),
    // elevation: 1,
    // borderColor: Colors.lightBlack,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 2,
    width: wp(58),
    height: hp(6),
    padding: 0,
    margin: 0,
    fontSize: wp(4.5),
    letterSpacing: wp(0.2),
    color: Colors.black,

  },
  card: {
    marginRight: wp(2),
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: wp(12),
    height: wp(12),
  },
  icon: {
  },
});


export default CustomInputText;
