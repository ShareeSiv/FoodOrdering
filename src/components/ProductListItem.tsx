import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';


const ProductListItem = ({ product }) => {
  return (
  <View style={styles.container}>
    <Image source={{ uri : product.image}} style={styles.image} />
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
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center'
  }
});