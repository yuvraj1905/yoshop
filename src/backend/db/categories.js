import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    name: "TWS Earbuds",
    description: "No cables, no hassles. ASAP™ Fast Charge. ",
    image: [
      "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/ignacio_r_3yrJSb2fMT0_unsplash.jpeg",
    ],
    details:
      "Truly in ear wireless with no cables, no connectors, and no hassles. Designed for comfort and unstoppable music, always remain on your toes as tws earbuds brings to you the dopest tech there is out there!",
  },
  {
    _id: uuid(),
    name: "Headphones",
    description:
      "Instant Wake n’ Pair™ technology. Designed for comfort and unstoppable music   ",
    image: [
      "https://helios-i.mashable.com/imagery/reviews/01HUTTQhSs8SWLx3ouc0f7q/hero-image.fill.size_1200x1200.v1653070267.jpg",
    ],
    details:
      "Powered with Insta Wake n’ Pair™ technology & ASAP™ Fast Charge, these wireless Headphones power on and connect instantly right on power on. No more going into settings to find and pair the device, welcome to the new era of seamless, instant connection",
  },
  {
    _id: uuid(),
    name: "Neckbands",
    description: "Hands-free and lightweight solution for listening needs",
    image: ["https://m.media-amazon.com/images/I/71jLtvkLrPL._SL1500_.jpg"],
    details:
      "Neckbands provide a hassle-free and comfortable experience for users who prefer a hands-free and lightweight solution for their listening needs. They are also perfect for those who want to enjoy their music without disturbing others.",
  },
  {
    _id: uuid(),
    name: "speakers",
    description:
      "Superior sound quality and performance, providing unparalleled clarity",
    image: [
      "https://i0.wp.com/itportal.co.in/wp-content/uploads/2022/11/a6-73.jpg?fit=1500%2C1500&ssl=1",
    ],
    details:
      "superior sound quality and performance, providing unparalleled clarity and precision with their signature sound. Whether you're listening to music in your home or at a party, these wireless Bluetooth speakers are the perfect way to enjoy your favourite tunes.",
  },
];
