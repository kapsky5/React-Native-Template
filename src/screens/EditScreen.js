import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/Header";
import CustomInputText from "../components/CustomTextInput";
import CustomDatePicker from "../components/CustomDatePicker";
import { Colors } from "../constants/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Activity from "../utils/Activity";
import { useDispatch, useSelector } from "react-redux";
import { SetActivities } from "../redux/actions/authActions";

const EditScreen = ({navigation, route}) => {
  let type = route.params.type;
  const activities = useSelector(state => state.auth.activities);
  let [sel, setSel]= useState(activities[route.params.index]);
  const [date, setDate] = useState(type=="Add" ? new Date() : new Date(sel.standard));
  const [planned, setPlanned] = useState(type=="Add" ? new Date() : new Date(sel.planned));
  const [actual, setActual] = useState(type=="Add" ? new Date() : new Date(sel.actual));
  const [activity, setActivity] = useState(type=="Add" ? "" : sel.activity);
  const [causes, setCauses] = useState(type=="Add" ? "" : sel.causes);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log("Activities ==> ", sel);

  const dateHandler = (date) => {
    console.log("Date is ==> ", date);
    if (date !== null && date !== undefined) {
      setDate(date);
    }
  };

  const plannedDateHandler = (date) => {
    console.log("Date is ==> ", date);
    if (date !== null && date !== undefined) {
      setPlanned(date);
    }
  };

  const actualDateHandler = (date) => {
    console.log("Date is ==> ", date);
    if (date !== null && date !== undefined) {
      setActual(date);
    }
  };

  const submitHandler = async () => {
    let newAct = {
      activity: activity,
      standard: date,
      actual: actual,
      planned: planned,
      causes: causes,
    }
    if(type==="Add") {
      setLoading(true);
      let data = [...activities];
      if(data) {
        data.push(newAct);
      } else {
        data = [];
        data.push(newAct)
      }
      dispatch(SetActivities(data));
      await AsyncStorage.setItem("DATA", JSON.stringify(data));
      navigation.goBack();
      setLoading(false);
    } else {
      setLoading(true);
      let data = [...activities];
      data[route.params.index] = newAct;
      dispatch(SetActivities(data));
      await AsyncStorage.setItem("DATA", JSON.stringify(data));
      navigation.goBack();
      setLoading(false);
    }
  }

  const deleteHandler = async () =>  {
    setLoading(true);
    let data = [...activities];
    setDate(new Date());
    setPlanned(new Date());
    setActual(new Date());
    setActivity("");
    setCauses("");
    data.splice(route.params.index, 1);
    dispatch(SetActivities(data));
    await AsyncStorage.setItem("DATA", JSON.stringify(data));
    navigation.goBack();
    setLoading(false);
  }

  return(
    <>
      <View>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color={Colors.primary}
        />
      </View>
      <Header title={type==="Add"? "Add Activity" : "Edit Activity"} />
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Activity:</Text>
        <CustomInputText
          value={activity}
          setValue={setActivity}
          iconName={"receipt"}
          iconType={"material"}
          placeholder={"Enter Activity"}
        />
        <Text style={styles.label}>Standard Date:</Text>
        <CustomDatePicker
          value={date}
          setValue={dateHandler}
          iconName={"date-range"}
          iconType={"material"}
          placeHolder={"Enter date"}
        />
        <Text style={styles.label}>Planned Date:</Text>
        <CustomDatePicker
          value={planned}
          setValue={plannedDateHandler}
          iconName={"date-range"}
          iconType={"material"}
          placeHolder={"Enter date"}
        />
        <Text style={styles.label}>Actual Date:</Text>
        <CustomDatePicker
          value={actual}
          setValue={actualDateHandler}
          iconName={"date-range"}
          iconType={"material"}
          placeHolder={"Enter date"}
        />
        <Text style={styles.label}>Causes:</Text>
        <CustomInputText
          value={causes}
          setValue={setCauses}
          iconName={"receipt"}
          iconType={"material"}
          placeholder={"Causes"}
        />
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
            <Text style={styles.text}>{type==="Add"?  "ADD" : "UPDATE"}</Text>
        </TouchableOpacity>
        {type==="Edit" && <TouchableOpacity onPress={deleteHandler} style={styles.buttonRed}>
          <Text style={styles.text}>DELETE</Text>
        </TouchableOpacity>}
      </ScrollView>
    </>

  );
}


const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: wp(4.4),
    color: Colors.subHeading,
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  button: {
    backgroundColor: Colors.primary,
    padding: wp(4),
    borderRadius: 4,
    width: wp(70),
    marginTop: hp(4),
    alignSelf: "center",
    alignItems: "center"
  },
  buttonRed: {
    backgroundColor: Colors.danger,
    padding: wp(4),
    borderRadius: 4,
    width: wp(70),
    marginTop: hp(4),
    alignSelf: "center",
    alignItems: "center"
  },
  text: {
    fontSize: wp(4.4),
    color: Colors.white,
    textTransform:"uppercase",

  }
})

export default EditScreen;
