import React, { useState } from 'react';

import {
  View, WebView, ActivityIndicator, StyleSheet
} from 'react-native';

function Product({ navigation }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: navigation.state.params.product.url }}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={54} color="#ff9f43" />
        </View>
      )}
    </View>
  );
}

Product.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.product.title,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default Product;
