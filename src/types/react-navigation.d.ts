declare module '@react-navigation/native' {
  import { ComponentType } from 'react';
  export const NavigationContainer: ComponentType<any>;
}

declare module '@react-navigation/bottom-tabs' {
  import { ComponentType } from 'react';
  export function createBottomTabNavigator<T>(): {
    Navigator: ComponentType<any>;
    Screen: ComponentType<any>;
  };
}

declare module '@react-navigation/stack' {
  import { ComponentType } from 'react';
  export function createStackNavigator<T>(): {
    Navigator: ComponentType<any>;
    Screen: ComponentType<any>;
  };
}
