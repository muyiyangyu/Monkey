/**
 * Index
 * @file 启动页关闭
 * @module src/components/Splashscreen/index.tsx
 * @author yangxiang
 */

import React, { FC, useEffect } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";

const Splashscreen: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return <View />;
};

export default React.memo(Splashscreen);
