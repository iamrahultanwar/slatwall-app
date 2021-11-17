import React from "react";
import {
  HStack,
  IconButton,
  Icon,
  Text,
  Box,
  StatusBar,
  Input,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { isAuthenticated } from "../utils";

export default function Header() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="amber.500" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="amber.500" />

      <HStack
        bg="amber.500"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" pl="4" fontWeight="bold">
            Slatwall
          </Text>
        </HStack>
        <HStack space="2">
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="account-circle" />}
                color="white"
                size="sm"
              />
            }
            onPress={async () => {
              const isAuth = await isAuthenticated();
              if (!isAuth) {
                navigation.navigate("Login");
              } else {
                navigation.navigate("Account");
              }
            }}
          />
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="shopping-cart" />}
                color="white"
                size="sm"
              />
            }
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </HStack>
      </HStack>

      <VStack
        backgroundColor="amber.500"
        width="100%"
        space={5}
        p="2"
        alignItems="center"
      >
        <Input
          placeholder="Search Products"
          width="100%"
          height="40px"
          fontSize="14"
          borderColor="white"
          borderWidth="2"
          fontWeight="bold"
          variant="rounded"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          color="white"
          autoCapitalize="none"
          _focus={{
            borderColor: "white",
            color: "white",
          }}
          onSubmitEditing={() => navigation.navigate("Search", {})}
          InputRightElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="white"
              as={<MaterialIcons name="search" />}
              onPress={() => {
                navigation.navigate("Search");
              }}
            />
          }
        />
      </VStack>
    </>
  );
}
