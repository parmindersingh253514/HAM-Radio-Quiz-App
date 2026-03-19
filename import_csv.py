import pandas as pd
from app import app, db, Question

def import_data():
    print("Loading CSV into database...")
    df = pd.read_csv('technician_flask_questions.csv')
    
    with app.app_context():
        db.session.query(Question).delete() # Clear old questions
        
        count = 0
        for index, row in df.iterrows():
            if pd.isna(row['question_text']): continue
            
            new_q = Question(
                question_text=str(row['question_text']),
                option_a=str(row['option_a']),
                option_b=str(row['option_b']),
                option_c=str(row['option_c']),
                option_d=str(row['option_d']),
                correct_option=str(row['correct_option']).strip().upper(),
                explanation=str(row['explanation']) if not pd.isna(row['explanation']) else ""
            )
            db.session.add(new_q)
            count += 1
            
        db.session.commit()
        print(f"Success! {count} questions added to the database.")

if __name__ == '__main__':
    import_data()