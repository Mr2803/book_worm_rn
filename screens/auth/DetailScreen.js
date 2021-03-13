import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import colors from "../../assets/colors";

const DetailScreen = (props) => {
  const bookData = props.route.params.bookData;
  console.log(bookData);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {bookData.image ? (
          <Image
            source={{
              uri: bookData.image,
            }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../assets/default_book_image.jpg")}
            style={styles.image}
          />
        )}

        <Text>{bookData.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200,
  },
});

export default DetailScreen;
