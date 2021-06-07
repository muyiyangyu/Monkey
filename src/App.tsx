/**
 * App
 * @file 项目根目录
 * @module src/App.tsx
 * @author yangxiang
 */

import "react-native-gesture-handler";
import React, { useEffect, Suspense } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  initialWindowMetrics,
  SafeAreaProvider
} from "react-native-safe-area-context";
//导航
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const RootStack = createStackNavigator();

//TabBar
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "pages/home";
import { Order } from "pages/order";
import { Main } from "pages/main";
const Tab = createBottomTabNavigator();

//页面栈
import { Login } from "pages/login";

//公用组件、样式
import Splashscreen from "components/Splashscreen";
import { StyleSheet } from "/components/styleSheet";
import colors from "/style/colors";

//mobx || redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "stores/store";
import { Images } from "components";
import { AutoI18nTitle } from "components/layout/title";
import { LANGUAGE_KEYS } from "constants/language";
import { IS_ANDROID } from "config";

export interface ITabIconWithBadgeProps {
  icon: ImageSourcePropType;
  badgeCount?: number;
  size: number;
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        // 定义标签栏的样式
        activeTintColor: "#81C784",
        inactiveTintColor: "#949494",
        // keyboardHidesTabBar: true, // 在键盘弹出的时候将标签栏隐藏
        tabStyle: styles.tabStyle,
        labelStyle: styles.labelStyle
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName = `${route.name}`;
          if (focused) {
            iconName = `${route.name}_S`;
          }
          return <IconWithBadge icon={Images.tabBar[iconName]} size={size} />;
        }
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ title: "首页" }} // 传入初始参数，screen组件获取后设置标题用
        options={{
          tabBarLabel: ({ color }) => (
            <AutoI18nTitle
              i18nKey={LANGUAGE_KEYS.HOME}
              size={12}
              color={color}
              style={styles.text}
            />
          )
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        initialParams={{ title: "订单" }} // 传入初始参数，screen组件获取后设置标题用
        options={{
          tabBarLabel: ({ color }) => (
            <AutoI18nTitle
              i18nKey={LANGUAGE_KEYS.ORDER}
              size={12}
              color={color}
              style={styles.text}
            />
          )
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        initialParams={{ title: "Main" }} // 传入初始参数，screen组件获取后设置标题用
        options={{
          tabBarLabel: ({ color }) => (
            <AutoI18nTitle
              i18nKey={LANGUAGE_KEYS.MAIN}
              size={12}
              color={color}
              style={styles.text}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const IconWithBadge = (props: ITabIconWithBadgeProps) => {
  const { icon, badgeCount = 0, size } = props;
  return (
    <View style={styles.tabIconViewBox}>
      <Image
        source={icon}
        style={{
          width: size,
          height: size
        }}
      />
      {badgeCount > 0 && (
        <View style={styles.tabBadgeViewBox}>
          <Text style={styles.tabBadge}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const Logins = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name={"Login"} component={Login} />
    </RootStack.Navigator>
  );
};

const AuthScreens = {};

const TabScreen = {
  Home: MyTabs
};

const LoginScreen = {
  Login: Logins
};

const RoutesScreens = {};

export const App = () => {
  useEffect(() => {});

  return (
    <Suspense fallback={<Splashscreen />}>
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate loading={<Splashscreen />} persistor={persistor}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <NavigationContainer
                theme={{
                  dark: false,
                  colors: {
                    primary: colors.primary,
                    background: colors.background,
                    card: colors.cardBackground,
                    text: colors.textDefault,
                    border: colors.border,
                    notification: colors.notification
                  }
                }}>
                <RootStack.Navigator
                  initialRouteName={"Home"}
                  // 动态配置屏幕选项，跟下面的setHeaderTitle方法联在一起看
                  // screenOptions={({ route }) => setHeaderTitle(route)}
                  headerMode="none" // 如果要自定义配置header，必须设置这个为screen
                >
                  {Object.entries({
                    // 首页组
                    ...LoginScreen,
                    // 详情页组
                    ...RoutesScreens
                  }).map(([name, component]) => (
                    <RootStack.Screen
                      name={name}
                      component={component}
                      key={name}
                    />
                  ))}
                </RootStack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </Suspense>
  );
};

export default App;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute"
  },
  tabStyle: {
    paddingTop: 5,
    paddingBottom: 5
  },
  labelStyle: {
    fontSize: 12
  },
  tabIconViewBox: { width: 24, height: 24, margin: 5 },
  tabIconStyle: {},
  tabBadgeViewBox: {
    // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBadge: { color: "white", fontSize: 10, fontWeight: "bold" },
  text: {
    marginTop: IS_ANDROID ? 0 : 0,
    marginBottom: IS_ANDROID ? 0 : 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)"
  },
  loadingView: {
    backgroundColor: "#111",
    width: 120,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  loadingText: {
    color: "white",
    marginTop: 10
  }
});
