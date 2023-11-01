import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUserID } from '../hooks/useUserID';
import { useCookies } from 'react-cookie';

function Home() {
  const [recipes, setRecipes]=useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID=useUserID();
  const [cookies,_]=useCookies(["access_token"]);

  useEffect(()=>{
    const fetchRecipe= async ()=>{
      try{
        const response=await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        // console.log(response.data);
    }catch(err){
        console.error(err);
      }
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();

    if(cookies.access_token)fetchSavedRecipes();
  },[])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSave=(id)=>savedRecipes.includes(id)

  return (
    <div>
      <h2>Recipes</h2>
      <ul >
        {recipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {cookies.access_token?(<button onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSave(recipe._id)}>
                {isRecipeSave(recipe._id)?"Saved":"Save it"}</button>):""}
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

export default Home
