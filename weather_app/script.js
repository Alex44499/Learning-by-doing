let weather = {
	appKey: 'f71baa512e60e44e68466cfda47f3d9e',
	fetchWhether: function (city) {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q='
			+ city
			+ '&units=metric&appid='
			+ this.appKey
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data))
	},
	displayWeather: function (data) {
		const { name } = data
		const { icon, description } = data.weather[0]
		const { temp, humidity } = data.main
		const { speed } = data.wind
		console.log(name, icon, description, temp, humidity, speed)

		document.querySelector(".city").innerText = "Weather in " + name
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
		document.querySelector(".description").innerText = description
		document.querySelector(".temp").innerText = temp + "°C"
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
		document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h"
		document.querySelector(".weather").classList.remove("loading")
		document.body.style.backgroundImage = "url('http://source.unsplash.com/1600x900/? " + name + "')"

	},
	search: function () {
		this.fetchWhether(document.querySelector(".search-bar").value)
	}
}

document.querySelector(".search button").addEventListener("click", function () {
	weather.search()
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
	if (event.key == "Enter") {
		weather.search()
	}
})


weather.fetchWhether("Tartu")