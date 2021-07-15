import busd from "./assets/coins/busd.png";
import usdt from "./assets/coins/usdt.png";
import usdc from "./assets/coins/usdc.png";
import dai from "./assets/coins/dai.png";

export const defaultCoins = [
  {
    name: "BUSD Token",
    symbol: "BUSD",
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    chainId: 56,
    decimals: 18,
    logoURI: busd
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x55d398326f99059ff775485246999027b3197955",
    chainId: 56,
    decimals: 18,
    logoURI: usdt
  },
  {
    name: "Dai Token",
    symbol: "DAI",
    address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    chainId: 56,
    decimals: 18,
    logoURI: dai
  },
  {
    name: "Binance-Peg USD Coin",
    symbol: "USDC",
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    chainId: 56,
    decimals: 18,
    logoURI: usdc
  }
];
