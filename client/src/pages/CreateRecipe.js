import React, { useState } from 'react'; 
import axios from 'axios';
import {useUserID} from '../hooks/useUserID';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const userID=useUserID();

  const [recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID,
  });

  const handleChange=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value})
  }

  const handleIngredientChange=(event,idx)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients});
  }

  const addIngredients =()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
  }
  
  const navigate=useNavigate();
  const oSubmit= async (event)=>{
    event.preventDefault();
    try{
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/recipes", { ...recipe });
        alert("Recipe Submitted/Created !")
        navigate("/");
    }catch(err){
        console.error(err);
    }
};

  return (
    <div className='create_recipe'>
      <h2>CreateRecipe</h2>
      <form onSubmit={oSubmit}>
        <label htmlFor="name">Name</label>
        <input type='text' id='name' name='name' value={recipe.name} onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient,idx)=>{
          return(
          <input 
          key={idx}
          type="text"
          name="ingredients"
          value={ingredient} 
          onChange={(event)=> handleIngredientChange(event,idx)}
          />)
        })}
        <button type='button' onClick={addIngredients}>Add ingredients</button>
        <label htmlFor="instructions">Instructions</label>
        <textarea onChange={handleChange} id="instructions" value={recipe.instructions} name="instructions"></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' value={recipe.imageUrl} onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type='number' id='cookingTime' onChange={handleChange} value={recipe.cookingTime} name='cookingTime'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateRecipe;
