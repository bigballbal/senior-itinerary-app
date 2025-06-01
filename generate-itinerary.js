// generate-itinerary.js

const fs = require('fs');

// 讀取景點資料
const rawData = fs.readFileSync('./data/yilan_spots.json');
const spots = JSON.parse(rawData);

// ✅ 模擬使用者的問卷回答
const userAnswers = {
  crowd: "少",       // 選擇：多 / 少
  category: "自然"   // 選擇：都市 / 自然
};

// ✅ 根據回答進行篩選
const recommendedSpots = spots.filter(spot =>
  spot.crowd === userAnswers.crowd &&
  spot.category === userAnswers.category
);

// ✅ 輸出推薦景點
console.log("推薦給您的景點如下：");
recommendedSpots.forEach((spot, index) => {
  console.log(`${index + 1}. ${spot.name} - ${spot.description}`);
});
