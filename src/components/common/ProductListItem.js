import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image} from 'react-native';
import { Text } from './Text';
import { Price } from './Price';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { ThemeContext } from '../../theme';
import { finalPrice } from '../../helper/price';
import Sizes from '../../constants/Sizes';
import { Platform } from '@unimodules/core';
const ProductListItem = ({
  product,
  onRowPress,
  currencySymbol,
  currencyRate,
  imageStyle,
  infoStyle,
  textStyle,
  priceStyle,
  viewContainerStyle,
  columnContainerStyle,
}) => {
  const theme = useContext(ThemeContext);
  const image = () => getProductThumbnailFromAttribute(product);

  return (
    <View style={viewContainerStyle}>
      <TouchableOpacity
        style={[styles.containerStyle, columnContainerStyle]}
        onPress={() => { onRowPress(product); }}
      >

        <Image
          style={[styles.imageStyle, imageStyle]}
          resizeMode="contain"
          source={{ uri: image() }}
        />
        <View style={[styles.infoStyle, infoStyle]}>
          <Text type="subheading" style={[styles.textStyle, textStyle]}>{product.name}</Text>
          <Price
            style={styles.textStyle}
            basePrice={product.price}
            discountPrice={finalPrice(product.custom_attributes, product.price)}
            currencyRate={currencyRate}
            currencySymbol={currencySymbol}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    sku: PropTypes.string.isRequired,
    type_id: PropTypes.string,
    price: PropTypes.number,
    custom_attributes: PropTypes.arrayOf(PropTypes.shape({
      attribute_code: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })),
  }).isRequired,
  onRowPress: PropTypes.func,
  imageStyle: PropTypes.object,
  infoStyle: PropTypes.object,
  textStyle: PropTypes.object,
  priceStyle: PropTypes.object,
  viewContainerStyle: PropTypes.object,
  columnContainerStyle: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

ProductListItem.defaultProps = {
  onRowPress: () => { },
  imageStyle: {},
  infoStyle: {},
  textStyle: {},
  priceStyle: {},
  viewContainerStyle: {},
  columnContainerStyle: {},
};

const styles = {
  container: {
    padding: 5,
    width: Sizes.WINDOW_WIDTH * 0.32,
  },
  containerStyle:{
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.WINDOW_WIDTH * 0.50,
  },
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex:0.5,
  },
  textStyle:{
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '200',
    color: '#555',
  },
  imageStyle:{
    height:  Platform === 'ios' ? 180 : 180,
    width: 160,
  },
};

export { ProductListItem };
