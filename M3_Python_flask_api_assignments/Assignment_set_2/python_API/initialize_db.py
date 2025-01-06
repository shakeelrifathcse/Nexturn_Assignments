import sqlite3

def initialize_db():
    connection = sqlite3.connect('books.db')
    cursor = connection.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        published_year INTEGER NOT NULL,
        genre TEXT NOT NULL
    )''')

    cursor.execute("SELECT COUNT(*) FROM books")
    count = cursor.fetchone()[0]
    if count == 0:
        sample_data = [
            ("The Beauty of Tamil Nadu", "Shakeel Rifath", 2023, "Cultural Fiction"),
            ("The Roots of Tamil Literature", "Shakeel Rifath", 2024, "Historical Fiction"),
            ("Tamil Nadu: A Journey Through Time", "Shakeel Rifath", 2022, "Non-Fiction"),
            ("The Spirit of Tamil Music", "Shakeel Rifath", 2021, "Music & Arts"),
            ("Echoes of Tamil Villages", "Shakeel Rifath", 2020, "Travel & Culture")
        ]
        cursor.executemany("INSERT INTO books (title, author, published_year, genre) VALUES (?, ?, ?, ?)", sample_data)
        connection.commit()

    connection.close()

if __name__ == "__main__":
    initialize_db()
    print("Database successfully initialized with Tamil Nadu and India-centric books written by Shakeel Rifath.")
