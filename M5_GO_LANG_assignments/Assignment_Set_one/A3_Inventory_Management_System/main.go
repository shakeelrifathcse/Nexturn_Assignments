package main

import (
	"errors"
	"fmt"
	"sort"
)

type Product struct {
	ID    int
	Name  string
	Price float64
	Stock int
}

var inventory []Product

func addProduct(id int, name string, price interface{}, stock int) error {
	for _, prod := range inventory {
		if prod.ID == id {
			return errors.New("Product ID must be unique")
		}
	}

	priceFloat, ok := price.(float64)
	if !ok {
		return errors.New("Invalid price type")
	}

	if priceFloat <= 0 {
		return errors.New("Price must be greater than zero")
	}
	if stock < 0 {
		return errors.New("Stock cannot be negative")
	}

	inventory = append(inventory, Product{
		ID:    id,
		Name:  name,
		Price: priceFloat,
		Stock: stock,
	})
	return nil
}

func updateStock(id int, newStock int) error {
	if newStock < 0 {
		return errors.New("Stock cannot be negative")
	}
	for i, prod := range inventory {
		if prod.ID == id {
			inventory[i].Stock = newStock
			return nil
		}
	}
	return errors.New("Product not found")
}

func searchProductByID(id int) (Product, error) {
	for _, prod := range inventory {
		if prod.ID == id {
			return prod, nil
		}
	}
	return Product{}, errors.New("Product not found")
}

func searchProductByName(name string) (Product, error) {
	for _, prod := range inventory {
		if prod.Name == name {
			return prod, nil
		}
	}
	return Product{}, errors.New("Product not found")
}

func displayInventory() {
	fmt.Printf("%-10s %-20s %-10s %-10s\n", "ID", "Name", "Price", "Stock")
	fmt.Println("--------------------------------------------")
	for _, prod := range inventory {
		fmt.Printf("%-10d %-20s %-10.2f %-10d\n", prod.ID, prod.Name, prod.Price, prod.Stock)
	}
}

func sortInventoryByPrice() {
	sort.Slice(inventory, func(i, j int) bool {
		return inventory[i].Price < inventory[j].Price
	})
}

func sortInventoryByStock() {
	sort.Slice(inventory, func(i, j int) bool {
		return inventory[i].Stock < inventory[j].Stock
	})
}

func main() {
	addProduct(1, "Lap", 100000.00, 10)
	addProduct(2, "Mousepad", 500.50, 50)
	addProduct(3, "Keypad", 4500.75, 30)

	fmt.Println("Initial Inventory:")
	displayInventory()

	updateStock(2, 60)
	fmt.Println("\nInventory after updating stock:")
	displayInventory()

	sortInventoryByPrice()
	fmt.Println("\nInventory sorted by price:")
	displayInventory()

	sortInventoryByStock()
	fmt.Println("\nInventory sorted by stock:")
	displayInventory()

	if prod, err := searchProductByID(2); err == nil {
		fmt.Println("\nProduct found by ID:", prod)
	} else {
		fmt.Println(err)
	}

	if prod, err := searchProductByName("Keyboard"); err == nil {
		fmt.Println("\nProduct found by Name:", prod)
	} else {
		fmt.Println(err)
	}
}
