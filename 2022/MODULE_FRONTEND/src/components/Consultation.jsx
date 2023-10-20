import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const Consultation = () => {
    const navigate = useNavigate()
    const [current_symptoms, setCurrent_symptoms] = useState("")
    const [disease_history, setDisease_history] = useState("")
    const [diseaseState, setDiseaseState] = useState('yes')
    const [current_symptomsState, setCurrent_symptomsState] = useState('no')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (diseaseState == 'no') setDisease_history("")
        if (current_symptomsState == 'no') setCurrent_symptoms("")
    }, [diseaseState, current_symptomsState])

    const submit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api("POST", "/consultations", {
                current_symptoms,
                disease_history
            })
            alert(response.message)
            navigate("/dashboard")
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Request Consultation</h1>
                </div>
            </header>

            <div className="container">
                <form onSubmit={submit}>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label htmlFor="disease-history" className="mr-3 mb-0">Do you have disease history ?</label>
                                    <select className="form-control-sm" onChange={(e) => setDiseaseState(e.target.value)}>
                                        <option value="yes">Yes, I have</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                {
                                    diseaseState == 'yes' ?
                                        <textarea id="disease-history" className="form-control" cols="30" rows="10" placeholder="Describe your disease history" onChange={(e) => setDisease_history(e.target.value)} value={disease_history}></textarea>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label htmlFor="current-symptoms" className="mr-3 mb-0">Do you have symptoms now ?</label>
                                    <select className="form-control-sm" onChange={(e) => setCurrent_symptomsState(e.target.value)}>
                                        <option value="yes">Yes, I have</option>
                                        <option value="no" selected>No</option>
                                    </select>
                                </div>
                                {
                                    current_symptomsState == 'yes' ?
                                        <textarea id="current-symptoms" className="form-control" cols="30" rows="10" placeholder="Describe your current symptoms" onChange={(e) => setCurrent_symptoms(e.target.value)} value={current_symptoms}></textarea>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" disabled={loading}>Send Request</button>
                </form>
            </div>
        </Layout >



    );
}

export default Consultation;