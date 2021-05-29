import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../constants/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Card } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = (props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const openDatePicker = (mode) => {
    setShow(true);
    setMode(mode);
  }

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    console.log(selectedDate);
    props.setValue(selectedDate);
    console.log(selectedDate, event);
  };

  return (
    <>
      <View style={styles.row}>
        <Card style={styles.card} >
          <View style={styles.iconBox}>
            <Icon name={props.iconName} type={props.iconType} size={30} color={Colors.lightBlack} />
          </View>
        </Card>
        <TouchableOpacity onPress={() => openDatePicker('date')} style={styles.date}>
          <Text style={styles.input}>{props.value.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.value}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create( {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(4),
    marginVertical: wp(1),
  },
  iconBox: {
    flex: 1,
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
  },
  input: {
    width: wp(58),
    margin: 0,
    fontSize: wp(4.5),
    letterSpacing: wp(0.2),
    color: Colors.black,
  },
  card: {
    marginRight: wp(2),
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: wp(12),
    height: wp(12),
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6),
    borderBottomWidth: 2,
  }
})


export default CustomDatePicker;
