import React from "react";
import {
  View,
  Text,
  Image,
  VStack,
  Heading,
  HStack,
  Box,
  ScrollView,
  Select,
  CheckIcon,
  Button,
  Spacer,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { AddProductToCart, GetProductDetails } from "../services/http";
import { Constants } from "../utils";
import HTMLView from "react-native-htmlview";

const ProductDetailPage = ({ route, navigation }) => {
  const item = route.params;
  const [product, setProduct] = useState();
  const toast = useToast();
  const [selectedSku, setSelectedSku] = useState(item.sku_skuID);
  const [quantity, setQuantity] = useState(1);
  const getProductDetails = async (urlTitle) => {
    try {
      const {
        data: { data },
      } = await GetProductDetails(urlTitle);
      setProduct(data);
    } catch (error) {}
  };

  const addProduct = async () => {
    try {
      const { data } = await AddProductToCart(selectedSku, quantity);
      toast.show({
        description: "Product Updated",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails(item.product_urlTitle);
  }, []);
  return (
    <ScrollView
      _contentContainerStyle={{
        mb: "120",
      }}
      safeAreaBottom
    >
      <Image
        size="sm"
        width="100%"
        height={400}
        source={{
          uri: `https://kontent.slatwallcommerce-dev.io/custom/assets/images/product/default/${item.sku_imageFile}`,
        }}
        alt={"Alternate Text "}
      />
      <Heading m="2">{item.product_productName}</Heading>
      {product && (
        <Box>
          <HStack mx="2" space={3}>
            <Text style={{ textTransform: "uppercase" }} bold>
              sku
            </Text>
            <Text>{product.product.defaultSku_skuCode}</Text>
          </HStack>
          <HStack mx="2" space={3}>
            <Text style={{ textTransform: "uppercase" }} bold>
              brand
            </Text>
            <Text>{product.product.brand_brandName}</Text>
          </HStack>
          <HStack mx="2" space={3}>
            <Text style={{ textTransform: "uppercase" }} bold>
              product type
            </Text>
            <Text>{product.product.productType_productTypeName}</Text>
          </HStack>
          <HStack mx="2" space={3}>
            {product.product.listPrice !== 0 && (
              <Text fontSize="24" strikeThrough color="coolGray.400">
                {Constants.dollar} {product.product.listPrice}
              </Text>
            )}
            <Text fontSize="26">
              {Constants.dollar} {product.product.salePrice}
            </Text>
          </HStack>
          <Text m="2" fontSize={20}>
            <HTMLView value={product.product.productDescription} />
          </Text>
          {product.product.optionGroups.length > 0 &&
            product.product.optionGroups.map((optionGroup) => (
              <Box p="2">
                <Text>{optionGroup.optionGroupName}</Text>
                <Select
                  selectedValue={selectedSku}
                  minWidth="200"
                  accessibilityLabel="Choose"
                  placeholder="Choose"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setSelectedSku(itemValue)}
                >
                  {optionGroup.options.map((option, index) => (
                    <Select.Item
                      label={option.optionName}
                      value={option.optionID}
                      key={option.optionID + index}
                    />
                  ))}
                </Select>
              </Box>
            ))}
          <Text p="2">Quantity</Text>
          <HStack p="2">
            <HStack space={3}>
              <Button
                size="lg"
                borderRadius="5"
                py="0.5"
                px="3"
                colorScheme="amber"
                onPress={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </Button>
              <Text alignItems="center" fontSize="14" alignContent="center">
                {quantity}
              </Text>
              <Button
                size="lg"
                borderRadius="5"
                py="0.5"
                px="3"
                colorScheme="amber"
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </HStack>
            <Spacer />
            <Button
              colorScheme="amber"
              onPress={() => {
                addProduct();
              }}
            >
              Add To Cart
            </Button>
          </HStack>
          <Box height="50"></Box>
        </Box>
      )}
    </ScrollView>
  );
};

export default ProductDetailPage;
