const API_URL = '/data.json';

async function getData() {
    const response = await fetch(API_URL).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
    return response;
}

async function getHotelsData() {
    let data = [];
    await getData().then((res) => {
        data = res;
    })
    return data;
}

async function renderView() {
    const data = await getHotelsData();
    getCard(data);
    return data;
};

renderView();

document.getElementById('sortBy').addEventListener('change', async (event) => {
    let selectedValue = event.target.value;
    const data = await renderView();
    if(selectedValue === 'name'){
        data.sort((a,b) => a.name.localeCompare(b.name));
        getCard(data);
    }
})

async function searchHotel() {
    const search = document.getElementById('searchItem').value;
    const data = await getHotelsData();

    let tags = data.filter((tag) => {
        return tag.tags.map((i) => {
            return i.toLowerCase().includes(search.toLowerCase());
        });
        // return tag.tags.map((i) => {
        //     return i.toLowerCase() === search.toLowerCase()
        // });
    });
    console.log(tags);
}

async function getCard(data) {
    const star = '/assets/star.png';
    data.forEach(element => {
        const hotelWrapper = document.getElementById('hotelList');
        let card = document.createElement('div');
        card.classList.add("card", "col-4");
        hotelWrapper.appendChild(card);

        let ul = document.createElement('ul');
        for (let tag of element.tags) {
            let li = document.createElement('li');
            li.innerHTML = tag;
            ul.appendChild(li);
        }

        let hotelName = document.createElement('h2');
        let location = document.createElement('p');
        let rating = document.createElement('span');
        let eta = document.createElement('span');
        let imgUrl = document.createElement('img');
        imgUrl.classList.add('card-img');

        location.innerHTML = element.location;
        imgUrl.src = element.imageURL;
        rating.innerHTML = `<img src=\"${star}" width="15px"> ${element.rating} `;
        eta.innerHTML = `ETA - <b> ${element.estimateDelivery} mins<b>`;
        hotelName.innerHTML = element.name;
        card.appendChild(hotelName);
        card.appendChild(imgUrl);
        card.appendChild(rating);
        card.appendChild(eta);
        card.appendChild(location);
        card.appendChild(ul);
    })
}