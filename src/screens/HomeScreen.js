import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import { FAB } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "../components/Header";

const HomeScreen = ({ navigation, route }) => {

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    let activities = AsyncStorage.getItem("Activities");
    if (activities) {
      activities = JSON.parse(activities);
      setActivities(activities);
    }
  };

  const [activities, setActivities] = useState([]);

  return (
    <>
      <Header ti/>
      <ScrollView>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => {
          }}>
            <Text style={styles.name}></Text>
            <Text style={styles.size}> acres</Text>
            <Text style={styles.type}>Contract Based | Workers</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.fab}>
        <FAB
          icon={"plus"}
          color={Colors.white}
          size={28}
          onPress={() => navigation.navigate("Edit")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    elevation: 4,
    marginVertical: hp(1.5),
    marginHorizontal: wp(4),
    borderRadius: 4,
  },
  name: {
    color: Colors.primary,
    fontFamily: "Oswald-Regular",
    fontSize: wp(5),
  },
  size: {
    color: Colors.black,
    fontFamily: "Oswald-Regular",
    fontSize: wp(3.5),
  },
  type: {
    color: Colors.black,
    fontFamily: "Oswald-Regular",
    fontSize: wp(3.5),
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    minHeight: "100%",
    padding: wp(6),
  },
});

export default HomeScreen;
