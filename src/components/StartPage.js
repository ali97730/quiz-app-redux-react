import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GetButton from './GetButton';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import "./StartPage.css"
function Settings() {
  const [options, setOptions] = useState(null);
	// replace state hooks with useSelector
  const loading = useSelector(state => state.options.loading)

  const questionCategory = useSelector(state => state.options.question_category)
  const questionDifficulty = useSelector(state => state.options.question_difficulty)
  const questionType = useSelector(state => state.options.question_type)
  const questionAmount = useSelector(state => state.options.amount_of_questions)
	
	// defining to dispatch the actions
  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    localStorage.clear();
    const handleLoadingChange = value => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value
      })
    }

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

	// replace setState with actions
  const handleCategoryChange = event => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      value: event.target.value
    })
  }

  const handleDifficultyChange = event => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      value: event.target.value
    })
  }

  const handleTypeChange = event => {
    dispatch({
      type: 'CHANGE_TYPE',
      value: event.target.value
    })
  }

  const handleAmountChange = event => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      value: event.target.value
    })
  }
  if (!loading) {
    return (
      <div className="startpage">
        <div className="startpage__type">
          <h2>Select Category:</h2>
          
          <div class="mybox">
            <span class="myarrow"><ArrowDropDownCircleIcon fontSize="large"/></span>
                    
                        <select value={questionCategory} onChange={handleCategoryChange}>
                        <option className="item">All</option>
                        {options &&
                          options.map((option) => (
                            <option className="item" value={option.id} key={option.id}>
                            {option.name} 
                            </option>
                          ))}
                      </select>
              </div> 
           

        </div>

        <div className="startpage__type">
          <h2>Select Difficulty:</h2>
          <div class="mybox">
            <span class="myarrow"><ArrowDropDownCircleIcon fontSize="large"/></span>                  
                <select value={questionDifficulty} onChange={handleDifficultyChange}>
                  <option value="" key="difficulty-0">All</option>
                  <option value="easy" key="difficulty-1">Easy</option>
                  <option value="medium" key="difficulty-2">Medium</option>
                  <option value="hard" key="difficulty-3">Hard</option>
            </select>
            </div>
        </div>

        <div className="startpage__type">
          <h2>Select Question Type:</h2>
          <div class="mybox">
            <span class="myarrow"><ArrowDropDownCircleIcon fontSize="large"/></span>
                <select value={questionType} onChange={handleTypeChange}>
                  <option value="" key="type-0">All</option>
                  <option value="multiple" key="type-1">Multiple Choice</option>
                  <option value="boolean" key="type-2">True/False</option>
                  </select>
            </div>
        </div>

				<div className="startpage__type">
          <h2>Amount of Questions:</h2>
          <input value={questionAmount} onChange={handleAmountChange} />
        </div>
        <div className="StartpageButton">
               <GetButton  text="Get Started"/>
        </div>
           
      </div>
    );
  }

  return (
    <p>
      LOADING...
    </p>
  );
}
export default Settings;