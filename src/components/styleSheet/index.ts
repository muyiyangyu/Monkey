/*
 * Android和iOS样式适配
 */

import React, {
  Platform,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle
} from "react-native";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle | any;
};

class _EnhancedStyleSheet {
  static create(styleSheets: NamedStyles<any>) {
    const keys = Object.keys(styleSheets);
    keys.map((key) => {
      Object.keys(styleSheets[key]).map((property) => {
        if (Platform.OS === "ios") {
          if (property.indexOf("_") === 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete styleSheets[key][property];
          }
        } else if (Platform.OS === "android") {
          if (property.indexOf("_") === 0) {
            const _newProp = property.substr(1);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            styleSheets[key][_newProp] = styleSheets[key][property];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete styleSheets[key][property];
          }
        }
      });
    });
    return StyleSheet.create(styleSheets);
  }
}

export { _EnhancedStyleSheet as StyleSheet };
