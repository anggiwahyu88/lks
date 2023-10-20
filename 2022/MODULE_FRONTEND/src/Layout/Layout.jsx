const Layout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Vaccination Platform</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>
            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2023 - Anggi Wahyu
                    </div>
                </div>
            </footer>
        </>

    );
}

export default Layout;