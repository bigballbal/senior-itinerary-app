const form = document.getElementById('questionnaire');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 收集單選 radio (crowd, category, accessible)
  const crowd = form.crowd.value;
  const category = form.category.value;
  const accessible = form.accessible.value;

  // 收集下拉 select (activity)
  const activity = form.activity.value;

  // 收集多選 checkbox (area)
  const areas = Array.from(form.area)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // 準備要送給後端的資料 (依你的 server 需求調整)
  const userAnswers = {
    crowd,
    category,
    accessible,
    area: areas,
    activity // 如果後端需要，可帶上
  };

  try {
    const response = await fetch('http://localhost:3000/api/generate-itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userAnswers),
    });

    if (!response.ok) throw new Error('伺服器錯誤');

    const spots = await response.json();

    // 清空結果區
    resultDiv.innerHTML = '';

    if (spots.length === 0) {
      resultDiv.textContent = '抱歉，找不到符合條件的景點。';
      return;
    }

    // 顯示推薦景點
    const ul = document.createElement('ul');
    spots.forEach(spot => {
      const li = document.createElement('li');
      li.textContent = `${spot.name}（${spot.area}） - 類型：${spot.category}`;
      ul.appendChild(li);
    });
    resultDiv.appendChild(ul);

  } catch (error) {
    console.error(error);
    resultDiv.textContent = '發生錯誤，請稍後再試。';
  }
});
