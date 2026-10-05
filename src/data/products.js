import formalShirt from "../assets/products/formal-shirt.png";
import formalDetail1 from "../assets/products/formal-detail-1.png";
import formalDetail2 from "../assets/products/formal-detail-2.png";
import formalDetail3 from "../assets/products/formal-detail-3.png";

import exerciseOutfit from "../assets/products/exercise-outfit.png";
import exerciseDetail1 from "../assets/products/exercise-detail-1.png";
import exerciseDetail2 from "../assets/products/exercise-detail-2.png";
import exerciseDetail3 from "../assets/products/exercise-detail-3.png";

import yellowJacket from "../assets/products/yellow-jacket.png";
import yellowDetail1 from "../assets/products/yellow-detail-1.png";
import yellowDetail2 from "../assets/products/yellow-detail-2.png";
import yellowDetail3 from "../assets/products/yellow-detail-3.png";

const products = [
  {
    id: "formal-shirt",
    name: "Formal Shirt For Woman",
    price: "14.55",
    image: formalShirt,
    category: "Casual Wear",

    details: [
      formalDetail1,
      formalDetail2,
      formalDetail3,
    ],

    rating: "5.00",
    stock: "In Stock",

    description:
      "Elegant formal shirt designed for a polished and comfortable everyday look.",

    fitting: {
      title: "Fitting",
      content: [
        "Regular fit",
        "Comfortable silhouette",
        "Designed for easy movement",
      ],
    },

    fabricCare: {
      title: "Fabric & Care",
      fabric: [
        "Soft woven fabric",
        "Lightweight and comfortable",
        "Smooth finish",
      ],
      care: [
        "Cold machine wash",
        "Line dry",
        "Do not bleach",
        "Do not tumble dry",
      ],
    },

    productDetail: [
      "Women's formal shirt",
      "Classic everyday styling",
      "Comfortable fit",
      "Suitable for casual and formal occasions",
    ],

    shipping: {
      title: "Shipping And Return",
      shipping: [
        "Free shipping on eligible orders",
        "Orders are carefully packed before dispatch",
      ],
      returns: [
        "Unwashed and unworn items may be eligible for return",
        "Returns should be requested within 30 days of purchase",
        "Final sale items are not eligible for return",
      ],
    },

    material: {
      title: "Fabric",
      description:
        "A soft and lightweight fabric selected for comfortable daily wear and a clean formal appearance.",
      tags: [
        "Lightweight",
        "Soft Touch",
        "Easy Care",
      ],
    },

    returnPolicy: [
      "Returns are subject to product condition.",
      "Items must be unworn and unwashed.",
      "Returns must be requested within the applicable return period.",
      "Final sale items are not eligible for returns.",
    ],
  },

  {
    id: "exercise-outfit",
    name: "Black and gray Exercise outfit",
    price: "29.00",
    image: exerciseOutfit,
    category: "Casual Wear",

    details: [
      exerciseDetail1,
      exerciseDetail2,
      exerciseDetail3,
    ],

    rating: "5.00",
    stock: "In Stock",

    description:
      "Comfortable black and gray exercise outfit designed for active movement and everyday workouts.",

    fitting: {
      title: "Fitting",
      content: [
        "Comfortable activewear fit",
        "Designed for movement",
        "Flexible silhouette",
      ],
    },

    fabricCare: {
      title: "Fabric & Care",
      fabric: [
        "Stretch performance fabric",
        "Lightweight construction",
        "Designed for active movement",
      ],
      care: [
        "Cold machine wash",
        "Line dry",
        "Do not bleach",
        "Do not use fabric softener",
      ],
    },

    productDetail: [
      "Black and gray exercise outfit",
      "Designed for active movement",
      "Comfortable everyday sports styling",
      "Suitable for workouts and casual wear",
    ],

    shipping: {
      title: "Shipping And Return",
      shipping: [
        "Free shipping on eligible orders",
        "Orders are carefully packed before dispatch",
      ],
      returns: [
        "Returns are accepted for eligible unused items.",
        "Items should be unworn and unwashed.",
        "Damage-related claims require an opening video.",
      ],
    },

    material: {
      title: "Performance Fabric",
      description:
        "A flexible performance material designed to provide comfortable movement during exercise while remaining suitable for everyday wear.",
      tags: [
        "Quick Dry",
        "Stretch Fabric",
        "Breathable",
      ],
    },

    returnPolicy: [
      "No returns or exchanges for colour changes.",
      "Returns or replacements are accepted only if the product is damaged.",
      "An unboxing/opening video is mandatory to claim any damage-related replacement.",
      "Damage claims without an opening video will not be accepted.",
    ],
  },

  {
    id: "yellow-jacket",
    name: "Yellow Jacket For Winter",
    price: "14.55",
    image: yellowJacket,
    category: "Casual Wear",

    details: [
      yellowDetail1,
      yellowDetail2,
      yellowDetail3,
    ],

    rating: "5.00",
    stock: "In Stock",

    description:
      "Warm yellow winter jacket with a stylish design suitable for cool-weather everyday wear.",

    fitting: {
      title: "Fitting",
      content: [
        "Comfortable winter fit",
        "Room for layering",
        "Relaxed silhouette",
      ],
    },

    fabricCare: {
      title: "Fabric & Care",
      fabric: [
        "Warm outer fabric",
        "Soft inner construction",
        "Designed for cool weather",
      ],
      care: [
        "Gentle machine wash",
        "Use cold water",
        "Line dry",
        "Do not bleach",
      ],
    },

    productDetail: [
      "Yellow winter jacket",
      "Warm everyday outerwear",
      "Comfortable winter styling",
      "Suitable for casual outdoor wear",
    ],

    shipping: {
      title: "Shipping And Return",
      shipping: [
        "Free shipping on eligible orders",
        "Products are packed securely before dispatch",
      ],
      returns: [
        "Unused and unworn items may be eligible for return.",
        "Items should be returned in original condition.",
        "Final sale items are not eligible for returns.",
      ],
    },

    material: {
      title: "Winter Material",
      description:
        "A warm and comfortable outer material designed to provide everyday protection during cool weather.",
      tags: [
        "Warm",
        "Comfortable",
        "Winter Wear",
      ],
    },

    returnPolicy: [
      "Returns are subject to product condition.",
      "Items must be unused and unworn.",
      "Damage-related replacements require appropriate supporting evidence.",
      "Final sale items are not eligible for returns.",
    ],
  },
];

export default products;