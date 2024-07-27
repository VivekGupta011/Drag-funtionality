import img1 from "./../../public/Assets/img1.jpg";
import img2 from "./../../public/Assets/img2.png";
import img3 from "./../../public/Assets/img3.png";
import img4 from "./../../public/Assets/img4.jpg";
import img5 from "./../../public/Assets/img5.jpg";
import img6 from "./../../public/Assets/img6.jpg";
import img7 from "./../../public/Assets/img7.jpg";
import img8 from "./../../public/Assets/img8.jpg";
import img9 from "./../../public/Assets/img9.jpg";
import img10 from "./../../public/Assets/img10.jpg";
import img11 from "./../../public/Assets/images 11.jpg";
import img12 from "./../../public/Assets/img12.jpg";
import img13 from "./../../public/Assets/img12.jpg";
import img14 from "./../../public/Assets/img14.jpg";

export interface TableRow {
  id: string; // or number, depending on your use case
  state: string;
  filters: string[];
  designVariants: string[];
}

interface Design {
  img: any;
  text: string;
  description: string;
}


export const cardsData = [
  {
    id: 0,
    title: "Component Librarys",
    components: [
      {
        id: 100,
        name: "material ui1"
      },
      {
        id: 200,
        name: "bootstrap2"
      },
      {
        id: 300,
        name: "material ui3"
      },
      {
        id: 400,
        name: "bootstrap4"
      },
    ]
  },


]



export const tableData: TableRow[] = [];


  // Sample design data
 export const designs: Design[] = [
    { img: img1, text: "", description: "Holiday Shoe Sale " },
    { img: img2, text: "", description: "New Year New Wardrobe" },
    { img: img3, text: "", description: "Winter Warm-Up Sale" },
    { img: img4, text: "", description: "Winter Wonderland Sale  " },
    { img: img5, text: "", description: "End of Season Shoe Sale" },
    { img: img6, text: "", description: "Spring Shoe Clearance " },
    { img: img7, text: "", description: "Men’s Workwear Sale" },
    { img: img8, text: "", description: "Men’s Winter Collection Sale" },
    { img: img9, text: "", description: "Men’s Casual Wear Sale" },
  ];

