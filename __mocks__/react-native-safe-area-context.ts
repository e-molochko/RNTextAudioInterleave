import React from "react";

export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => children;

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const SafeAreaView = ({ children }: { children: React.ReactNode }) => children;
