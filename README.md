# 🎙️ HAM Pro Prep - Technician Class Practice Exam App

## Project Overview
HAM Pro Prep is a full-stack web application designed to help users study for the Amateur Radio (HAM) Technician Class license. 

What started as a static HTML/JavaScript mockup was scaled into a complete, database-driven Python web application. It features secure user authentication, personalized progress tracking, and a dynamic, single-page-application (SPA) quiz interface that pulls randomized questions from a RESTful API.

## Features
* **User Authentication:** Secure sign-up and login system using `Flask-Login` and password hashing via `Werkzeug`.
* **Dynamic Quiz Engine:** A sleek, JavaScript-driven quiz interface that fetches questions seamlessly from the backend API without reloading the page.
* **Randomized Testing:** The backend shuffles the 411-question official pool and delivers 20 random questions per session.
* **Progress Tracking:** A user dashboard that saves and displays past test scores to track study progress.
* **Modern UI:** Responsive, glass-morphism styling built with Bootstrap 5 and custom CSS.
* **Data Ingestion Pipeline:** A custom Python/Pandas script that cleans and migrates the official FCC CSV question pool into the relational database.

## Tech Stack
* **Backend:** Python, Flask
* **Database:** SQLite, Flask-SQLAlchemy (ORM)
* **Data Processing:** Pandas
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, Bootstrap 5

## Project Structure
```text
hello/
│
├── app.py                         # The main Flask server and API endpoints
├── import_csv.py                  # Data pipeline script to load CSV into SQLite
├── technician_flask_questions.csv # The raw data (411 official questions)
│
├── instance/                      # (Auto-generated)
│   └── hamradio.db                # The SQLite relational database
│
├── static/                        # Public assets
│   ├── style.css                  # Custom UI styling
│   └── quiz.js                    # Frontend quiz logic and API fetching
│
└── templates/                     # Jinja2 HTML templates
    ├── base.html                  # Master layout and navigation
    ├── login.html                 # Authentication interface
    ├── signup.html                # Registration interface
    ├── dashboard.html             # User profile and score history
    └── quiz.html                  # The interactive test environment
    ## How We Built It (The Development Journey)

1. **Architecture Planning:** We separated the application into standard MVC (Model-View-Controller) architecture, keeping backend data logic strictly separated from frontend UI.
2. **Database Design:** We created relational database models for `User`, `Question`, and `TestResult` to ensure data integrity.
3. **Data Migration:** We wrote `import_csv.py` to parse a massive CSV file using Pandas, format the text, and inject 411 questions into our SQLite database.
4. **API Development:** We built a JSON API endpoint (`/api/questions`) so the Python backend could seamlessly hand data to the JavaScript frontend.
5. **Frontend Integration:** We wrote vanilla JavaScript to fetch the API data, manage the user's score in real-time, and send the final results back to the database.

## Local Setup & Installation

**1. Create a Virtual Environment**
```bash
python -m venv .venv

# Activate on Windows:
.venv\Scripts\activate

# Activate on Mac/Linux:
source .venv/bin/activate