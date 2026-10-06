import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL
from werkzeug.security import generate_password_hash
load_dotenv()


app = Flask(__name__)

db_url = URL.create(
    "postgresql+psycopg",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", "5432")),
    database=os.getenv("DB_NAME"),
)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db = SQLAlchemy(app)
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="STUDENT")
    created_at = db.Column(db.DateTime, server_default=db.func.now())


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 409

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        role="STUDENT"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 201



@app.route("/db-test")
def db_test():
    try:
        db.session.execute(db.text("SELECT 1"))
        return "PostgreSQL connected successfully!"
    except Exception as e:
        return f"Database connection failed: {e}", 500
@app.route("/")
def home():
    return "Placement Preparation Portal Backend is running!"

with app.app_context():
    db.create_all()
if __name__ == "__main__":
    app.run(debug=True)