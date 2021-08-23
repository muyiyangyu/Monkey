/**
 * Index
 * @file 登录
 * @module pages/home/index
 * @author yang xiang
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "/components/styleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "/stores/hooks";
import { decrement, increment } from "stores/counterSlice";
import { RootState } from "stores/rootReducer";

export const Main = (): JSX.Element => {
  const count = useAppSelector((state: RootState) => state.counter.value);
  console.log("------", count);
  const dispatch = useAppDispatch();

  const { styles } = obStyles;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text>加加加</Text>
        </TouchableOpacity>
        <Text>去首页</Text>
        <Text>{count}</Text>
      </View>
    </SafeAreaView>
  );
};

const obStyles = {
  get styles() {
    return StyleSheet.create({
      container: {}
    });
  }
};
