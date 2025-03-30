export const srcs = [
    "https://cdn-icons-png.flaticon.com/128/3447/3447845.png",
    "https://cdn-icons-png.flaticon.com/128/4727/4727284.png",
    "https://cdn-icons-png.flaticon.com/128/7312/7312808.png",
    "https://cdn-icons-png.flaticon.com/128/2346/2346952.png",
    "https://cdn-icons-png.flaticon.com/128/381/381090.png",
    "https://cdn-icons-png.flaticon.com/128/7628/7628347.png",
    "https://cdn-icons-png.flaticon.com/128/2446/2446500.png",
    "https://cdn-icons-png.flaticon.com/128/590/590772.png",
    "https://cdn-icons-png.flaticon.com/128/4922/4922294.png",
    "https://cdn-icons-png.flaticon.com/128/8336/8336920.png",
    "https://cdn-icons-png.flaticon.com/128/5601/5601512.png",
  ];

 export  const classNames = [
    'w-20 absolute top-[15%] left-20',
    'w-20 absolute top-[60%] left-[30%]',
    'w-20 absolute top-[35%] left-[15%]',
    'w-20 absolute top-[4%] left-[25%]',
    'w-20 absolute bottom-20 left-10',
    'w-20 absolute top-[0%] right-[30%]',
    'w-20 absolute bottom-[5%] right-[20%]',
    'w-20 absolute bottom-[20%] right-[7%]',
    'w-20 absolute bottom-[45%] right-[35%]',
    'w-20 absolute top-[7%] right-[5%]',
    'w-20 absolute bottom-[10%] right-[43%]',
  ];

 export  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };