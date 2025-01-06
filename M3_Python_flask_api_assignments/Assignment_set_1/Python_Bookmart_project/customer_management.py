### customer_management.py ###

class Customer:
    def __init__(self, name, email, phone):
        self.name = name
        self.email = email
        self.phone = phone

    def display_details(self):
        return f"Name: {self.name}, Email: {self.email}, Phone: {self.phone}"

customers = []

def add_customer(name, email, phone):
    if "@" not in email or len(phone) != 10 or not phone.isdigit():
        return "Invalid customer details."
    customers.append(Customer(name, email, phone))
    return "Customer added successfully!"

def view_customers():
    return [customer.display_details() for customer in customers] or ["No customers available."]