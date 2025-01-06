### book_management.py ###
class Book:
    def __init__(self, title, author, price, quantity):
        self.title = title
        self.author = author
        self.price = price
        self.quantity = quantity

    def display_details(self):
        return f"Title: {self.title}, Author: {self.author}, Price: {self.price}, Quantity: {self.quantity}"

books = []

def add_book(title, author, price, quantity):
    try:
        price = float(price)
        quantity = int(quantity)
        if price <= 0 or quantity < 0:
            raise ValueError("Price must be positive and quantity cannot be negative.")
        books.append(Book(title, author, price, quantity))
        return "Book added successfully!"
    except ValueError as e:
        return f"Error: {e}"

def view_books():
    return [book.display_details() for book in books] or ["No books available."]

def search_book(keyword):
    result = [book.display_details() for book in books if keyword.lower() in book.title.lower() or keyword.lower() in book.author.lower()]
    return result or ["No matching books found."]