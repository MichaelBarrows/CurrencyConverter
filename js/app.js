/**
 * Currency Converter Object
 * this object is used to store various properties of the currency converter
 * and to perform it's operations. The stored properties include: the currency
 * to be converted to, the amount to be converted, the conversion rate, the
 * amount once it has been converted, and the symbol of the currency.
 */
function CurrencyConverter(currency, amount) {
  this.currency = currency;
  this.original_amount = amount;
  this.converted_amount = 0;
  this.rate = 0;
  this.symbol = undefined;
}

/**
 * Function that will get the exchange rates for a specified currency, convert
 * the original currency, round the converted currency to two decimal places and
 * display the conversion details and results to the user.
 */
CurrencyConverter.prototype.convert = function() {
  currency = this.currency;
  original_amount = this.original_amount;
  // The URL of the API that holds the currency conversion rates, appended
  // with the currency code, so as to only get that currency
  var url = 'https://api.fixer.io/latest?base=GBP&symbols=' + currency;
  // Retrieves the exchange rates from the Fixer API
  $.get(url, function(data) {
    // Checks if the currency is US, Australian or Canadian dollars, as these
    // use the same symbol
    if (currency == "USD" || currency == "AUD" || currency == "CAD") {
      // Sets the currency symbol to the dollar sign
      this.symbol =  "$";
      // Checks if the currency is US Dollars, and sets the currency rate to US
      // Dollars if true
      if (currency == "USD") {
        this.rate = data.rates.USD;
        // Checks if the currency is Australian Dollars, and sets the currency
        // rate to Australian Dollars if true
      } else if (currency == "AUD") {
        this.rate = data.rates.AUD;
        // Checks if the currency is Canadian Dollars, and sets the currency
        // rate to Canadian Dollars if true
      } else if (currency == "CAD") {
        this.rate = data.rates.CAD;
      }
      // Checks if the currency is Euro's, and sets the currency rate and symbol
      // to Euro's if true
    } else if (currency == "EUR") {
      this.symbol = "€";
      this.rate = data.rates.EUR;
      // Checks if the currency is the Japanese Yen and sets the currency rate
      // and symbol the Japanese Yen if true
    } else if (currency == "JPY") {
      this.symbol = "¥";
      this.rate = data.rates.JPY;
      // If one of the above currencies was not found prior, the user is asked
      // to select a currency
    } else {
      alert("Please select a currency");
    }
    // The amount entered by the user is converted to the new currency and
    // rounded to two decimal places
    this.converted_amount = original_amount * this.rate;
    this.converted_amount = this.converted_amount.toFixed(2);

    // The original amount is placed in a span, to be displayed to the user
    document.getElementById('original-amount').innerHTML = original_amount;
    // The converted amount is placed in a span, to be displayed to the user,
    // along with the currencies symbol
    document.getElementById('converted-amount').innerHTML = this.symbol + this.converted_amount;
    // The div element containing the conversion information is displayed to the
    // user
    document.getElementById('converted-container').style.display = "block";
    // The details of the conversion rate are placed in a 'p' element and shown
    // to the user
    document.getElementById('conversion-rate').innerHTML = "£1 GBP = " + this.symbol + this.rate + " " + currency;
  });
};

// Waits until the DOM is ready to be manipulated before any of the containing
// code can be run
$(document).ready(function(){
  $('select#currency').on('click', function(event) {
  var currency = $('select[name="currency"]').val();
  if (currency == "USD") {
    document.getElementById('currency').style.background = "url(img/USD.svg) right 40px center no-repeat";
  } else if (currency == "EUR") {
    document.getElementById('currency').style.background = "url(img/EUR.png) right 40px center no-repeat";
  } else if (currency == "JPY") {
    document.getElementById('currency').style.background = "url(img/JPY.png) right 40px center no-repeat";
  } else if (currency == "AUD") {
    document.getElementById('currency').style.background = "url(img/AUD.png) right 40px center no-repeat";
  } else if (currency == "CAD") {
    document.getElementById('currency').style.background = "url(img/CAD.png) right 40px center no-repeat";
  }

  document.getElementById('currency').style.backgroundSize = "40px";
});



  // Event handler for the submit button on the currency converter form
  $('form#currencyconverter').on('submit', function(event) {
    // Prevents the form from being submitted
    event.preventDefault();
    // Gets the user selected currency from the form and stores its value
    var currency = $('select[name="currency"]').val();
    // Gets the user entered amount for conversion from the form and stored its
    // value
    var amount = parseFloat($('input[name="amount"]').val()).toFixed(2);
    // Creates a new currency converter and sets the currency and original
    // amount properties using the values from the form
    var converter = new CurrencyConverter(currency, amount);
    // Checks if the user entered an numeric amount to be converted
    if (isNaN(converter.original_amount)) {
      // Error message is displayed to the user
      alert('Please enter an amount to convert');
    } else {
      // Calls the currency converter's 'conver' function to convert the
      // currency
      converter.convert();
    }
  });
});
