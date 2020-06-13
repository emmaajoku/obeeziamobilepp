import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, StyleSheet, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MaterialHeaderButtons, Text, Item } from '../common';
import {
  NAVIGATION_HOME_PRODUCT_PATH,
} from '../../navigation/routes';
import { getHomeData, setCurrentProduct } from '../../actions';
import HomeSlider from './HomeSlider';
import CurrencyPicker from './CurrencyPicker';
import FeaturedProducts from './FeaturedProducts';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import Sizes from '../../constants/Sizes';
import HeaderLogo from './HeaderLogo'

class HomeScreen extends Component {
  static contextType = ThemeContext;

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderLogo/>,
    headerBackTitle: ' ',
    headerLeft: (
      <MaterialHeaderButtons>
        <Item title="menu" iconName="menu" onPress={navigation.getParam('toggleDrawer')} />
      </MaterialHeaderButtons>
    ),
    headerRight: <CurrencyPicker />,
  });

  componentDidMount() {
    const { navigation } = this.props;
    if (this.props.slider.length === 0) {
      this.props.getHomeData();
    }
    navigation.setParams({ toggleDrawer: this.toggleDrawer });
  }

  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  onProductPress = (product) => {
    this.props.setCurrentProduct({ product });
    NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
      product,
      title: product.name,
    });
  };

  onRefresh = () => {
    this.props.getHomeData(true);
  };

  renderFeatured() {
    return _.map(this.props.featuredProducts, (value, key) => (
      <FeaturedProducts
        key={`featured${key}`}
        products={value}
        title={this.props.featuredCategories[key].title}
        onPress={this.onProductPress}
        currencySymbol={this.props.currencySymbol}
        currencyRate={this.props.currencyRate}
      />
    ));
  }

  render() {
    const theme = this.context;

    if (this.props.errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <Text>{this.props.errorMessage}</Text>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={(
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.onRefresh}
          />
          )}
      >
        <HomeSlider slider={this.props.slider} />
        {this.renderFeatured()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
  },
  buttonStyle: {
    marginTop: 10,
    alignSelf: 'center',
    width: Sizes.WINDOW_WIDTH * 0.9,
    marginBottom: 3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HomeScreen.propTypes = {
  slider: PropTypes.array,
  getHomeData: PropTypes.func,
  navigation: PropTypes.object,
  featuredProducts: PropTypes.object,
  featuredCategories: PropTypes.object,
  setCurrentProduct: PropTypes.func,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  refreshing: PropTypes.bool,
};

HomeScreen.defaultProps = {
  slider: [],
};


const mapStateToProps = (state) => {
  const { refreshing } = state.home;
  const {
    errorMessage,
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;
  return {
    ...state.home,
    refreshing,
    errorMessage,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, { getHomeData, setCurrentProduct })(HomeScreen);
