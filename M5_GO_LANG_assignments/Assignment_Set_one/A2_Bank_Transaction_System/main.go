package main

import (
	"errors"
	"fmt"
)

type Account struct {
	ID                 int
	Name               string
	Balance            float64
	TransactionHistory []string
}

var accounts []Account

func deposit(id int, amount float64) error {
	if amount <= 0 {
		return errors.New("Deposit amount must be greater than zero")
	}
	for i, acc := range accounts {
		if acc.ID == id {
			accounts[i].Balance += amount
			accounts[i].TransactionHistory = append(accounts[i].TransactionHistory, fmt.Sprintf("Deposited: %.2f", amount))
			return nil
		}
	}
	return errors.New("Account not found")
}

func withdraw(id int, amount float64) error {
	if amount <= 0 {
		return errors.New("Withdrawal amount must be greater than zero")
	}
	for i, acc := range accounts {
		if acc.ID == id {
			if acc.Balance < amount {
				return errors.New("Insufficient balance")
			}
			accounts[i].Balance -= amount
			accounts[i].TransactionHistory = append(accounts[i].TransactionHistory, fmt.Sprintf("Withdrew: %.2f", amount))
			return nil
		}
	}
	return errors.New("Account not found")
}

func viewTransactionHistory(id int) error {
	for _, acc := range accounts {
		if acc.ID == id {
			fmt.Println("Transaction History for", acc.Name)
			for _, history := range acc.TransactionHistory {
				fmt.Println(history)
			}
			return nil
		}
	}
	return errors.New("Account not found")
}

func main() {
	accounts = append(accounts, Account{ID: 1, Name: "viky", Balance: 100000})
	accounts = append(accounts, Account{ID: 2, Name: "ramesh", Balance: 5000})

	const (
		DepositOption            = 1
		WithdrawOption           = 2
		ViewBalanceOption        = 3
		TransactionHistoryOption = 4
		ExitOption               = 5
	)

	for {
		fmt.Println("\nBank Transaction System")
		fmt.Println("1. Deposit")
		fmt.Println("2. Withdraw")
		fmt.Println("3. View Balance")
		fmt.Println("4. Transaction History")
		fmt.Println("5. Exit")
		fmt.Print("Choose an option: ")

		var choice int
		fmt.Scan(&choice)

		switch choice {
		case DepositOption:
			var id int
			var amount float64
			fmt.Print("Enter account ID: ")
			fmt.Scan(&id)
			fmt.Print("Enter deposit amount: ")
			fmt.Scan(&amount)
			if err := deposit(id, amount); err != nil {
				fmt.Println("Error:", err)
			} else {
				fmt.Println("Deposit successful")
			}
		case WithdrawOption:
			var id int
			var amount float64
			fmt.Print("Enter account ID: ")
			fmt.Scan(&id)
			fmt.Print("Enter withdrawal amount: ")
			fmt.Scan(&amount)
			if err := withdraw(id, amount); err != nil {
				fmt.Println("Error:", err)
			} else {
				fmt.Println("Withdrawal successful")
			}
		case ViewBalanceOption:
			var id int
			fmt.Print("Enter account ID: ")
			fmt.Scan(&id)
			for _, acc := range accounts {
				if acc.ID == id {
					fmt.Printf("Account ID: %d, Name: %s, Balance: %.2f\n", acc.ID, acc.Name, acc.Balance)
				}
			}
		case TransactionHistoryOption:
			var id int
			fmt.Print("Enter account ID: ")
			fmt.Scan(&id)
			if err := viewTransactionHistory(id); err != nil {
				fmt.Println("Error:", err)
			}
		case ExitOption:
			fmt.Println("Exiting...")
			return
		default:
			fmt.Println("Invalid option")
		}
	}
}
