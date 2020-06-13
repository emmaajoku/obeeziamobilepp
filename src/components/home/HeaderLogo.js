import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';

class HeaderLogo extends Component {
  onPress() {
    NavigationService.navigate(NAVIGATION_HOME_SCREEN_PATH, {
      title: 'Home'
    });
  }

  render() {
    return (
      <TouchableOpacity
      >       
        <Image
             style={{width: 100, height: 32}}
            source={require('../../assets/obeezi.png')}
          />
      </TouchableOpacity>
    );
  }
}

const styles = {
  iconStyle: {
    height: 32,
    width: 40,
    margin: 5,
    paddingRight: 10,
    marginRight: 0
  },
  textBackground: {
    backgroundColor: '#999',
    height: 15,
    width: 15,
    borderRadius: 15,
    marginLeft: 23
  },
  textStyle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  iconWrapper: {
    height: 32,
    width: 40,
    margin: 5,
    paddingRight: 10,
    marginRight: 0
  },
  iconBadgeStyle: {
    minWidth: 15,
    height: 15,
    backgroundColor: '#999'
  }
};

export default connect(null)(HeaderLogo);
