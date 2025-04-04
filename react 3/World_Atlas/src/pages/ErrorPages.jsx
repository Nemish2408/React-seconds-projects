import React from 'react'
import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPages = () => {
  const error = useRouteError();

  console.log(error);
  
    return(
        <div>
            <h1>Oops! An Error occurred.</h1>
            {error && <p>{error.data}</p>}
            <NavLink to="/"> <button>Go Home</button> </NavLink>
        </div>
    )
}

export default ErrorPages
