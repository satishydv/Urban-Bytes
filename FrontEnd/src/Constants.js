import { CgAdd } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


const BACK_END_API = "http://localhost:5000"
// const BACK_END_API = "https://punjabpizzaclub.onrender.com"

const AllCategory = [
    "Pizza",
    "Burger",
    "Sharwaama",
    "Paratha Roll",
    "Hot Wings",
];

// To show user navbar on these navbar
const RestrictPages = [
    "/",
    "/menu",
    "/about",
    "/contact",
    "/auth",
    "/checkout",
    "/user-profile",
    "/privacy",
    "/tofs"
];

const sideBarNavLins = [
    {
        name: "Home",
        link: "/",
        icon: AiOutlineHome,
    },
    {
        name: "Add Product",
        link: "/add-new-product",
        icon: CgAdd,
    },
    {
        name: "Products",
        link: "/all-products",
        icon: FaSitemap,
    },
    {
        name: "Orders",
        link: "/all-orders",
        icon: MdOutlineProductionQuantityLimits,
    },
    {
        name: "Customers",
        link: "/all-customers",
        icon: FaUsers,
    },
];

const SIZE_OPTIONS = ["Small", "Medium", "Large", "Xtra Large", "default"];



export { BACK_END_API, sideBarNavLins, AllCategory, RestrictPages, SIZE_OPTIONS }