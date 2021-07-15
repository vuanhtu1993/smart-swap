import "./mobilesidebar.css";

//media assets
import logoportrait from "../assets/logo/logoportrait.png";
import dashboardActive from "../assets/icons/dashboardactive.svg";
import dashboardinActive from "../assets/icons/dashboardinactive.svg";
import profileactive from "../assets/icons/profileactive.svg";
import profileinactive from "../assets/icons/profileinactive.svg";
import stableswapactive from "../assets/icons/stableswapactive.svg";
import stableswapinactive from "../assets/icons/stableswapinactive.svg";
import smartswapactive from "../assets/icons/smartswapactive.svg";
import smartswapinactive from "../assets/icons/smartswapinactive.svg";
import vaultactive from "../assets/icons/vaultactive.svg";
import vaultinactive from "../assets/icons/vaultinactive.svg";
import settingsactive from "../assets/icons/settingsactive.svg";
import settingsinactive from "../assets/icons/settingsinactive.svg";
import close from "../assets/icons/close.svg";

const MobileSidebar = ({ darkTheme, toggleSidebar }) => {
  return (
    <>
      <div className={darkTheme ? "mobsidebar dark" : "mobsidebar"}>
        <img
          src={close}
          className="close"
          alt="close"
          onClick={toggleSidebar}
        />
        <img src={logoportrait} alt="logo" className="logo" />
        <ul>
          <li>
            <img src={dashboardinActive} alt="vault" />
            <span>Dashboard</span>
          </li>
          <li>
            <img src={vaultinactive} alt="swap" />
            <span>Vault</span>
          </li>
          <li>
            <img src={stableswapinactive} alt="swap" />
            <span>Stable swap</span>
          </li>
          <li>
            <img src={smartswapinactive} alt="swap" />
            <span>Smart swap</span>
          </li>
        </ul>
        <a href="#" className="help">
          Need help?
        </a>
      </div>
      <div className="mob-backdrop"></div>
    </>
  );
};

export default MobileSidebar;
