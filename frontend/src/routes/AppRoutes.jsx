  import React, { useEffect } from "react";
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from "react-router-dom";
  import Home from "../components/Home.jsx";
  import SavedRecipesPage from "../components/SavedRecipesPage.jsx";
  import RecipeDisplay from "../components/RecipeDisplay.jsx";
  import AuthPage from "../components/partials/AuthPage.jsx";
  import SingleRecipe from "../components/SingleRecipe.jsx";
  import NotFound from "../components/partials/NotFound.jsx"; // Assuming NotFound component exists
  import { useDispatch, useSelector } from "react-redux";
  import { loadUserAction } from "../store/actions/userActions.jsx";
  import Header from "../components/partials/Header.jsx";
import Loading from "../components/partials/Loading.jsx";

  const ProtectedRoute = ({ children }) => {
    const { user,isLoading } = useSelector((store) => store.UserSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) dispatch(loadUserAction(navigate));
    }, [dispatch,user]);
    
    if (isLoading) {
      return <Loading />; // Show Loading component while fetching user data
    }
    if (!user) {
      navigate("/");
      return null;
    }
    return children;
  };

  const AppRoutes = () => {
    return (
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Header />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <Header />
                <SavedRecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/save"
            element={
              <ProtectedRoute>
                <Header />
                <SavedRecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/d/:id"
            element={
              <ProtectedRoute>
                <Header />
                <SingleRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={
              <AuthPage/>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
  };

  export default AppRoutes;
