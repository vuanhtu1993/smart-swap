import { Fragment, useState, useEffect } from "react";
import "./styles.css";
import WebFont from "webfontloader";

import MobileSidebar from "./patterns/mobileSidebar";
import Sidebar from "./patterns/sidebar";
import { Coins } from "./coinList";
import { defaultCoins } from "./defaultCoinList";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { abi } from "./pancakeabi.js";
import { abii } from "./acscrypto.js";

//importing media assets
import close from "./assets/icons/close.svg";
import info from "./assets/icons/info.svg";
import searchImg from "./assets/icons/search.svg";
import wallet from "./assets/icons/wallet.svg";
import menu from "./assets/icons/menu.svg";
import down from "./assets/icons/down.svg";
import exchange from "./assets/icons/swap.svg";
import logolandscape from "./assets/logo/logolandscape.png";
import acs from "./assets/exchanges/acs.svg";
import pcs from "./assets/exchanges/pcs.png";
import nightimg from "./assets/icons/nightimg.svg";
import dayimg from "./assets/icons/dayimg.svg";
import nightmode from "./assets/icons/nightmode.svg";
import daymode from "./assets/icons/daymode.svg";
import busd from "./assets/coins/busd.png";
import usdt from "./assets/coins/usdt.png";

export default function App() {
  const [isConnect, setIsConnect] = useState("Connect Wallet");
  const [myData, setMyData] = useState({ connect: "", theme: false });
  const [darkTheme, setDarkTheme] = useState(false);
  const [results, setResults] = useState();
  const [fromCoin, setFromCoin] = useState("BUSD");
  const [toCoin, setToCoin] = useState("USDT");
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [fromImg, setFromImg] = useState(busd);
  const [toImg, setToImg] = useState(usdt);
  const [fromAddress, setFromAddress] = useState(
    "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  );
  const [toAddress, setToAddress] = useState(
    "0x55d398326f99059ff775485246999027b3197955"
  );
  const [amountIn, setAmountIn] = useState(null);
  const [amountOut, setAmountOut] = useState(null);
  const [pcsAmountOut, pcsSetAmountOut] = useState(null);
  const [acsAmountOut, acsSetAmountOut] = useState(null);

  const [isModalOpenOne, setModalStateOne] = useState(false);
  const [isModalOpenTwo, setModalStateTwo] = useState(false);
  const [price, setPrice] = useState(0);
  const [methodType, setMethodType] = useState("Direct");
  const [sidebarActive, setSidebarActive] = useState(false);
  const [pricePercent, setPricePercent] = useState(false);
  const [search, setSearch] = useState("");
  const [directHopAmount, setDirectHopAmount] = useState(0);
  const [singleHopAmount, setSingleHopAmount] = useState(0);
  const [multiHopAmount, setMultiHopAmount] = useState(0);
  const [singleHopSymbol, setSingleHopSymbol] = useState("");
  const [address, setAddress] = useState("Connect Wallet");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setDarkTheme(data.theme);
    }
  }, []);

  // useEffect(() => {
  //     localStorage.setItem('user', JSON.stringify(myData));
  //   }, [myData]);
  var main = [];
  var multi = [];

  async function constructor() {
    const ethereum = window.ethereum;

    window.ethereum.enable();

    // Example 1: Log chainId
    ethereum
      .request({ method: "eth_chainId" })
      .then((chainId) => {
        console.log(`hexadecimal string: ${chainId}`);
        console.log(`decimal number: ${parseInt(chainId, 16)}`);
      })
      .catch((error) => {
        console.error(
          `Error fetching chainId: ${error.code}: ${error.message}`
        );
      });

    // Example 2: Log last block
    ethereum
      .request({
        method: "eth_getBlockByNumber",
        params: ["latest", true]
      })
      .then((block) => {
        console.log(`Block ${block.number}:`, block);
      })
      .catch((error) => {
        console.error(
          `Error fetching last block: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
        );
      });

    // Example 3: Log available accounts
    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        //console.log(`Accounts:\n${accounts.join("\n")}`);
        setIsConnect(accounts.join());
        setAddress(accounts.join());
      })
      .catch((error) => {
        console.error(
          `Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
        );
      });

    // Example 4: Log new blocks
    // ethereum
    //   .request({
    //     method: "eth_subscribe",
    //     params: ["newHeads"]
    //   })
    //   .then((subscriptionId) => {
    //     ethereum.on("message", (message) => {
    //       if (message.type === "eth_subscription") {
    //         const { data } = message;
    //         if (data.subscription === subscriptionId) {
    //           if ("result" in data && typeof data.result === "object") {
    //             const block = data.result;
    //             const tempy = block.number;
    //             //setBlock(tempy);
    //             console.log(`New block ${block.number}:`, block);
    //           } else {
    //             console.error(`Something went wrong: ${data.result}`);
    //           }
    //         }
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(
    //       `Error making newHeads subscription: ${error.message}.
    //    Code: ${error.code}. Data: ${error.data}`
    //     );
    //   });

    // Example 5: Log when accounts change
    // const logAccounts = (accounts) => {
    //   console.log(`Accounts:\n${accounts.join("\n")}`);
    // };
  }
  // const address = web3.eth.defaultAccounts;
  // console.log(address);

  WebFont.load({
    custom: {
      families: ["gilroy-medium"],
      urls: ["./assets/fonts/Gilroy-Medium.ttf"]
    }
  });

  function setmul(a) {
    console.log("set");
    multi.push(a);
  }

  //const web3 = new Web3(
  // new Web3.providers.HttpProvider("https://bsc-dataseed3.defibit.io")
  //);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed2.ninicoin.io")
  );

  const pancake = new web3.eth.Contract(
    abi,
    "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F"
  );
  const acscrypto = new web3.eth.Contract(
    abii,
    "0xb3F0C9ea1F05e312093Fdb031E789A756659B0AC"
  );

  async function filterBest() {
    console.log(directHopAmount, "direct");
    console.log(singleHopAmount, "single");
    console.log(multiHopAmount, "multi");
    if (directHopAmount > singleHopAmount && directHopAmount > multiHopAmount) {
      setAmountOut(directHopAmount);
      pcsSetAmountOut(directHopAmount);
    } else if (
      singleHopAmount > directHopAmount &&
      singleHopAmount > multiHopAmount
    ) {
      setAmountOut(singleHopAmount);
      pcsSetAmountOut(singleHopAmount);
    } else {
      setAmountOut(multiHopAmount);
      pcsSetAmountOut(multiHopAmount);
    }
  }

  async function acsp(amount) {
    const acspr = await acscrypto.methods
      .get_dy(fromIndex, toIndex, amount)
      .call();
    console.log(acspr);
    acsSetAmountOut(acspr);
  }

  async function geet(direct, single, multiHop) {
    if (direct > single && direct > multiHop) {
      console.log(direct);
    }
    if (single > direct && single > multiHop) {
      console.log(single);
    }
    if (multiHop > direct && multiHop > single) {
      console.log(multiHop);
    }
  }

  const mapp = Coins.map((coin) => coin).filter(
    (fil) => fil.symbol !== fromCoin && fil.symbol !== toCoin
  );
  var out = [];
  var check = [];
  var singleHop = [];
  var final = [];
  var best = 0;
  var temp = 0;
  var tem;

  //multihop

  const handleThemeToggler = async () => {
    setDarkTheme(!darkTheme);
    setMyData({ theme: darkTheme });
    localStorage.setItem("user", JSON.stringify(myData));
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const togglePricePercent = () => {
    setPricePercent(!pricePercent);
  };

  // useEffect(() => {
  //   if (directHopAmount > singleHopAmount && directHopAmount > multiHopAmount) {
  //     pcsSetAmountOut(directHopAmount);
  //     console.log("direct method is max");
  //   }
  //   if (singleHopAmount > directHopAmount && singleHopAmount > multiHopAmount) {
  //     pcsSetAmountOut(singleHopAmount);
  //     console.log("single method is max");
  //     console.log(singleHopSymbol);
  //   }
  //   if (multiHopAmount > singleHopAmount && multiHopAmount > singleHopAmount) {
  //     pcsSetAmountOut(multiHopAmount);
  //     console.log("multi method is max");
  //   }

  //   console.log(pcsAmountOut);
  // }, [directHopAmount, singleHopAmount, multiHopAmount]);

  // async function setLocalData() {
  //   setMyData({ theme: darkTheme });
  //   console.log(myData);
  // }

  /**============ Direct Pair ==============**/
  async function directPair(value) {
    main.push([]);
    // var amt = (value * Math.pow(10, 18)).toString();
    tem = await pancake.methods
      .getAmountsOut((value * Math.pow(10, 18)).toString(), [
        fromAddress,
        toAddress
      ])
      .call();

    const temp = tem[1] / Math.pow(10, 18);
    setDirectHopAmount((tem[1] / Math.pow(10, 18)).toString());
    main[0].push(temp);
    return tem[1] / Math.pow(10, 18);
  }
  /**============ Direct Pair ==============**/

  /**================ SINGLE HOP =================== */
  async function singleHopMethod(value) {
    let amt = (value * Math.pow(10, 18)).toString();
    let k = 0;
    main.push([]);
    await Promise.all(
      mapp.map(async (val, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut(amt, [fromAddress, val.address, toAddress])
            .call();

          check.push(val);
          singleHop.push(tem[2] / Math.pow(10, 18), val.symbol);

          if (tem[2] / Math.pow(10, 18) > temp) {
            temp = tem[2] / Math.pow(10, 18);
            console.log(temp, val.symbol);
            setSingleHopSymbol(val.symbol);
            setPrice(temp);
            setSingleHopAmount(temp);
            k = temp;
            setAmountOut(k);
            pcsSetAmountOut(k);
            main[1].push(temp);
          }
        } catch {
          //console.log("err");
        }
      })
    );
    console.log("k", k);
    return k;
  }
  /**================ SINGLE HOP =================== */

  /**================ MULTI HOP =================== */

  var a = [];
  var prev = 0;

  async function multiHop(value) {
    main.push([]);
    var temp = 0;
    var teemp;

    var af;
    var bf;
    Promise.all(
      Coins.map(async (levelone, indexOne) => {
        if (
          levelone.address !== fromAddress &&
          Coins[indexOne].address !== toAddress
        ) {
          a.push([]);
          try {
            temp = await pancake.methods
              .getAmountsOut("1000000000000000000", [
                fromAddress,
                levelone.address
              ])
              .call();

            Coins.map(async (levelTwo, indexTwo) => {
              if (levelone.address !== levelTwo.address) {
                try {
                  temp = await pancake.methods
                    .getAmountsOut(Web3.utils.toWei(value), [
                      fromAddress,
                      levelone.address,
                      levelTwo.address,
                      toAddress
                    ])
                    .call();
                  const et = temp[3] / Math.pow(10, 18);

                  a[indexOne].push(et);

                  if (et > prev) {
                    prev = et;
                    teemp = prev;

                    af = levelone.address;
                    bf = levelTwo.address;
                    main[2].push(et);
                  }
                } catch {}
              }
            });
          } catch {}
        }
      })
    );
    console.log("prev", prev);
    return prev;
    // await filterBest();
  }
  /**================ MULTI HOP =================== */

  //fixing decimal numbers
  function getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  const list = [
    {
      id: 0,
      exchange: "Pancake swap",
      return: getFlooredFixed(pcsAmountOut, 2),
      price: isNaN(pcsAmountOut / amountIn)
        ? 0
        : getFlooredFixed(pcsAmountOut / amountIn, 2),
      fees: 10,
      img: pcs
    },

    {
      id: 1,
      exchange: "Acryptos",
      return: getFlooredFixed(acsAmountOut, 2),
      price: isNaN(acsAmountOut / amountIn)
        ? 0
        : getFlooredFixed(acsAmountOut / amountIn, 2),
      fees: 10,
      img: acs
    }
  ];

  //swapping from and to of input
  function interchange() {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    pcsSetAmountOut(null);
    setFromImg(toImg);
    setToImg(fromImg);
    //setAmountIn(null);
  }

  // async function bestHop() {
  //   console.log(directHopAmount);
  //   console.log(singleHopAmount);
  //   console.log(multiHopAmount);
  //   if (directHopAmount > singleHopAmount && directHopAmount > multiHopAmount) {
  //     pcsSetAmountOut(directHopAmount);
  //     console.log("direct method is max");
  //   }
  //   if (singleHopAmount > directHopAmount && singleHopAmount > multiHopAmount) {
  //     pcsSetAmountOut(singleHopAmount);
  //     console.log("single method is max");
  //     console.log(singleHopSymbol);
  //   }
  //   if (multiHopAmount > singleHopAmount && multiHopAmount > singleHopAmount) {
  //     pcsSetAmountOut(multiHopAmount);
  //     console.log("multi method is max");
  //     console.log(finalPriceListSymbol);
  //     console.log(finalPriceListSymbol[finalPriceListSymbol.length - 1]);
  //   }
  // }

  //handling user input
  const handleChange = async (e) => {
    setAmountIn(0);
    setAmountOut(0);
    return new Promise(async (resolve) => {
      if (e.target.value !== "") {
        if (e.target.value < 0) {
          e.target.value = 0;
        }
        setAmountIn(e.target.value);
        let val = e.target.value;

        await acsp(e.target.value);

        const dir = await directPair(val);
        //console.log(ret);
        console.log("direct");
        //acsp();

        console.log("single");
        const sing = await singleHopMethod(val);
        //acsp();

        console.log("multi");
        const mult = await multiHop(val);
        // //acsp();
        //console.log("filter");
        Promise.resolve(mainArray(main));
      }

      setTimeout(() => resolve(2), 70);
    });
  };

  // await geet(dir, sing, mult);
  // // await bestHop();

  // async function swap(ini,out,a,b,c,d,to) {
  //   await pancake.methods.swapExactTokensForTokens(ini,out,[a,b,c,d],to,time).send();
  // }

  async function swap(ini, out, a, b, to) {
    await pancake.methods
      .swapExactTokensForTokens(ini, out, [a, b], to, time)
      .send();
  }
  async function swap(ini, out, a, b, c, to) {
    await pancake.methods
      .swapExactTokensForTokens(ini, out, [a, c, b], to, time)
      .send();
  }
  var m = [];
  async function mainArray(arr) {
    Promise.resolve(arr[2], (price) => {
      console.log("result");
      console.log(price);
    });

    console.log(price);
    var temp = 0,
      i;
    for (i = 0; i < m.length; i++) {
      console.log("in");
      if (m[i] > temp) {
        temp = m[i];
      }
      console.log(temp, "g");
    }

    // console.log("ll", multi);
    // const len = multi.length;
    // const price = multi[len - 1];
    // console.log(price);

    // console.log(main[2][0], "yassss");
    // console.log(main[2][main[2].length - 1]);
    // console.log(multi, "1");

    // console.log(multi, "yassss");
  }

  // async function getBalance(){
  //   await
  // }

  //rendering Header
  const renderHeader = (
    <div className={darkTheme ? "header dark" : "header"}>
      <div className="header-logo">
        <img src={menu} alt="menu" onClick={toggleSidebar} />
        <img src={logolandscape} alt="logolandscape" />
      </div>
      <div className="search-input">
        <img src={searchImg} alt="search" />
        <input type="text" placeholder="search by address, project or token" />
      </div>
      <div className="header-block">
        {darkTheme ? (
          <div className="mode">
            <img src={dayimg} alt="dayimg" />
            <span>Day mode</span>
            <img
              src={nightmode}
              alt="mode"
              onClick={handleThemeToggler}
              style={{
                cursor: "pointer",
                width: 25,
                filter: darkTheme ? "invert(1)" : "invert(0)"
              }}
            />
          </div>
        ) : (
          <div className="mode">
            <img src={nightimg} alt="nightimg" />
            <span>Night mode</span>
            <img
              src={daymode}
              alt="mode"
              onClick={handleThemeToggler}
              style={{
                cursor: "pointer",
                width: 25,
                filter: darkTheme ? "invert(1)" : "invert(0)"
              }}
            />
          </div>
        )}
        <button className="button" onClick={() => constructor()}>
          {isConnect !== null || isConnect !== "" ? (
            <>
              <img src={wallet} alt="wallet" style={{ marginRight: 8 }} />
              {isConnect}
            </>
          ) : (
            isConnect
          )}
        </button>
      </div>
    </div>
  );

  //rendering form In
  const renderInForm = (
    <div className={darkTheme ? "input dark" : "input"}>
      <div onClick={() => setModalStateOne(true)}>
        <span>
          {fromCoin}
          <img className="icon-sm" src={down} alt="caret-down" />
        </span>
        <img src={fromImg} alt="coins" />
      </div>
      <input
        type="number"
        name="amountIn"
        // value={amountIn}
        onChange={handleChange}
      />
      <p>&asymp;&nbsp;$1.9997</p>
    </div>
  );

  //rendering form Out
  const renderOutForm = (
    <div className={darkTheme ? "input dark" : "input"}>
      <div onClick={() => setModalStateTwo(true)}>
        <span>
          {toCoin}

          <img className="icon-sm" src={down} alt="caret-down" />
        </span>
        <img src={toImg} alt="coins" />
      </div>
      <input value={amountOut} />
      <p>&asymp;&nbsp;$1.9997</p>
    </div>
  );

  const renderIcon = (
    <img
      className="icon"
      src={exchange}
      alt="icon-interchange"
      onClick={() => interchange()}
    />
  );

  //rendring form
  const renderForm = (
    <Fragment>
      {renderInForm}
      {renderIcon}
      {renderOutForm}
    </Fragment>
  );

  //handling modal
  const handleModal = (res, i) => {
    if (isModalOpenOne) {
      setModalStateOne(false);
      console.log(i);
      setFromIndex(i);
      setFromCoin(res.symbol);
      setFromAddress(res.address);
      setFromImg(res.logoURI);
    } else {
      setModalStateTwo(false);
      setToCoin(res.symbol);
      setToIndex(i);
      setToAddress(res.address);
      setToImg(res.logoURI);
    }
  };

  //filtering coins
  const filteredCoins = defaultCoins.filter((coin) => {
    return coin.symbol.toLowerCase().includes(search.toLowerCase());
  });

  //rendering search results of modal
  const renderSearchResults = (
    <div className="list-search-results">
      <div className="list-header">
        <span>Token name</span>
        <span>Price</span>
        <span>Balance</span>
      </div>
      <div>
        {filteredCoins.map((coin, i) => (
          <div key={coin.symbol} className="search-results">
            <div>
              <img class="icon" src={coin.logoURI} />
              <p
                style={{ cursor: "pointer" }}
                value={coin.symbol}
                onClick={() => handleModal(coin, i)}
              >
                {coin.symbol}
              </p>
            </div>
            <span>9.99</span>
            <span>0.00</span>
          </div>
        ))}
      </div>
    </div>
  );

  //rendering modal
  const renderMod = (
    <div className={darkTheme ? "backdrop" : "backdrop"}>
      <div className={darkTheme ? "modal-coin dark" : "modal-coin"}>
        <div className="header-modal-select-coins">
          <h5>Select a token</h5>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false)
            }
          >
            <img src={close} alt="close" />
          </span>
        </div>
        <div className="modal-input">
          <img src={searchImg} alt="search" />
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {renderSearchResults}
      </div>
    </div>
  );

  //rendering Lists
  const renderList = list.map((item) => (
    <div className="list-route" key={item.index}>
      <div className="exchange">
        <img src={item.img} alt="exchange-logo" />
        <span>{item.exchange}</span>
      </div>
      <p>{item.return}</p>
      <p>{item.price}</p>
      <p>≈&nbsp;$&nbsp;{item.fees}</p>
      <button className="button" onClick={() => swap()}>
        Swap
      </button>
    </div>
  ));

  //rendering routes
  const renderRoute = (
    <Fragment>
      <div className={darkTheme ? "route dark" : "route"}>
        <div className="header-list-routes">
          <b>Exchange</b>
          <b>Return</b>
          <b>Price</b>
          <b>Fees</b>
        </div>
        {renderList}
      </div>
    </Fragment>
  );

  let methods = ["Direct", "SingleHop", "MultiHop"];

  const handleRadioChange = async (e) => {
    setMethodType(e.target.value);
    setAmountIn("");
    pcsSetAmountOut("");
  };
  //rendering methods
  const renderMethod = (
    <>
      {methods.map((method) => (
        <>
          <input
            type="radio"
            value={method}
            name="methods"
            checked={methodType === method}
            onChange={handleRadioChange}
          />
          &nbsp;
          <span className="radio-input">{method}</span>
        </>
      ))}
    </>
  );

  return (
    <div className={darkTheme ? "App dark" : "App"}>
      <Sidebar darkTheme={darkTheme} />
      <div className="content">
        {sidebarActive ? (
          <MobileSidebar darkTheme={darkTheme} toggleSidebar={toggleSidebar} />
        ) : null}
        {renderHeader}
        {isModalOpenOne || isModalOpenTwo ? renderMod : null}
        <>
          <div className={darkTheme ? "swapper dark" : "swapper"}>
            <div className={darkTheme ? "title dark" : "title"}>
              <h1>Smart Swap</h1>
              <div>
                <img src={info} alt="info" />
                <p style={{ fontSize: 14 }}>
                  This feature is still in beta. Please use at your own risk
                </p>
              </div>
            </div>
            <div className={darkTheme ? "slides dark" : "slides"}>
              <span>Swap</span>
              <span>Swap history</span>
            </div>
            <div className="block">
              <div className="form">{renderForm}</div>
              <div
                className={
                  darkTheme ? "list-price-setting dark" : "list-price-setting"
                }
              >
                <p>Gas price: 120 Gwei</p>
                <div style={{ display: "flex", gridColumnGap: 8 }}>
                  {" "}
                  <p>Max price slippage: 1%</p>
                  <img
                    src={down}
                    alt="down"
                    onClick={togglePricePercent}
                    style={{
                      transform: pricePercent ? "rotate(0)" : "rotate(180deg)"
                    }}
                  />
                </div>
              </div>
              {pricePercent ? (
                <div
                  className={darkTheme ? "price-percent dark" : "price-percent"}
                >
                  <span>0.1%</span>
                  <span>0.5%</span>
                  <span>1%</span>
                  <span>custom</span>
                </div>
              ) : null}
              {/* <div className={darkTheme ? "block-radio dark" : "block-radio"}>
                {renderMethod}
              </div> */}
            </div>
          </div>
          {renderRoute}
        </>
      </div>
    </div>
  );
}
