/**
 * Index
 * @file 主页（文章列表）
 * @module pages/home/index
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { IPageProps } from "/types/props";
import colors from "style/colors";
import sizes from "style/sizes";
import { LANGUAGES } from "constants/language";
import { Loading } from "components/common/loading";

export interface IIndexProps extends IPageProps {}

export class Home extends Component<IIndexProps> {
  constructor(props: IIndexProps) {
    super(props);
    this.state = { fadeAnim: new Animated.Value(0) };
  }

  onPressTheme = (): void => {};

  onPressToLogin = (): void => {};

  onPressUpdateLanguage = (): void => {};

  render(): JSX.Element {
    const { styles } = obStyles;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Loading visible />
          <TouchableOpacity
            style={styles.toLogin}
            onPress={this.onPressToLogin}>
            <Text>登录</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toLogin} onPress={this.onPressTheme}>
            <Text>主题</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const obStyles = {
  get styles() {
    return StyleSheet.create({
      toLogin: {
        marginTop: 40,
        height: 30,
        backgroundColor: "red"
      },
      container: {
        flex: 1,
        paddingTop: sizes.gap,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.red
      },
      fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue"
      },
      fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10
      },
      buttonRow: {
        flexDirection: "row",
        marginVertical: 16
      },
      box: {
        backgroundColor: "#61dafb",
        width: 80,
        height: 80,
        borderRadius: 4
      }
    });
  }
};
