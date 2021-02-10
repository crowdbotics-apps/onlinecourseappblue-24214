import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    setTimeout(() => navigate(name, params), 500);
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  } else {
  }
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function reset(obj) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.reset(obj);
  } else {
  }
}
