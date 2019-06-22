/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';

import api from '../services/api';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Starter'
  }

  state = {
    page: 1,
    docs: [],
    productInfo: {},
    loading: true,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true });
    }

    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;

    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      // eslint-disable-next-line react/destructuring-assignment
      docs: [...this.state.docs, ...docs],
      productInfo,
      page,
      loading: false,
    });
  }

  loadMore = () => {
    const { page, productInfo } = this.state;
    // eslint-disable-next-line no-useless-return
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            navigation.navigate('Product', { product: item });
          }}
        >
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { docs, loading } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    return (
      <View style={styles.container}>
        <FlatList
          data={docs}
          contentContainerStyle={styles.list}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={54} color="#ff9f43" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    color: '#999',
    lineHeight: 24,
    fontSize: 16,
    marginTop: 5,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ff9f43',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#ff9f43',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});
