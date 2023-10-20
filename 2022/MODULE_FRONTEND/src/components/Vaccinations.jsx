import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { api } from "../api/api";

const Vaccinations = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [spots, setSpots] = useState([])

    const myParam = new URLSearchParams(location.search).get('dose')

    const getSpots = async () => {
        const response = await api("GET", "/spots")
        setSpots(response.data.data)
    }

    useEffect(() => {
        getSpots()
    }, [])

    return (
        <Layout>
            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">First Vaccination</h1>
                </div>
            </header>

            <div className="container mb-5">

                <div className="section-header mb-4">
                    <h4 className="section-title text-muted font-weight-normal">List Vaccination Spots in Central Jakarta</h4>
                </div>

                <div className="section-body">
                    {spots.map((data, i) => {
                        const vaccines = Object.keys(data.available_vaccines).filter(key => data.available_vaccines[key] === true);
                        return (
                            <button style={{ border:"none", width:"100%"}} className={`${myParam == data.serve || data.serve == 3 ? "spot" : "spot unavailable"}`} key={i} disabled={myParam != data.serve && data.serve != 3} onClick={()=>navigate(`/spot/${data.id}`)}>
                                <div className="row" >
                                    <div className="col-5">
                                        <h5 className="text-primary">{data.name}</h5>
                                        <span className="text-muted">{data.address}</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Available vaccines</h5>
                                        <span className="text-muted">
                                            {
                                                vaccines.map((element) => {
                                                    return (
                                                        <>
                                                            {vaccines[vaccines.length - 1] == element ? `${element}. ` : `${element}, `}
                                                        </>
                                                    )
                                                })
                                            }
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        <h5>Serve</h5>
                                        <span className="text-muted">
                                            {data.serve == 1 ? "Only first vaccination" : ""}
                                            {data.serve == 2 ? "Only second vaccination" : ""}
                                            {data.serve == 3 ? "Both vaccination" : ""}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}

                </div>

            </div>
        </Layout>
    );
}

export default Vaccinations;