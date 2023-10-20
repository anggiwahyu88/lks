import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { api } from "../api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [consultation, setConsultation] = useState({})
    const [vaccinations, setVaccinations] = useState({
        first: null,
        second: null
    })

    const getConsultation = async () => {
        try {
            const response = await api("GET", "/consultations")
            setConsultation(response.data)
        } catch (err) {
            console.error(err);
        }
    }
    const getVaccinations = async () => {
        try {
            const response = await api("GET", "/vaccinations")
            setVaccinations(response.data)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getConsultation()
        getVaccinations()
    }, [])
    return (
        <Layout>
            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Dashboard</h1>
                </div>
            </header>

            <div className="container">
                <section className="consultation-section mb-5">
                    <div className="section-header mb-3">
                        <h4 className="section-title text-muted">My Consultation</h4>
                    </div>
                    <div className="row">
                        {!consultation.status ? <div className="col-md-4">
                            <div className="card card-default">
                                <div className="card-header">
                                    <h5 className="mb-0">Consultation</h5>
                                </div>
                                <div className="card-body">
                                    <Link to={'/consultation'}>+ Request consultation</Link>
                                </div>
                            </div>
                        </div> : ""}
                        {
                            consultation.status ?
                                <div className="col-md-4" >
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Consultation</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tr>
                                                    <th>Status</th>
                                                    <td><span className={`badge ${consultation.status == "accepted" ? "badge-primary" : "badge-info"}`}>{consultation.status}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Disease History</th>
                                                    <td className="text-muted">{consultation?.disease_history || "-"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Current Symptoms</th>
                                                    <td className="text-muted">{consultation?.current_symptoms || "-"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Doctor Name</th>
                                                    <td className="text-muted">{consultation?.doctor?.name || "-"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Doctor Notes</th>
                                                    <td className="text-muted">{consultation?.doctor_notes || "-"}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div> : ""
                        }
                    </div>
                </section>


                <section className="consultation-section mb-5">
                    <div className="section-header mb-3">
                        <h4 className="section-title text-muted">My Vaccinations</h4>
                    </div>
                    <div className="section-body">
                        <div className="row mb-4">
                            {consultation.status != "accepted" ?
                                <div className="col-md-12">
                                    <div className="alert alert-warning">
                                        Your consultation must be approved by doctor to get the vaccine.
                                    </div>
                                </div> : ""
                            }

                            {consultation.status == "accepted" ?
                                <>
                                    {!vaccinations.first ?
                                        <div className="col-md-4">
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">First Vaccination</h5>
                                                </div>
                                                <div className="card-body">
                                                    <Link to="/vaccination?dose=1">+ Register vaccination</Link>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="col-md-4">
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">First Vaccination</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tr>
                                                            <th>Status</th>
                                                            <td className="text-muted"><span className={`badge ${vaccinations?.first?.status == "done" ? "badge-primary" : "badge-info"}`}>{vaccinations?.first?.status == "done" ? "Vaccinated" : "Registered"}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccination_date || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Spot</th>
                                                            <td className="text-muted">{vaccinations?.first?.spot?.name || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccine</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccine?.name || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccinator</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccinator?.name || "-"}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    }


                                </>
                                : ""}
                        </div>

                        {
                            vaccinations.first || vaccinations?.first?.status == "done" ?
                                <div className="row">

                                    {!vaccinations.second ?
                                        <div className="col-md-4">
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">Second Vaccination</h5>
                                                </div>
                                                <div className="card-body">
                                                    <Link to="/vaccination?dose=2">+ Register vaccination</Link>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-md-4">
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">Second Vaccination</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tr>
                                                            <th>Status</th>
                                                            <td className="text-muted"><span className={`badge ${vaccinations?.first?.status == "done" ? "badge-primary" : "badge-info"}`}>{vaccinations?.first?.status == "done" ? "Vaccinated" : "Registered"}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccination_date || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Spot</th>
                                                            <td className="text-muted">{vaccinations?.first?.spot?.name || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccine</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccine?.name || "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccinator</th>
                                                            <td className="text-muted">{vaccinations?.first?.vaccinator?.name || "-"}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                : ""
                        }
                    </div>
                </section>

            </div>
        </Layout>
    );
}

export default Dashboard;