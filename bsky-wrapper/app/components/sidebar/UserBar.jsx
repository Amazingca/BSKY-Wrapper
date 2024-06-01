import ActionIcon from "./ActionIcon";
import {
    MoonIcon,
    SunIcon,
    DeviceDesktopIcon,
    KebabHorizontalIcon
} from "@primer/octicons-react";
import { useLocation, useNavigate, Link } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import Button from "../interactable/Button";

const UserBar = ({tryAuthorize, localData, display, authorized, apiInterface}) => {

    const toggleTheme = () => {

        display.toggle();
    }

    const location = useLocation();
    const navigate = useNavigate();

    const loginSwitch = () => {

        if (location.pathname != "/login") navigate("./login");
    }

    const MentionIcon = () => (
        <svg width="2rem" height="2rem" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.593751 0.296253C0.409218 0.40506 0.275115 0.582332 0.220612 0.789505C0.16611 0.996678 0.195618 1.21699 0.302717 1.40252C0.409816 1.58805 0.585842 1.72378 0.792503 1.7802C0.999164 1.83661 1.21974 1.80914 1.40625 1.70375C1.4277 1.69233 1.45275 1.68968 1.47611 1.69637C1.49948 1.70306 1.51933 1.71856 1.53149 1.7396C1.54365 1.76064 1.54716 1.78558 1.54129 1.80916C1.53541 1.83274 1.52061 1.85312 1.5 1.866C1.31094 1.97523 1.09133 2.01957 0.874697 1.99226C0.658068 1.96494 0.456337 1.86746 0.300316 1.71471C0.144295 1.56196 0.0425625 1.36234 0.0106573 1.14634C-0.0212479 0.930342 0.0184284 0.709835 0.123626 0.518503C0.229113 0.326117 0.394945 0.173763 0.595563 0.0849242C0.796181 -0.00391508 1.02045 -0.0243086 1.2338 0.0268868C1.44715 0.0780821 1.63775 0.198025 1.7762 0.368228C1.91466 0.538431 1.9933 0.749447 2 0.968753V1.15625C2.00004 1.23071 1.97591 1.30317 1.93123 1.36273C1.88655 1.4223 1.82374 1.46574 1.75224 1.48653C1.68074 1.50732 1.60443 1.50434 1.53478 1.47803C1.46512 1.45172 1.40589 1.4035 1.366 1.34063C1.28671 1.42603 1.18008 1.48104 1.06453 1.49616C0.948989 1.51128 0.831792 1.48556 0.7332 1.42344C0.634607 1.36132 0.560816 1.2667 0.524581 1.15595C0.488345 1.04519 0.491942 0.925261 0.534751 0.816878C0.5774 0.708536 0.656523 0.618475 0.758472 0.56223C0.860421 0.505985 0.978803 0.487084 1.0932 0.508787C1.20759 0.530489 1.31082 0.591435 1.38509 0.68111C1.45936 0.770786 1.5 0.883568 1.5 1V1.15625C1.5 1.19769 1.51646 1.23744 1.54577 1.26674C1.57507 1.29604 1.61481 1.3125 1.65625 1.3125C1.69769 1.3125 1.73743 1.29604 1.76674 1.26674C1.79604 1.23744 1.8125 1.19769 1.8125 1.15625V0.983378C1.80962 0.84217 1.76999 0.704151 1.6975 0.582933C1.62502 0.461716 1.52218 0.361487 1.39915 0.292132C1.27611 0.222778 1.13712 0.186693 0.995886 0.187438C0.854651 0.188182 0.716049 0.22573 0.593751 0.296378V0.296253ZM1.3125 1C1.3125 0.917123 1.27958 0.837638 1.22097 0.779032C1.16237 0.720427 1.08288 0.687503 1 0.687503C0.91712 0.687503 0.837635 0.720427 0.77903 0.779032C0.720425 0.837638 0.687501 0.917123 0.687501 1C0.687501 1.08288 0.720425 1.16237 0.77903 1.22097C0.837635 1.27958 0.91712 1.3125 1 1.3125C1.08288 1.3125 1.16237 1.27958 1.22097 1.22097C1.27958 1.16237 1.3125 1.08288 1.3125 1Z" fill="url(#paint0_linear_434_117)"/>
            <defs>
                <linearGradient id="paint0_linear_434_117" x1="-2.83483e-09" y1="-6.18735e-09" x2="2" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--accent-primary)"/>
                    <stop offset="1" stopColor="var(--accent-secondary)"/>
                </linearGradient>
            </defs>
        </svg>
    )

    const [avatar, setAvatar] = useState("");
    const [showUserOptions, setShowUserOptions] = useState(false);

    const doSetAvatar = async () => {

        const userObj = await apiInterface.getProfile(apiInterface.getAuthorization().did);

        setAvatar(userObj.avatar);
    }
    
    if (authorized == true) doSetAvatar();

    // "Complex" state setter to make sure that we properly initalize the auto checker on load
    const [isLocal, setLocality] = useState(false);
    useEffect(() => {

        setLocality(true);
    }, []);

    const doSetShowUserOptions = (newState) => setShowUserOptions(newState);

    const switchPrimaryUser = (newPrimaryUser) => {

        if (localData.switchPrimaryUser(newPrimaryUser) == true) tryAuthorize();
    }

    const logOutUser = async () => {

        if (await apiInterface.deleteSession() == true) tryAuthorize();
    }

    var index = 0;

    const LoginWith = () => (authorized) ? (
        <div onClick={() => doSetShowUserOptions(!showUserOptions)} className={`LoginWith Authorized${(showUserOptions) ? " Enabled" : " NotEnabled"}`}>
            {(showUserOptions == false) ? (
                <>
                    <h2>@{apiInterface.getAuthorization().handle}</h2>
                    <div className={"Options"}>
                        <KebabHorizontalIcon size={"small"} />
                    </div>
                </>
            ) : localData.getUsers().map(user => <Fragment key={user.did + index++}>
                {(user.accessJwt != apiInterface.getAuthorization().accessJwt && user.refreshJwt != apiInterface.getAuthorization().refreshJwt) ? <>
                    <h2 onClick={() => switchPrimaryUser(user)}>@{user.handle}</h2>
                    <div className="SeparationLine"></div>
                </> : <div className={"UserOptions"}>
                    <Button text="Add User" clicker={() => navigate("/login")} />
                    <Button text="Logout" clicker={() => logOutUser()} />
                </div>}
            </Fragment>)}
        </div>
    ) : (
        <Link to="/login" className={"LoginWith"}>
            <h2>Login with</h2>
            <MentionIcon />
        </Link>
    );

    return (
        <div className={"UserBar"}>
            <LoginWith />
            <div onClick={toggleTheme} className={"ProfileThemeIcon"}>
                {(authorized == true) && <img src={avatar} />}
                <ActionIcon Icon={(isLocal && display.toAuto()) ? DeviceDesktopIcon : (display.theme == "light") ? MoonIcon : (display.theme == "dark") && SunIcon} mainColor="--action-item-secondary" />
            </div>
        </div>
    )
}

export default UserBar;