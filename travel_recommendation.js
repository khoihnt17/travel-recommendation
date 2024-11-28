window.onload = () => {
  const searchBtn = document.getElementById('seachBtn');
  const clearBtn = document.getElementById('clearBtn');
  const searchTextBox = document.getElementById('searchTextBox');
  const closeBtn = document.getElementById('closeBtn');
  const recommendations = document.getElementById('recommendations');
  const recommendationsContent = document.getElementById('recommendationsContent');

  clearBtn.onclick = () => {
    searchTextBox.value = '';
    recommendations.style.display = 'none';
  }

  searchBtn.onclick = () => {
    fetch('./travel_recommendation_api.json')
      .then(res => res.json())
      .then(data => {
        const recommendationCard = (imgUrl, name, des) => `
          <div class='recommendationCard'>
            <div class='recImg' style='background-image:url("${imgUrl}")'></div>
            <h1>${name}</h1>
            <p>${des}</p>
            <button>Visit</button>
          </div>
        `;

        let result;
        let keyword = searchTextBox.value.trim().toLowerCase();

        switch (keyword) {
          case 'beach':
            keyword = 'beaches';
            break;
          case 'temple':
            keyword = 'temples';
            break;
          case 'country':
            keyword = 'countries';
            break;
        }
        result = data[keyword];

        recommendationsContent.innerHTML = '';

        if (result) {
          console.log(result);
          recommendations.style.display = 'inline-block';
          result.forEach(e => {
            if (e.cities) {
              e.cities.forEach(city => {
                recommendationsContent.innerHTML += recommendationCard(city.imageUrl, city.name, city.description);
              })
            } else {
              recommendationsContent.innerHTML += recommendationCard(e.imageUrl, e.name, e.description);
            }
          });
        } else {
          recommendations.style.display = 'none';
        }
      })
      .catch(err => console.log(err));
  }
}

