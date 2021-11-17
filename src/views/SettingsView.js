import React from "react";
import { Box, HStack, Text, Switch, Button, Badge } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import Layout from "../components/Layout";

const SettingsView = () => {
  const navigation = useNavigation();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    role: "",
  });

  return (
    <Layout>
      <HStack p="3" justifyContent="space-between">
        <Text>Private</Text>
        <Switch size="sm" />
      </HStack>

      <HStack p="3" justifyContent="space-between">
        <Text>Name</Text>
        <Text>{user.name}</Text>
      </HStack>

      <HStack p="3" justifyContent="space-between">
        <Text>Email</Text>
        <Text>{user.email}</Text>
      </HStack>
      <HStack p="3" justifyContent="space-between">
        <Text>Role</Text>
        <Badge colorScheme="success">
          <Text>{user.role}</Text>
        </Badge>
      </HStack>
      <HStack p="3" justifyContent="space-between">
        <Text>Bio</Text>
        <Text color="coolGray.600">update your bio !</Text>
      </HStack>

      <Box flex={1} justifyContent="flex-end">
        <Button
          bg="red.500"
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.replace("Login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Layout>
  );
};

export default SettingsView;
