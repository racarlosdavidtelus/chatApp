import { useHistory } from "react-router-dom";
import UserName from "./UserName";

const Navbar = () => {


    const history = useHistory();

   

    const onLogOut = (event) => {
        history.replace("/")
    }

    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <UserName></UserName>
                </li>
           
            </ul>
        </div>
        <button className="btn btn-light" onClick={onLogOut}><i className="bi bi-x-circle"></i></button>
        </nav>
    )
    
}

export default Navbar;
