import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

const Dialog = ({ children, visible, transparent, dismiss, styles }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={transparent}
      onRequestClose={dismiss}
    >
      <View
        style={{
          flex: 1,
          height: Dimensions.get("screen").height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View style={styles}>{children}</View>
      </View>
    </Modal>
  );
};

export default Dialog;
