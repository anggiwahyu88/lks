import { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [id_card_number, setIdCard] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const submit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_card_number,
                    password
                }),
            });

            const result = await response.json();
            localStorage.setItem("token", result.login_tokens)
            navigate("/dashboard")
        } catch (error){
            console.error("Error:", error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <header className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-4">Vaccination Platform</h1>
                </div>
            </header>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={submit}>
                            <div className="card-header">
                                <h4 className="mb-0">Login</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">ID Card Number</div>
                                    <div className="col-8"><input type="text" className="form-control" onChange={(e) => setIdCard(e.target.value)} /></div>
                                </div>
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8"><input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} /></div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8"><button className="btn btn-primary" type="submit" disabled={loading}>Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;