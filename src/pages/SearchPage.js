import React from "react";
import {
  View,
  Text,
  VStack,
  Input,
  Icon,
  Box,
  Heading,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  Image,
  Button,
  useToast,
  Pressable,
} from "native-base";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { AddProductToCart, SearchProducts } from "../services/http";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";
const SearchPage = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchProduct = async (keywordSearch = "") => {
    try {
      const {
        data: { data },
      } = await SearchProducts(keywordSearch, currentPage);
      setProducts([...products, ...data.products]);
    } catch (error) {}
  };

  const addProduct = async (skuId, quantity) => {
    try {
      const {
        data: { data },
      } = await AddProductToCart(skuId, quantity);
      toast.show({
        description: "Product Added",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchProduct();
  }, [currentPage]);

  return (
    <Layout title="Search">
      <View bg="#f5f5f5">
        <VStack width="100%" space={5} alignItems="center" p="2">
          <Input
            placeholder="Search Products"
            width="100%"
            fontSize="14"
            borderColor="amber.500"
            borderRadius="5"
            _focus={{
              borderColor: "amber.500",
            }}
            onSubmitEditing={() => {
              setProducts([]);
              searchProduct(keyword);
            }}
            value={keyword}
            autoCapitalize="none"
            onChangeText={setKeyword}
            InputRightElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.600"
                as={<MaterialIcons name="search" />}
                onPress={() => {
                  searchProduct(keyword);
                }}
              />
            }
          />
        </VStack>
        <Box
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <FlatList
            data={products}
            initialNumToRender={10}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("ProductDetail", {
                    ...item,
                  });
                }}
              >
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={1} justifyContent="space-between">
                    <Image
                      size="sm"
                      resizeMode="cover"
                      borderRadius="5"
                      source={{
                        uri: `https://kontent.slatwallcommerce-dev.io/custom/assets/images/product/default/${item.sku_imageFile}`,
                      }}
                      alt={"Alternate Text "}
                    />
                    <VStack w="60%">
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        isTruncated
                      >
                        {item.product_productName}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.brandName}
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                      <Text
                        fontSize="sm"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start"
                        fontWeight="bold"
                      >
                        $ {item.skuPrice}
                      </Text>
                      <Spacer />
                      <Button
                        size="md"
                        borderRadius="30"
                        py="0.5"
                        px="3"
                        colorScheme="success"
                        onPress={() => {
                          console.log("Adding Item...");
                          addProduct(item.sku_skuID, 1);
                        }}
                      >
                        Add
                      </Button>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item, index) => item.sku_skuID + index}
            onEndReached={() => {
              console.log("End reached", currentPage);
              setCurrentPage(currentPage + 1);
            }}
          />
          <Box height="100" />
        </Box>
      </View>
    </Layout>
  );
};

export default SearchPage;
