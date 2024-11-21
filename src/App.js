import Login from './login';
import Register from './register';
import Profile from './Resume/Profile Section';
import MainLayout from './components/layouts/Main';
import { useEffect } from 'react';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './constants'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';
import ResumeLayout from './components/layouts/Resume';


const App = () => {       
    const dispatch = useDispatch();
    const { loading, authUserInfo: { isAuth} } = useSelector(store => store.userProfile);
    
    useEffect( () => {
        dispatch(fetchUserProfileInfo());
    }, []);

   
    return (        
        <LoadingWrapper loading={loading}>
        <RouterProvider
         router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<MainLayout />}>
                      <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.PROFILE}/> : <Login />}/>                   
                      <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.PROFILE}/> : <Register />}/>
                      
                      {/* Resume Section */}
                    <Route path={ROUTE_CONSTANTS.PROFILE} element={isAuth? <ResumeLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}>
                    <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile/>}/>
                  { /* <Route path={ROUTE_CONSTANTS.EDUCATION} element={<Education/>}/>
                    <Route path={ROUTE_CONSTANTS.PROJECTS} element={<Projects/>}/>
                    <Route path={ROUTE_CONSTANTS.SKILLS} element={<Skills/>}/>
                    <Route path={ROUTE_CONSTANTS.SOCIAL} element={<Social/>}/> */}
                      </Route>
                    </Route>
                )
            )
         }
         />
         </LoadingWrapper>             
    )
};

export default App;