import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/slices/ProductsSlice';
import axios from 'axios';
import {ScrollEventCapture,getCurrentLocation} from 'raptorx-react-native-sd';
import { getFreeDiskStorage } from 'react-native-device-info';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
    // getCurrentLocation()
  }, []);
  function bytesToMB(bytes, decimals = 2) {
    if (bytes === 0) return "0 MB";
  
    const MB = 1024 * 1024; // Conversion factor (1 KiB = 1024 bytes)
    const mb = bytes / MB;
  
    return mb.toFixed(decimals) + " MB";
  }
  const getProducts = async () => {
    const data =await getFreeDiskStorage()
    console.log(bytesToMB(data))
    try {
      const {data} = await axios.get('https://fakestoreapi.com/products');
      dispatch(
        addProducts(
          data.map(item => {
            item.qty = 1;
          }),
        ),
      );
      setProducts(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.response.data);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/cart.png')}
        title={'Grocery App'}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />
      {loading ? (
        <ActivityIndicator color={'blue'} size={20} />
      ) : (
        <ScrollEventCapture> 
          {products.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item.title.length > 25
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>
                <Text style={styles.desc}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + '...'
                    : item.description}
                </Text>
                <Text style={styles.price}>{'$' + item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollEventCapture>
      )}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
});
