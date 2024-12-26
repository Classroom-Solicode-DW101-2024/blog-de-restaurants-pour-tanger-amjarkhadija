document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.querySelector('.cards');

    function fetchRestaurants() {
        fetch('http://localhost:3000/restaurants')
            .then(response => response.json())
            .then(data => {
                if (data.restaurants && data.restaurants.length > 0) {
                    restaurantList.innerHTML = '';
                    data.restaurants.forEach(restaurant => {
                        const card = document.createElement('div');
                        card.classList.add('restaurant-card');
                        card.innerHTML = `
                            <img src="${restaurant.cover}" alt="${restaurant.name}">
                            <h3>${restaurant.name}</h3>
                            <p>Cuisine: ${restaurant.speciality}</p>
                            <p>Rating: ${restaurant.notation} ⭐</p>
                            <p>Address: ${restaurant.address}</p>
                            <p>Phone: ${restaurant.tel}</p>
                            <button  class="DetailButton" onclick="viewDetails(${restaurant.id})">Detail</button>
                        `;
                        restaurantList.appendChild(card);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching restaurant list:', error);
            });
    }

    window.viewDetails = function (id) {
        window.location.href = `detail.html?id=${id}`; 
    };

    fetchRestaurants();
});




document.addEventListener('DOMContentLoaded', function () {
  
    const restaurantList = document.querySelector('.cards'); 
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');


    function fetchRestaurants() {
        fetch('http://localhost:3000/restaurants')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error connecting to API');
                }
                return response.json();
            })
            .then(function(data) {
                displayRestaurants(data.restaurants); 
            })
            .catch(function(error) {
                console.log('Error fetching restaurants:', error);
                restaurantList.innerHTML = '<p>Unable to load restaurants.</p>';
            });
    }

    
    function displayRestaurants(restaurants) {
        restaurantList.innerHTML = ''; 

        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p>No restaurants found.</p>';
        } else {
            restaurants.forEach(function(restaurant) {
                const card = document.createElement('div');
                card.classList.add('restaurant-card');
                card.innerHTML = `
                    <img src="${restaurant.cover}" alt="${restaurant.name}">
                    <h3>${restaurant.name}</h3>
                    <p>Cuisine: ${restaurant.speciality}</p>
                    <p>Rating: ${restaurant.notation} ⭐</p>
                    <p>Address: ${restaurant.address}</p>
                    <p>Phone: ${restaurant.tel}</p>
                    <button class="DetailButton" onclick="viewDetails(${restaurant.id})">Detail</button>
                `;
                restaurantList.appendChild(card);
            });
        }
    }

    
    function searchRestaurants() {
        const searchTerm = searchInput.value.toLowerCase(); 

        fetch('http://localhost:3000/restaurants')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const filteredRestaurants = data.restaurants.filter(function(restaurant) {
                    
                    return restaurant.name.toLowerCase().includes(searchTerm) ||
                           restaurant.speciality.toLowerCase().includes(searchTerm);
                });
                displayRestaurants(filteredRestaurants); 
            })
            .catch(function(error) {
                console.log('Search error:', error);
                restaurantList.innerHTML = '<p>Error during search.</p>';
            });
    }

  
    searchButton.addEventListener('click', searchRestaurants);

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRestaurants();
        }
    });

   
    window.viewDetails = function(id) {
        window.location.href = `detail.html?id=${id}`;
    };

   
    fetchRestaurants();
});










