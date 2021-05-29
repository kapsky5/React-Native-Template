import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import { FAB } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "../components/Header";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { SetActivities } from "../redux/actions/authActions";

const HomeScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  // const [activities, setActivities] = useState([]);

  const activities = useSelector(state => state.auth.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    setLoading(true);
    let activities = await AsyncStorage.getItem("DATA");
    console.log(activities);
    if (activities) {
      activities = JSON.parse(activities);
      dispatch(SetActivities(activities));
    }
    setLoading(false);
  };

  const getDateString = (date) => {
    let string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return string;
  }

  const getDifference = (date1, date2) => {
    let t1 = new Date(date1).getTime();
    let t2 = new Date(date2).getTime();
    let sign = t1>t2 ? "-" : "+";
    let days = Math.floor(Math.abs(t1-t2)/((1000 * 3600 * 24)));
    return `${sign} ${days}`;
  }

  return (
    <>
      <View>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
          color={Colors.primary}
        />
      </View>
      <Header title={"Activity List"} />
      <ScrollView>
        <Text style={styles.list}>Activity List:</Text>
        <View style={{paddingBottom: hp(15)}}>
          {(activities!==null && activities.length>0) ? activities.map((item, index) => {
            return (
              <View style={styles.card} key={ `act_${index}`}>
                <TouchableOpacity onPress={() => navigation.navigate("Edit", {
                  type: "Edit",
                  data: [],
                  index: index,
                })}>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Activity:</Text>
                    <Text style={styles.value}>{item.activity}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Standard Date:</Text>
                    <Text style={styles.value}>{getDateString(new Date(item.standard))}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Planned Date:</Text>
                    <Text style={styles.value}>{getDateString(new Date(item.planned))}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Actual Date:</Text>
                    <Text style={styles.value}>{getDateString(new Date(item.actual))}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Delay:</Text>
                    <Text style={styles.value}>{getDifference(item.planned, item.actual)}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.heading}>Causes:</Text>
                    <Text style={styles.value}>{item.causes}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }): <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No Activities added yet.</Text>
            <Text style={styles.empty}>Start adding Activities.</Text>
          </View>}
        </View>
      </ScrollView>
      <View style={styles.fab}>
        <FAB
          icon={"plus"}
          color={Colors.white}
          size={28}
          onPress={() => navigation.navigate("Edit", {
            type: "Add",
          })}
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
  row: {
    flexDirection: "row",
    // alignItems: "center",
  },
  heading: {
    color: Colors.primary,
    fontSize: wp(4.2),
    fontWeight: "bold",
  },
  value: {
    color: Colors.black,
    fontSize: wp(3.5),
    fontWeight: "bold",
    marginLeft: wp(1),
    flexShrink: 1,
    marginTop: 2,
  },
  list: {
    color: Colors.black,
    fontSize: wp(4.8),
    fontWeight: "bold",
    margin: wp(4),
  },
  empty: {
    color: Colors.primary,
    fontSize: wp(4.6),
    fontFamily: "Merriweather-Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
