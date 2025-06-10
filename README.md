<h1>🏏 IPL Live Match Winning Prediction</h1>

<p>
Live prediction of IPL match outcomes using Logistic Regression, Flask, and React.<br>
A full-stack machine learning project that predicts the winning probability of an IPL team in real time, based on match inputs.
</p>

<p>🔗 Live Demo: <a href="https://ipl-prediction-lac.vercel.app" target="_blank">ipl-prediction-lac.vercel.app</a></p>
<h5>Desktop View</h5>
<img src="https://github.com/user-attachments/assets/c5341543-6ceb-4c91-b52a-9a66d41df072" alt="Prediction Chart" width="500"/>
<img src="https://github.com/user-attachments/assets/0ac519fb-d835-44f8-8e78-ba1c501d4293" alt="Prediction Chart" width="500"/>

<h5>Mobile View</h5>
<img src="https://github.com/user-attachments/assets/9734b07d-e29a-4bf7-b837-ba2f18c07032" alt="Prediction Chart" width="200"/>
<img src="https://github.com/user-attachments/assets/82db7b7e-ba88-409a-84bf-7e345d23c0ad" alt="Prediction Chart" width="200"/>

<h3>Features</h3>
<ul>
    <li>Predicts live match winning probability between two IPL teams.</li>
    <li>Simple and interactive, responsive React-based UI.</li>
    <li>Flask-powered API backend with logistic regression model.</li>
    <li>Deployed frontend using Vercel for quick access.</li>
    <li>Displays prediction results both as text (win probability) and as graphical visualization (e.g., pie chart, Progress chart).</li>
</ul>


<h3> Error Handling</h3>
<p>This application includes basic validation, and will display error messages in the following cases:</p>

<ul>
    <li><strong>Target < Current Score:</strong> The target must be higher than the current score. If not, the app throws a validation error.</li>
    <li><strong>Negative Inputs:</strong> Score, target, overs, or wickets cannot be negative values.</li>
    <li><strong>Same Team Selected:</strong> The batting team and bowling team must be different.</li>
    <li><strong>Incomplete Inputs:</strong> All fields (teams, city, target, current score, overs, and wickets) are required.</li>
    <li><strong>Invalid Overs/Wickets:</strong> Overs should be between 0 and 20, and wickets between 0 and 10.</li>
</ul>

<p>
The app displays appropriate error messages on the frontend when any of these conditions are not met. This ensures that predictions are only made on valid match scenarios.
</p>
<img src="https://github.com/user-attachments/assets/26a6465d-f2c4-43e3-bd20-4bbd2abc772f" alt="Prediction Chart" width="500"/>

<h3>Tech Stack</h3>
<ul>
    <li><strong>Frontend:</strong> React, Tailwind CSS</li>
    <li><strong>Backend:</strong> Python, Flask, Scikit-learn</li>
    <li><strong>Deployment:</strong> Vercel (frontend), Render (backend)</li>
</ul>

<h3>Getting Started</h3>
<h4>Frontend Setup</h4>
<pre>
git clone https://github.com/krishwq/IPL-prediction.git
cd frontend
npm install
npm start
</pre>

<h4>Backend Setup</h4>
<pre>
cd backend
python -m virtualenv env
source venv/bin/activate  # For Windows: env\Scripts\activate\Ps1
pip install -r requirements.txt
python app.py
</pre>

<h3>Model Details</h3>
<ul>
    <li>Algorithm: Logistic Regression</li>
    <li>Trained on historical IPL match data (2008-2019) including team, city, target, score, overs, and wickets.</li>
</ul>

<h3>API Usage</h3>
<p><strong>Endpoint:</strong> <code>POST https://ipl-prediction-xtt5.onrender.com/ </code></p>

<p><strong>Sample Request:</strong></p>
<pre>
{
  "batting_team": "Chennai Super Kings",
  "bowling_team": "Mumbai Indians",
  "city": "Delhi",
  "target": 180,
  "score": 100,
  "overs": 12.3,
  "wickets": 3
}
</pre>

<p><strong>Sample Response:</strong></p>
<pre>
{
  "batting_team_win_prob": 0.65,
  "bowling_team_win_prob": 0.35
}
</pre>

<h3>Project Structure</h3>
<pre>
IPL-prediction/
├── backend/
│   ├── app.py
│   ├── model.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
|── untitled.ipynb
|── deliveries.csv
|── match.csv
└── README.md
</pre>

<h3>Contributing</h3>
<p>Contributions are welcome! Fork the repo and create a pull request with your improvements.</p>

<h3>Contact</h3>
<p>
<b>Krishnendu Bir</b><br>
📧 23ee01025@iitbbs.ac.in<br>
🌐 <a href="https://www.linkedin.com/in/krishnendu-bir-383324284/" target="_blank">LinkedIn</a><br>
🔗 <a href="https://ipl-prediction-lac.vercel.app" target="_blank">Live App</a>
</p>
