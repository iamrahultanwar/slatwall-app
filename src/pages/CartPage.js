import React from "react";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { AddProductToCart, GetCart } from "../services/http";
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spacer,
  useToast,
  VStack,
  Text,
} from "native-base";
import { Constants } from "../utils";
import Layout from "../components/Layout";
const CartPage = () => {
  const toast = useToast();
  const [orderItems, setOrderItems] = useState([]);
  const [cart, setCart] = useState();
  const getCart = async () => {
    try {
      const {
        data: { cart },
      } = await GetCart();
      setOrderItems(cart.orderItems);
      setCart(cart);
    } catch (error) {}
  };

  const addProduct = async (skuId, quantity) => {
    try {
      const { data } = await AddProductToCart(skuId, quantity);
      getCart();
      toast.show({
        description: "Product Updated",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Fetching Cart...");
    getCart();
  }, []);

  return (
    <Layout title="Cart">
      <View flex={1}>
        <FlatList
          data={orderItems}
          renderItem={({ item }) => (
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
                    uri: `https://kontent.slatwallcommerce-dev.io/custom/assets/images/product/default/${item.sku.imageFile}`,
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
                    {item.sku.product.productName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.sku.product.brand.brandName}
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
                  <HStack>
                    <Button
                      size="md"
                      borderRadius="30"
                      py="0.5"
                      px="3"
                      colorScheme="success"
                      onPress={() => {
                        console.log("Adding Item...");
                        addProduct(item.sku.skuID, item.quantity - 1);
                      }}
                      variant="unstyled"
                      _disabled={item.quantity === 0}
                    >
                      -
                    </Button>
                    <Text fontSize="14" alignContent="center">
                      {item.quantity}
                    </Text>
                    <Button
                      size="md"
                      borderRadius="30"
                      py="0.5"
                      px="3"
                      colorScheme="success"
                      variant="unstyled"
                      onPress={() => {
                        console.log("Adding Item...");
                        addProduct(item.sku.skuID, item.quantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.sku.skuID}
        />
        <Center flex={1}></Center>
        {cart && (
          <HStack
            bg="amber.500"
            height="100px"
            alignItems="center"
            safeAreaBottom
            shadow={6}
            p={3}
          >
            <VStack>
              <Text fontSize={24} bold color="white">
                {Constants.dollar} {cart.calculatedTotal}
              </Text>
            </VStack>
            <Spacer />
            <Button colorScheme="green">Checkout</Button>
          </HStack>
        )}
      </View>
    </Layout>
  );
};

export default CartPage;
