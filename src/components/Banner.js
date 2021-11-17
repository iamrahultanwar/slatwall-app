import React from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Image } from "native-base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const carouselItems = [
  {
    title: "Item 1",
    text: "Text 1",
    image:
      "https://rukminim1.flixcart.com/flap/1450/650/image/1de81cf5e3e3cdd9.jpg?q=20",
  },
  {
    title: "Item 2",
    text: "Text 2",
    image:
      "https://rukminim1.flixcart.com/flap/1450/650/image/a210995f0e5ad0a3.jpg?q=20",
  },
];
const Banner = () => {
  const _renderItem = ({ item, index }) => {
    return (
      <Image
        source={{
          uri: item.image,
        }}
        alt="Alternate Text"
        size="xl"
        width={windowWidth}
        height={160}
      />
    );
  };
  return (
    <View>
      <Carousel
        layout={"default"}
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        renderItem={_renderItem}
        onSnapToItem={(index) => {}}
      />
    </View>
  );
};

export default Banner;
