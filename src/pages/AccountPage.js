import { Box, Heading, HStack, Input, Spacer, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Layout from "../components/Layout";
import { GetUser } from "../services/http";

const AccountPage = () => {
  const [profile, setProfile] = useState();
  const getAccountDetails = async () => {
    try {
      const { data } = await GetUser();
      setProfile(data);
    } catch (error) {}
  };
  useEffect(() => {
    getAccountDetails();
  }, []);
  return (
    <Layout title="Account">
      {profile && (
        <Box>
          <Heading p="2">My Profile</Heading>
          <VStack p="2">
            <Text>First Name</Text>

            <Input
              value={profile.account.firstName}
              variant="underlined"
              placeholder="First Name"
              onChangeText={(t) => {
                setProfile((prev) => {
                  return {
                    ...prev,
                    account: {
                      ...prev.account,
                      firstName: t,
                    },
                  };
                });
              }}
            />

            <Text>Last Name</Text>
            <Input
              value={profile.account.lastName}
              variant="underlined"
              placeholder="Last Name"
              onChangeText={(t) => {
                setProfile((prev) => {
                  return {
                    ...prev,
                    account: {
                      ...prev.account,
                      lastName: t,
                    },
                  };
                });
              }}
            />
          </VStack>
        </Box>
      )}
    </Layout>
  );
};

export default AccountPage;
