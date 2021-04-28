/**
 * Index
 * @file Main
 * @module pages/home/index
 * @author yangxiang
 */

import React, { Component, RefObject } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPageProps, NavigationProps } from "/types/props";

export interface IIndexProps extends IPageProps {}

export class Order extends Component<IIndexProps> {
  onPressTheme = () => {};

  render() {
    const { styles } = obStyles;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressTheme}>
          <Text>变化主题了</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const obStyles = {
  get styles() {
    return StyleSheet.create({
      container: {}
    });
  }
};
