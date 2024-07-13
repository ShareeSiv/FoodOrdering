import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
  <View style={styles.container}>
    <Image 
    source={{ uri : product.image || defaultPizzaImage}} 
    style={styles.image} 
    resizeMode='contain'
    />
    <Text style={styles.title}>{product.name}</Text>
    <Text>${product.price}</Text>
  </View>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',


  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center'
  }
});