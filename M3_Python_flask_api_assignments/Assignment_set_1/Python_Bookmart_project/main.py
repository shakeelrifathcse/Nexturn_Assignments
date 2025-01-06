### main.py ###
import book_management as bm
import customer_management as cm
import sales_management as sm

def main():
    while True:
        print("\nWelcome to BookMart!")
        print("1. Book Management")
        print("2. Customer Management")1
        print("3. Sales Management")
        print("4. Exit")
        
        choice = input("Enter your choice: ")

        if choice == "1":
            print("\nBook Management")
            print("1. Add Book")
            print("2. View Books")
            print("3. Search Book")
            sub_choice = input("Enter your choice: ")
            
            if sub_choice == "1":
                title = input("Title: ")
                author = input("Author: ")
                price = input("Price: ")
                quantity = input("Quantity: ")
                print(bm.add_book(title, author, price, quantity))
            elif sub_choice == "2":
                for book in bm.view_books():
                    print(book)
            elif sub_choice == "3":
                keyword = input("Enter title or author to search: ")
                for book in bm.search_book(keyword):
                    print(book)

        elif choice == "2":
            print("\nCustomer Management")
            print("1. Add Customer")
            print("2. View Customers")
            sub_choice = input("Enter your choice: ")

            if sub_choice == "1":
                name = input("Name: ")
                email = input("Email: ")
                phone = input("Phone: ")
                print(cm.add_customer(name, email, phone))
            elif sub_choice == "2":
                for customer in cm.view_customers():
                    print(customer)

        elif choice == "3":
            print("\nSales Management")
            print("1. Sell Book")
            print("2. View Sales")
            sub_choice = input("Enter your choice: ")

            if sub_choice == "1":
                name = input("Customer Name: ")
                email = input("Email: ")
                phone = input("Phone: ")
                book_title = input("Book Title: ")
                quantity = input("Quantity: ")
                print(sm.sell_book(name, email, phone, book_title, quantity))
            elif sub_choice == "2":
                for sale in sm.view_sales():
                    print(sale)

        elif choice == "4":
            print("Exiting the program. Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
