package main

import (
	"errors"
	"fmt"
	"strings"
)

type CityData struct {
	Name        string
	Temperature float64
	Rainfall    float64
}

var climateData = []CityData{
	{"chennai", 29.5, 1200.4},
	{"hyderabad", 18.2, 385.2},
	{"kerala", 10.0, 980.0},
	{"delhi", 20.1, 1300.7},
	{"mumbai", 25.0, 200.0},
}

func findHighestTemperature(data []CityData) CityData {
	highest := data[0]
	for _, city := range data {
		if city.Temperature > highest.Temperature {
			highest = city
		}
	}
	return highest
}

func findLowestTemperature(data []CityData) CityData {
	lowest := data[0]
	for _, city := range data {
		if city.Temperature < lowest.Temperature {
			lowest = city
		}
	}
	return lowest
}

func calculateAverageRainfall(data []CityData) float64 {
	totalRainfall := 0.0
	for _, city := range data {
		totalRainfall += city.Rainfall
	}
	return totalRainfall / float64(len(data))
}

func filterCitiesByRainfall(data []CityData, threshold float64) []CityData {
	var result []CityData
	for _, city := range data {
		if city.Rainfall > threshold {
			result = append(result, city)
		}
	}
	return result
}

func searchCityByName(data []CityData, name string) (CityData, error) {
	for _, city := range data {
		if strings.EqualFold(city.Name, name) {
			return city, nil
		}
	}
	return CityData{}, errors.New("City not found")
}

func main() {
	fmt.Println("Climate Data Analysis")

	highestTempCity := findHighestTemperature(climateData)
	fmt.Printf("City with the highest temperature: %s (%.2f°C)\n", highestTempCity.Name, highestTempCity.Temperature)

	lowestTempCity := findLowestTemperature(climateData)
	fmt.Printf("City with the lowest temperature: %s (%.2f°C)\n", lowestTempCity.Name, lowestTempCity.Temperature)

	averageRainfall := calculateAverageRainfall(climateData)
	fmt.Printf("Average rainfall across all cities: %.2f mm\n", averageRainfall)

	var threshold float64
	fmt.Print("Enter rainfall threshold to filter cities: ")
	_, err := fmt.Scan(&threshold)
	if err != nil {
		fmt.Println("Invalid input. Please enter a numeric value.")
		return
	}

	filteredCities := filterCitiesByRainfall(climateData, threshold)
	if len(filteredCities) > 0 {
		fmt.Println("Cities with rainfall above threshold:")
		for _, city := range filteredCities {
			fmt.Printf("%s (%.2f mm)\n", city.Name, city.Rainfall)
		}
	} else {
		fmt.Println("No cities found with rainfall above the threshold.")
	}

	var searchName string
	fmt.Print("Enter city name to search: ")
	fmt.Scanln(&searchName)
	city, err := searchCityByName(climateData, searchName)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("City found: %s - Temperature: %.2f°C, Rainfall: %.2f mm\n", city.Name, city.Temperature, city.Rainfall)
	}
}
