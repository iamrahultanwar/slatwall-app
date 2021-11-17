import React from "react";
import { Box, HStack, StatusBar, Text, View } from "native-base";
export default function Layout({ children, title }) {
  return (
    <>
      <StatusBar backgroundColor="amber.500" barStyle="light-content" />

      <Box safeAreaTop bg="amber.500">
        <HStack
          bg="amber.500"
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack space="4" alignItems="center">
            <Text color="white" fontSize="20" pl="4" fontWeight="bold">
              {title}
            </Text>
          </HStack>
        </HStack>
      </Box>
      {children}
    </>
  );
}
