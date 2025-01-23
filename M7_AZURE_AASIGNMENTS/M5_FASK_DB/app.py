import os
from flask import Flask, request, jsonify
import pyodbc

app = Flask(__name__)

# Connection string with updated details
conn_str = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=azure-flask-db-server.database.windows.net;'  # Replace with your server name
    'DATABASE=StudentDB;'  # Replace with your database name
    'UID=shakeelrifath;'  # Your username
    'PWD=securepassword123;'  # Replace with your password
)

def get_db_connection():
    return pyodbc.connect(conn_str)

# CRUD Operations
@app.route('/students', methods=['GET'])
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Students')
    students = []
    for row in cursor.fetchall():
        students.append({
            'id': row[0],
            'name': row[1],
            'age': row[2]
        })
    conn.close()
    return jsonify(students)

@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Students WHERE ID = ?', (id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return jsonify({
            'id': row[0],
            'name': row[1],
            'age': row[2]
        })
    return jsonify({'error': 'Student not found'}), 404

@app.route('/students', methods=['POST'])
def create_student():
    if not request.json or not 'name' in request.json or not 'age' in request.json:
        return jsonify({'error': 'Name and age are required'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO Students (Name, Age) VALUES (?, ?)',
        (request.json['name'], request.json['age'])
    )
    conn.commit()
    
    # Get the ID of the newly inserted student
    cursor.execute('SELECT @@IDENTITY')
    new_id = cursor.fetchone()[0]
    conn.close()
    
    return jsonify({
        'id': new_id,
        'name': request.json['name'],
        'age': request.json['age']
    }), 201

@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    if not request.json:
        return jsonify({'error': 'No data provided'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if student exists
    cursor.execute('SELECT * FROM Students WHERE ID = ?', (id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Student not found'}), 404
    
    # Update the student
    update_fields = []
    params = []
    if 'name' in request.json:
        update_fields.append('Name = ?')
        params.append(request.json['name'])
    if 'age' in request.json:
        update_fields.append('Age = ?')
        params.append(request.json['age'])
    
    if update_fields:
        params.append(id)
        cursor.execute(
            f'UPDATE Students SET {", ".join(update_fields)} WHERE ID = ?',
            tuple(params)
        )
        conn.commit()
    
    conn.close()
    return jsonify({'message': 'Student updated successfully'})

@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM Students WHERE ID = ?', (id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Student not found'}), 404
    
    cursor.execute('DELETE FROM Students WHERE ID = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Student deleted successfully'})

if __name__ == '__main__':
    app.run()
