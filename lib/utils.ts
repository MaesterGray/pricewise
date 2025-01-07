import { PriceHistoryItem,Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractPrice(...elements){
    for (const element of elements){
        const priceText = element.text().trim()

        if(priceText) return priceText.replace(/\D/g,'')
    }
    return ''
}

export function extractDescription($) {
    // these are possible elements holding description of the product
    const selectors = [
      ".a-unordered-list .a-list-item",
      ".a-expander-content p",
      // Add more selectors here if needed
    ];
  
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const textContent = elements
          .map((_, element) => $(element).text().trim())
          .get()
          .join("\n");
        return textContent;
      }
    }
  
    // If no matching elements were found, return an empty string
    return "";
  }
  
export function extractCurrency(element){
    const currencyText = element.text().trim().slice(0,1);
    return currencyText ? currencyText : '';
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export function extractFirstNumber(input: string): string | null {
  const regex = /(\d+)\./;
  const match = input.match(regex);
  
  return match ? match[1] : null;
}
export function removeDollarSign(price: string): string {
    if (!price) return '';
    // Match first occurrence of $number.number pattern
    const regex = /\$(\d+\.\d+)/;
    const match = price.match(regex);
    return match ? match[1] : '';
}

// Example:
// removeDollarSign('$99.99$199.99') // returns '99.99'
// Example usage:
// const cleanPrice = removeDollarSign('$99.99'); // returns '99.99'