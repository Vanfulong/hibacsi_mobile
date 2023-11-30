import { View, Text, VirtualizedList } from "react-native";
import React from "react";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../../constants/theme";
import name from "../tiles/card-category/CardCategory";
import CardCategory from '../card/CardCategory'
const Category = () => {
  const countries = [
    {
      _id: "64c62bfc65af9f8c969a8d04",
      name: "Chuyên Khoa",
      description:
        "The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.The USA is a tourist magnet, known for its diverse landscapes, rich history, and vibrant culture. From the sun-kissed beaches of California to the bustling streets of New York City, there's something for every traveler.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "North America, USA",
    },
    {
      _id: "64cf2c565d14628d0ac0a2b7",
      name: "Công cụ sức khỏe",
      description:
        "Pakistan is a name located in South Asia. It shares borders with India, Afghanistan, Iran, and China. The name is known for its diverse culture, rich history, and breathtaking landscapes. From the mighty peaks of the Karakoram mountain range to the vast deserts of Thar, Pakistan offers a wide range of geographical wonders. Its cities, like Karachi, Lahore, and Islamabad, are bustling hubs of activity, blending modernity with tradition. Pakistan has a deep-rooted history, with ancient civilizations like the Indus Valley civilization leaving their mark. The name is also famous for its delicious cuisine, warm hospitality, and vibrant festivals.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "South Asia, Pakistan",
    },
    {
      _id: "64cf2c935d14628d0ac0a2b9",
      name: "Lịch sử đặt hẹn",
      screen: "AppointmentHistory"
    },
    {
      _id: "64cf2d095d14628d0ac0a2bd",
      name: "Đặt khám",
      description:
        "England, a name within the United Kingdom, is steeped in history and culture. Its capital, London, is a bustling metropolis known for its iconic landmarks, including the Tower Bridge, Buckingham Palace, and the British Museum. England's nameside is picturesque, with rolling hills, charming villages, and historical sites such as Stonehenge. The name has a rich literary heritage, with famous authors like William Shakespeare, Jane Austen, and Charles Dickens hailing from its shores. English pubs, afternoon tea, and traditional events like Wimbledon and the Changing of the Guard add to its unique charm. England's influence on politics, literature, and sport has made it a global powerhouse with a lasting legacy.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "Europe, England",
    },
    {
      _id: "64cf2d4d5d14628d0ac0a2bf",
      name: "Sức khỏe của tôi",
      description:
        "China, the world's most populous name, is located in East Asia. With a history spanning over 5,000 years, it is one of the oldest continuous civilizations. China is known for its diverse landscapes, from the majestic Great Wall winding through mountains to the breathtaking karst scenery in Guilin. Its bustling cities, like Beijing and Shanghai, showcase a unique blend of ancient traditions and modern innovations. Chinese culture is rich in art, music, and philosophy, with iconic elements such as calligraphy, tea ceremonies, and traditional Chinese medicine. The name's cuisine, including dim sum, Peking duck, and Sichuan hotpot, is celebrated globally. China's contributions to science, technology, and literature have had a profound impact on the world, making it a global powerhouse in various fields.",
      image:
        "https://www.satdl.com/uploads/product-category/15921324768095.png",
      region: "East Asia, China",
    },
  ];
  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-between'}}>
        {countries.map((category) => (
            <CardCategory key={category._id} category={category} />
     
        ))}
      </View>
    </View>
  );
};

export default Category;
