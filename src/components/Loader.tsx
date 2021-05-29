import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const Loader = () => {

  const isLoading = useSelector((state: RootState) => state.app.showLoader)

  return(
    <View>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        color={Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Colors.primary,
  },
})

export default Loader;
