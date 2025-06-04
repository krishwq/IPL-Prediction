import "./App.css";
import React, { useState } from "react";
import MyPieChart from "./Piechart";
import RadiusBar from "./RadiusBar";
import Alart from "./Alart";
import Spinner from "./Spinner";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, seterror] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleDeactivate = () => {
     if(isOpen){
      setIsOpen(false);
     }
  };
  const [formData, setFormData] = useState({
    batting_team: "",
    bowling_team: "",
    city: "",
    target: "",
    current_run: "",
    current_over: "",
    current_wicket: "",
  });

  const [ProbaData, setProbaData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      batting_team: formData.batting_team,
      bowling_team: formData.bowling_team,
      city: formData.city,
      current_run: Number(formData.current_run),
      current_over: Number(formData.current_over),
      current_wicket: Number(formData.current_wicket),
      total_runs_x: Number(formData.target),
    };
    if(payload.batting_team===payload.bowling_team){
      seterror("Bowling and Batting Team can not be equal.")
      setIsOpen(true)
      return
    }
    if(payload.current_run<0){
      seterror("Current run should greater than zero.")
      setIsOpen(true)
      return
    }
    if(payload.total_runs_x<0){
      seterror("Target run should greater than zero.")
      setIsOpen(true)
      return
    }
    if(payload.total_runs_x<=payload.current_run){
      seterror("Target run should greater than current run.")
      setIsOpen(true)
      return
    }

    setisloading(true)
    try {
      const response = await fetch("https://ipl-prediction-1-h7b8.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setProbaData(data);
      setisloading(false)
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handlereset=()=>{
    setFormData({
       batting_team: "",
    bowling_team: "",
    city: "",
    target: "",
    current_run: "",
    current_over: "",
    current_wicket: "",
    });
    setProbaData("")
  }

  return (
    <>
    {/* <Spinner/> */}
    <Alart isOpen={isOpen} handleDeactivate={handleDeactivate} error={error}/>
      {!ProbaData ? (
       isloading?(<Spinner/>):(

        <>
          <div className="container">
            <h1 className="main-heading">🏏 IPL Match Winner Predictor</h1>
            <p className="sub-heading">
              Get real-time predictions and win probabilities using live match
              data.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Batting team */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="batting-team"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Batting Team
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="batting-team"
                          name="batting_team"
                          value={formData.batting_team}
                          onChange={handleChange}
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option disabled value="">
                            Select a Team
                          </option>
                          <option>Chennai Super Kings</option>
                          <option>Delhi Capitals</option>
                          <option>Kings XI Punjab</option>
                          <option>Kolkata Knight Riders</option>
                          <option>Mumbai Indians</option>
                          <option>Rajasthan Royals</option>
                          <option>Royal Challengers Bangalore</option>
                          <option>Sunrisers Hyderabad</option>
                        </select>
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Bowling team */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="bowling-team"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Bowling Team
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="bowling-team"
                          name="bowling_team"
                          value={formData.bowling_team}
                          onChange={handleChange}
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option disabled value="">
                            Select a Team
                          </option>
                          <option>Chennai Super Kings</option>
                          <option>Delhi Capitals</option>
                          <option>Kings XI Punjab</option>
                          <option>Kolkata Knight Riders</option>
                          <option>Mumbai Indians</option>
                          <option>Rajasthan Royals</option>
                          <option>Royal Challengers Bangalore</option>
                          <option>Sunrisers Hyderabad</option>
                        </select>
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Venue */}

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Venue
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="city"
                          name="city"
                          onChange={handleChange}
                          value={formData.city}
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option disabled value="">
                            Select a City
                          </option>
                          <option>Abu Dhabi</option>
                          <option>Ahmedabad</option>
                          <option>Bangalore</option>
                          <option>Bengaluru</option>
                          <option>Bloemfontein</option>
                          <option>Cape Town</option>
                          <option>Centurion</option>
                          <option>Chandigarh</option>
                          <option>Chennai</option>
                          <option>Cuttack</option>
                          <option>Delhi</option>
                          <option>Dharamsala</option>
                          <option>Durban</option>
                          <option>East London</option>
                          <option>Hyderabad</option>
                          <option>Indore</option>
                          <option>Jaipur</option>
                          <option>Johannesburg</option>
                          <option>Kimberley</option>
                          <option>Kolkata</option>
                          <option>Mohali</option>
                          <option>Mumbai</option>
                          <option>Nagpur</option>
                          <option>Port Elizabeth</option>
                          <option>Pune</option>
                          <option>Raipur</option>
                          <option>Ranchi</option>
                          <option>Sharjah</option>
                          <option>Visakhapatnam</option>
                        </select>
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Target */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="target"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Target
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="target"
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* Current Score */}
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="current-score"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Current Score
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="current_run"
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* Current Over */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="current-over"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Current Over
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          name="current_over"
                          onChange={handleChange}
                          value={formData.current_over}
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option disabled value="">
                            Select a Over
                          </option>
                          {[...Array(19)].map((_, i) => (
                            <option key={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Wickets */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="current-wicket"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Current Wicket
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          name="current_wicket"
                          onChange={handleChange}
                          value={formData.current_wicket}
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option disabled value="">
                            Select wicket fall
                          </option>
                          {[...Array(10)].map((_, i) => (
                            <option key={i}>{i}</option>
                          ))}
                        </select>
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-start gap-x-6">
                <button
                  type="submit"
                  className="rounded-md mb-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Predict
                </button>
              </div>
            </form>
          </div>
        </>)
      ) : (
        <>
        <button className="btn-home" onClick={handlereset}><i class="fa-solid fa-house"></i></button>
          <div className="p-4 sm:p-8 space-y-6 "  >
            {/* Win Probabilities Headings */}
            <div className="text-center mb-3">
              <h1 className="text-xl sm:text-2xl font-semibold">-: Win Probability :-</h1>
              <h1 className="text-xl sm:text-2xl font-semibold text-indigo-700">
                {formData.batting_team} : {(ProbaData.win_batting * 100).toFixed(2)} %
              </h1>
              <h1 className="text-xl sm:text-2xl font-semibold text-green-700">
                {formData.bowling_team} : {(ProbaData.win_bowling*100).toFixed(2)} %
              </h1>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-white p-4 rounded-2xl shadow-md flex flex-col"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <h2 className="text-lg font-medium mb-2 text-center">
                  Win Percentage
                </h2>
                <MyPieChart  
  battingTeam={formData.batting_team} 
  bowlingTeam={formData.bowling_team} 
  battingProb={parseFloat((ProbaData.win_batting * 100).toFixed(2))} 
  bowlingProb={parseFloat((ProbaData.win_bowling * 100).toFixed(2))} 
/>
              </div>
              <div
                className="bg-white p-4 rounded-2xl shadow-md flex flex-col"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <h2 className="text-lg font-medium mb-2 text-center">
                  Current Progress Status
                </h2>
                <RadiusBar 
                battingTeam={formData.batting_team} 
  bowlingTeam={formData.bowling_team} 
  target={formData.target}
  score={formData.current_run}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
