from flask import Flask, jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS


with open('pipe.pkl', 'rb') as file:
    pipe = pickle.load(file)

app = Flask(__name__)
CORS(app)  

@app.route('/', methods=['POST'])
def predict():
    try:
        user_input = request.get_json()
        print(user_input)
        # Extract values
        batting_team = user_input['batting_team']
        bowling_team = user_input['bowling_team']
        city = user_input['city']
        target = user_input['total_runs_x']
        current_run = user_input['current_run']
        current_over = user_input['current_over']
        current_wicket = user_input['current_wicket']

        # Validate inputs
        if target <= 0:
            return jsonify({'error': 'Total runs (target) must be positive.'})

        if current_run < 0 or current_run > target:
            return jsonify({'error': 'Current runs must be between 0 and target score.'})

        if current_over < 0 or current_over > 20:
            return jsonify({'error': 'Current over must be between 0 and 20.'})

        if current_wicket < 0 or current_wicket > 10:
            return jsonify({'error': 'Wickets must be between 0 and 10.'})

        # Derived features
        runs_left = target - current_run
        balls_left = (20 - current_over) * 6
        wickets_left = 10 - current_wicket

        crr = current_run / current_over if current_over != 0 else 0
        rrr = runs_left / (balls_left / 6) if balls_left != 0 else 0

        # Input DataFrame for model
        single_input = pd.DataFrame([{
            "batting_team": batting_team,
            "bowling_team": bowling_team,
            "city": city,
            "runs_left": runs_left,
            "balls_left": balls_left,
            "wickets": wickets_left,
            "total_runs_x": target,
            "crr": crr,
            "rrr": rrr
        }])

        # Predict win probabilities
        proba = pipe.predict_proba(single_input)

        return jsonify({
            'win_bowling': float(proba[0][0]),
            'win_batting': float(proba[0][1])
        })

    except KeyError as e:
        return jsonify({'error': f'Missing field: {e}'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, port=8000)
