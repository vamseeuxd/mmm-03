import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "./providers/auth-context/auth-context";

const PrivateRoute = ({component: RouteComponent, ...rest}: any) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/login"}/>)
            }
        />
    );
};


export default PrivateRoute
