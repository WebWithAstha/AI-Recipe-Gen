import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home.jsx";
import SavedRecipesPage from "../components/SavedRecipesPage.jsx";
import RecipeDisplay from "../components/RecipeDisplay.jsx";
import AuthPage from "../components/partials/AuthPage.jsx";


const AppRoutes = () => {
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedRecipesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/save" element={<SavedRecipesPage />} />
          <Route path="/d/:id" element={ <RecipeDisplay/>}/>
        </Routes>
  )
}

export default AppRoutes