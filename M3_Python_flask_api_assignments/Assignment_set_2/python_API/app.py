import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

def get_db_connection():
    connection = sqlite3.connect('books.db')
    connection.row_factory = sqlite3.Row
    return connection

@app.route('/')
def home():
    return "Welcome to the Book Management API!"

@app.route('/books', methods=['GET'])
def get_books():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM books")
    rows = cursor.fetchall()
    books = [dict(row) for row in rows]
    connection.close()
    return jsonify(books)

@app.route('/books', methods=['POST'])
def add_book():
    new_book = request.get_json()
    title = new_book.get('title')
    author = new_book.get('author')
    published_year = new_book.get('published_year')
    genre = new_book.get('genre')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO books (title, author, published_year, genre) VALUES (?, ?, ?, ?)",
                   (title, author, published_year, genre))
    connection.commit()
    connection.close()

    return jsonify(new_book), 201

@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM books WHERE id=?", (id,))
    row = cursor.fetchone()
    connection.close()

    if row:
        return jsonify(dict(row))
    return 'Book not found', 404

@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    updated_data = request.get_json()
    title = updated_data.get('title')
    author = updated_data.get('author')
    published_year = updated_data.get('published_year')
    genre = updated_data.get('genre')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("UPDATE books SET title=?, author=?, published_year=?, genre=? WHERE id=?", 
                   (title, author, published_year, genre, id))
    connection.commit()
    connection.close()

    return jsonify(updated_data)

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM books WHERE id=?", (id,))
    connection.commit()
    connection.close()

    return 'Book deleted', 200

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
