/**
 * Magento Settings for the app,
 * Follow instructions: https://github.com/troublediehard/magento-react-native/wiki/Setup
 *
 * url                     : Base url of the magento website
 * home_cms_block_id       : Block id which contain json data,
 *                           which will be shown in Home screen
 * access_token            : Token to access magento API, without it
 *                           app won't work
 */
export const magentoOptions = {
  url: 'https://mage.obeezi.com/',
  home_cms_block_id: '238',
  store: 'default', // store code // Stores > All Stores > Store View > Code
  authentication: {
    integration: {
      access_token: 'hdpmga8cjtfli6cnltr6hdz1zknfal1k',
    },
  },
};

/**
 * Magento 2 REST API doesn't return currency symbol,
 * so manually specify all currency symbol(that your store support)
 * along side their currency code.
 */
export const currencySymbols = Object.freeze({
  NGN: '₦',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  CAD: 'CA$',
  CNY: 'CN¥',
  JPY: '¥',
  SEK: 'SEK',
  CHF: 'CHF',
  INR: '₹',
  KWD: 'د.ك',
  RON: 'RON',
});
