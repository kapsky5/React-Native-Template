import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setIndex } from "../redux/actions/authActions";
import CustomInputText from "../components/CustomTextInput";
import { Colors } from "../constants/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Header from "../components/Header";

const CategoryScreen = (props) => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(()=> {
    AsyncStorage.getItem("DATA").then((msg) => console.log("DATA is =>", msg));
    // AsyncStorage.clear();
  }, [])

  const submitHandler = async () => {
    let categories = await AsyncStorage.getItem("categories");
    let data = await AsyncStorage.getItem("DATA");
    console.log(categories, data);
    if(categories && data) {
      console.log("Not null");
      data = JSON.parse(data);
      categories = JSON.parse(categories);
      let isFound = false;
      categories.forEach((item, index) => {
        if(item === category.toLowerCase()){
          dispatch(setIndex(index));
          isFound = true;
        }
      });
      if(!isFound) {
        console.log("Not Found");
        categories.push(category.toLowerCase());
        dispatch(setIndex(categories.length-1));
        await AsyncStorage.setItem("categories", JSON.stringify(categories));

        let newData = [...data];
        newData.push({
          data: []
        });
        console.log()
        await AsyncStorage.setItem("DATA", JSON.stringify(newData));
      }
    } else {
      let categories = [];
      categories.push(category.toLowerCase());
      dispatch(setIndex(categories.length-1));
      await AsyncStorage.setItem("categories", JSON.stringify(categories));
      let newData = [];
      // let newData = [...data];
      newData.push({
        data: []
      });
      await AsyncStorage.setItem("DATA", JSON.stringify(newData));
    }
    props.navigation.navigate("Home")
  }

  return (
    <>
      <Header title={"Select Category"} />
      <View style={styles.root}>
        <CustomInputText
          value={category}
          setValue={setCategory}
          iconName={"receipt"}
          iconType={"material"}
          placeholder={"Category"}
        />
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
          <Text style={styles.text}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
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
  text: {
    fontSize: wp(4.4),
    color: Colors.white,
    textTransform:"uppercase",

  }
})

export default CategoryScreen;
