import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUserID } from '../hooks/useUserID';

function SavedRecipes() {
  const [recipes, setRecipes]=useState([]);
  // const [savedRecipes, setSavedRecipes] = useState([]);
  const userID=useUserID();

  useEffect(()=>{
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // fetchRecipe();
    fetchSavedRecipes();
  },[])


  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {recipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            
            <div className='instructions'>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <p>Cooking Time :{recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedRecipes

