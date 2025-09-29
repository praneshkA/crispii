// all_product.js
// upto 10 images is ready 
import p1_img from "../src/assets/mixture.jpeg";
import p2_img from "../src/assets/karasev.jpg";
import p3_img from "../src/assets/karaboondhi.jpg";
import p4_img from "../src/assets/kadalai_pakkoda.jpg";
import p5_img from "../src/assets/kadalai.jpg";
import p6_img from "../src/assets/kadalai_parupu.jpg";
import p7_img from "../src/assets/achumuruku.jpg";
import p8_img from "../src/assets/redround.jpg";
import p9_img from "../src/assets/whiteround.jpg";
import p10_img from "../src/assets/garlicwhite.jpg";
import p11_img from "../src/assets/garlic red.jpg";
import p12_img from "../src/assets/idiyappam red.jpg";
import p13_img from "../src/assets/idiyappamw hite.jpg";
import p14_img from "../src/assets/mullu re.jpg";
import p15_img from "../src/assets/thenkulal.jpg";
import p16_img from "../src/assets/deepavli butter muruku.jpg";
import p17_img from "../src/assets/chilli.jpg";
import p18_img from "../src/assets/aanired.jpg";
import p19_img from "../src/assets/sweetsev.jpg";
import p20_img from "../src/assets/potato-chilli-fingers.jpg";
import p21_img from "../src/assets/potato-chips.jpg";
import p22_img from "../src/assets/maravalli.jpg";
import p23_img from "../src/assets/banana.jpg";
import p24_img from "../src/assets/wheel-chips.jpg";
import p25_img from "../src/assets/kadalai mittai.jpg";
import p26_img from "../src/assets/aatukal cak.jpg";
import p27_img from "../src/assets/chandharakala.jpg";
import p28_img from "../src/assets/gulab jamun.jpg";  
import p29_img from "../src/assets/corn urundai.jpg";
import p30_img from "../src/assets/then mittai.jpg";
import p31_img from "../src/assets/pori urundai.jpg";
import p32_img from "../src/assets/athirasam.jpg";
import p33_img from "../src/assets/coconut biscuit.jpg";
import p34_img from "../src/assets/chocolate biscut.jpg";
import p35_img from "../src/assets/abcd biscuit.jpg";
import p36_img from "../src/assets/heart biscuit.jpg";
import p37_img from "../src/assets/beans biscuit.jpg";
import p38_img from "../src/assets/mundhiri biscut.jpg";
// import p39_img from "../src/assets/corn.jpg";
// import p40_img from "../src/assets/popcorn.jpg";

const Products = [
 { id: 1, name: "mixture", category: "Kaaram", image: p1_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 2, name: "Karasev", category: "Kaaram", image: p2_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 3, name: "Karaboondhi", category: "Kaaram", image: p3_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 4, name: "Kadalai Pakkoda", category: "Kaaram", image: p4_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 5, name: "Kadalai", category: "Kaaram", image: p5_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 6, name: "Kadalai Parupu", category: "Kaaram", image: p6_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },

{ id: 7,  name: "Achu Muruku", category: "Kaaram", image: p7_img,  prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 8,  name: "Red Round Muruku", category: "Kaaram", image: p8_img,  prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 9,  name: "White Round Muruku", category: "Kaaram", image: p9_img,  prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 10, name: "Garlic White", category: "Kaaram", image: p10_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 11, name: "Garlic Red", category: "Kaaram", image: p11_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 12, name: "Idiyappam Red", category: "Kaaram", image: p12_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 13, name: "Idiyappam White", category: "Kaaram", image: p13_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 14, name: "Mullu Red", category: "Kaaram", image: p14_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 15, name: "Thenkulal", category: "Kaaram", image: p15_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 16, name: "Deepavali Butter", category: "Kaaram", image: p16_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 17, name: "Chilli", category: "Kaaram", image: p17_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
{ id: 18, name: "Aani Red", category: "Kaaram", image: p18_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },

{ id: 19, name: "SweetSev", category: "Kaaram", image: p19_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },


  // 🍟 Chips
  { id: 20, name: "Potato Chilli", category: "Chips", image: p20_img, prices: { "1000g": 220, "500g": 120, "250g": 70 } },
  { id: 21, name: "Potato Chips", category: "Chips", image: p21_img, prices: { "1000g": 300, "500g": 160, "250g": 90 } },
  { id: 22, name: "Maravalli Chips", category: "Chips", image: p22_img, prices: { "1000g": 140, "500g": 80, "250g": 50 } },
  { id: 23, name: "Nendram Chips", category: "Chips", image: p23_img, prices: { "1000g": 300, "500g": 160, "250g": 90 } },
  { id: 24, name: "Wheel Chips", category: "Chips", image: p24_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },

  // 🍬 Sweets / Mithai
  { id: 25, name: "Kadalai Mittai (250g)", category: "Sweets / Mithai", image: p25_img, prices: { "250g": 70 } },
  { id: 26, name: "AatuKal Cake", category: "Sweets / Mithai", image: p26_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 27, name: "Chandharmuki / Chandharakala", category: "Sweets / Mithai", image: p27_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 28, name: "Gulab Jamun (10pcs)", category: "Sweets / Mithai", image: p28_img, prices: { "10pcs": 30 } },
  { id: 29, name: "Corn Urundai", category: "Sweets / Mithai", image: p29_img, prices: { "1pc": 30 } },
  { id: 30, name: "Then Mittai (24pcs)", category: "Sweets / Mithai", image: p30_img, prices: { "24pcs": 30 } },
  { id: 31, name: "Pori Urundai (12pcs)", category: "Sweets / Mithai", image: p31_img, prices: { "12pcs": 30 } },
  { id: 32, name: "Athirasam (5pcs)", category: "Sweets / Mithai", image: p32_img, prices: { "5pcs": 30 } },

  // 🍪 Cookies / Biscuits
  { id: 33, name: "Coconut Biscuit", category: "Cookies / Biscuits", image: p33_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 34, name: "Chocolate Biscuit", category: "Cookies / Biscuits", image: p34_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 35, name: "ABCD Biscuit", category: "Cookies / Biscuits", image: p35_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 36, name: "Heart Biscuit", category: "Cookies / Biscuits", image: p36_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 37, name: "Beans Biscuit", category: "Cookies / Biscuits", image: p37_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  { id: 38, name: "Mundhiri Biscuit", category: "Cookies / Biscuits", image: p38_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },

  // 🌽 Others
  // { id: 39, name: "Corn", category: "Others", image: p39_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
  // { id: 40, name: "Popcorn", category: "Others", image: p40_img, prices: { "1000g": 150, "500g": 90, "250g": 60 } },
];

export default Products;
