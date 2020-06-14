import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Text, Price } from '../common';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { ThemeContext } from '../../theme';
import { finalPrice } from '../../helper/price';
import { useSelector } from 'react-redux';
import Sizes from '../../constants/Sizes';
const FeaturedProductItem = ({
  onPress,
  currencySymbol,
  currencyRate,
  product,
}) => {
  const theme = useContext(ThemeContext);
  const [themeStyles, setThemeStyle] = useState({});
  const [imageURI, setImageURI] = useState('');
  const price = useMemo(
    () => finalPrice(product.custom_attributes, product.price),
    [product.custom_attributes, product.price]
  );
  useEffect(
    () => setImageURI(getProductThumbnailFromAttribute(product)),
    [product]
  );
   useEffect(
    () => setThemeStyle({
      image: styles.imageStyle,
      text: styles.textStyle,
    }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => { onPress(product); }}
      >
        <Image
          style={themeStyles.image}
          resizeMode="contain"
          source={{ uri: imageURI }}
        />
        <View style={styles.infoStyle}>
          <Text
            type="subheading"
            style={themeStyles.text}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {product.name}
          </Text>
          <Price
            basePrice={product.price}
            discountPrice={price}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding: 5,
    width: Sizes.WINDOW_WIDTH * 0.45,
  },
  containerStyle: {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    marginTop: 15,
    fontSize: 11,
    fontWeight: '200',
    color: '#555',
  },
  priceStyle: {
    fontSize: 13,
    fontWeight: '200',
    textAlign: 'center',
  },
  imageStyle: {
    height: 120,
    width: 110
  },
});

FeaturedProductItem.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  product: PropTypes.object,
};

FeaturedProductItem.defaultProps = {};

export default FeaturedProductItem;
