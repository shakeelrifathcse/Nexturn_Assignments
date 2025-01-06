### sales_management.py ###

from customer_management import Customer
from book_management import books
class Transaction(Customer):
    def __init__(self, name, email, phone, book_title, quantity_sold):
        super().__init__(name, email, phone)
        self.book_title = book_title
        self.quantity_sold = quantity_sold

    def display_transaction(self):
        return f"Customer: {self.name}, Book: {self.book_title}, Quantity: {self.quantity_sold}"

sales = []

def sell_book(customer_name, email, phone, book_title, quantity):
    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValueError("Quantity must be positive.")

        for book in books:
            if book.title.lower() == book_title.lower():
                if book.quantity >= quantity:
                    book.quantity -= quantity
                    sales.append(Transaction(customer_name, email, phone, book.title, quantity))
                    return "Sale successful!"
                else:
                    return f"Error: Only {book.quantity} copies available."
        return "Book not found."
    except ValueError as e:
        return f"Error: {e}"

def view_sales():
    return [sale.display_transaction() for sale in sales] or ["No sales recorded."]