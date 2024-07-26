export interface TableRow {
  id: string; // or number, depending on your use case
  state: string;
  filters: string[];
  designVariants: string[];
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



export const tableData: TableRow[] = [
  // {
  //   id: '1', // Unique identifier for each item
  //   state: 'Category 1',
  //   filters: [],
  //   designVariants: [],
  // },
  // {
  //   id: '2', // Unique identifier for each item
  //   state: 'Category 2',
  //   filters: [],
  //   designVariants: [],
  // },
  // Add more items as needed
];

