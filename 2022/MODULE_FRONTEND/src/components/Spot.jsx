import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { api } from "../api/api";

const Spot = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState({})
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))

    const submit = async () => {
        const response = await api('POST', '/vaccinations', {
            'spot_id': id,
            date
        })
        if (response.isValid) {
            alert(response.data.message)
        } else {
            alert(response.message)
        }
        navigate('/dashboard')
    }

    const getDetailSpot = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/spots/${id}?date=${date || ""}&token=${localStorage.getItem('token') || null}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setData(result)
        } catch (error) {
            console.error("Error:", error);
            return null
        }
    }
    useEffect(() => {
        getDetailSpot()
    }, [date])
    return (
        <Layout>
            <header className="jumbotron">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="display-4">{data?.spot?.name}</h1>
                        <span className="text-muted">{data?.spot?.address}</span>
                    </div>
                    <button onClick={submit} className="btn btn-primary">Register vaccination</button>
                </div>
            </header>

            <div className="container">

                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="vaccination-date">Select vaccination date</label>
                            <input type="date" className="form-control" id="vaccination-date" onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    {
                        data?.spot?.capacity - 5 >= 0 ?
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h4>Session 1</h4>
                                            <span className="text-muted">09:00 - 11:00</span>
                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 1 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 1 >= 0 ? "filled" : ""}`}> #1 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 2 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 2 >= 0 ? "filled" : ""}`}> #2 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 3 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 3 >= 0 ? "filled" : ""}`}> #3 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 4 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 4 >= 0 ? "filled" : ""}`}> #4 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 5 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 5 >= 0 ? "filled" : ""}`}> #5 </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                    }

                    {
                        data?.spot?.capacity - 10 >= 0 ?
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h4>Session 2</h4>
                                            <span className="text-muted">13:00 - 15:00</span>
                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 6 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 6 >= 0 ? "filled" : ""}`}> #6 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 7 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 7 >= 0 ? "filled" : ""}`}> #7 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 8 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 8 >= 0 ? "filled" : ""}`}> #8 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 9 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 9 >= 0 ? "filled" : ""}`}> #9 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 10 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 10 >= 0 ? "filled" : ""}`}> #10 </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                    }

                    {
                        data?.spot?.capacity - 10 >= 0 ?
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h4>Session 3</h4>
                                            <span className="text-muted">15:00 - 17:00</span>
                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 11 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 11 >= 0 ? "filled" : ""}`}> #11 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 12 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 12 >= 0 ? "filled" : ""}`}> #12 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 13 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 13 >= 0 ? "filled" : ""}`}> #13 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 14 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 14 >= 0 ? "filled" : ""}`}> #14 </div>
                                                </div>
                                                <div className="col-4 mb-4">
                                                    <div className={`slot ${data.vaccinations_count - 15 == -1 ? "bg-primary text-white" : ""} ${data.vaccinations_count - 15 >= 0 ? "filled" : ""}`}> #15 </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Spot