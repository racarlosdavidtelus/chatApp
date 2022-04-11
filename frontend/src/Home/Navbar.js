import UserName from "./ModalLogin";
const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <UserName></UserName> 
                </li>
            </ul>
        </div>
        </nav>
    )
    
}

export default Navbar;
