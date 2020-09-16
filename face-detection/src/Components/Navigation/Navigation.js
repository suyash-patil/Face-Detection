import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <span><p onClick={()=> onRouteChange('signout')} style={{fontFamily: 'Consolas'}} className="dib f5 pa2 ma3 link dim white bg-pink br3 pointer">Sign Out</p></span>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <span><p onClick={()=> onRouteChange('SignIn')} style={{fontFamily: 'Consolas'}} className="dib f5 pa2 ma3 link dim white bg-pink br3 pointer">Sign In</p></span>
                <span><p onClick={()=> onRouteChange('register')} style={{fontFamily: 'Consolas'}} className="dib f5 pa2 ma3 link dim white bg-pink br3 pointer">Register</p></span>
            </nav>
        )
    }
}

export default Navigation;