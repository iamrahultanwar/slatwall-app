import React from "react";

import {
  Box,
  Text,
  Divider,
  HStack,
  View,
  VStack,
  Icon,
  ScrollView,
  Badge,
  FlatList,
  Heading,
} from "native-base";
import Layout from "../components/Layout";
import { useNavigation } from "@react-navigation/core";
import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import { GetCategories, GetProductTypes } from "../services/http";
import { FlatGrid } from "react-native-super-grid";
import { StyleSheet } from "react-native";

export default function HomeView() {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const getData = async () => {
    try {
      const {
        data: { data: categoriesData },
      } = await GetCategories();
      const {
        data: { data: productTypesData },
      } = await GetProductTypes();
      setCategories(categoriesData.pageRecords);
      setProductTypes(productTypesData.pageRecords);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      _contentContainerStyle={{
        mb: "4",
      }}
    >
      <Banner />
      <Heading fontSize="xl" p="4" pb="3">
        Categories
      </Heading>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({ item }) => (
          <Badge
            height="10"
            borderRadius="5"
            justifyContent="center"
            alignSelf="center"
          >
            {item.categoryName}
          </Badge>
        )}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: "100%",
                width: 10,
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <Heading fontSize="xl" p="4" pb="3">
        Product Types
      </Heading>
      <FlatList
        horizontal={true}
        data={productTypes}
        renderItem={({ item }) => (
          <Badge
            height="10"
            borderRadius="5"
            justifyContent="center"
            alignSelf="center"
          >
            {item.productTypeName}
          </Badge>
        )}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: "100%",
                width: 10,
                // backgroundColor: "#CED0CE",
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
}
