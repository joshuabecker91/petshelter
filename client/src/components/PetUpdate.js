import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PetUpdate = (props) => {

    const { id } = useParams();
    console.log(id);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [petNotFoundError, setPetNotFoundError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setType(response.data.type);
                setDescription(response.data.description);
                setSkillOne(response.data.skillOne);
                setSkillTwo(response.data.skillTwo);
                setSkillThree(response.data.skillThree);
            })
            .catch((err) => {
                console.log(err.response);
                setPetNotFoundError(`Pet not found using that ID`); // If pet is not found, display a page with link to create new pet
            });
    }, []);

    const updatePetHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pet/${id}`, { 
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree,
        })
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
                // errors are set in state so that we can capture and display them when triggered during updating. In this case they are stored as an object.
            });
    };

    return (
        <div className="col-8 mx-auto">
            <div className=" col-12 d-flex justify-content-between my-4 align-items-center">
                <h1 className="mt-4">Pet Shelter</h1>
                <Link className="mt-4" to={"/"}>back to home</Link>
            </div>
            <h3 className="my-4">Edit {name}</h3>
            {petNotFoundError ? (
                <h2>
                    {petNotFoundError} <Link to="/new"><p className="text-warning">Click here to add a new pet</p></Link>
                </h2>
            ) : null}
            <div className="card">
                <form className="my-4 d-flex justify-content-around" onSubmit={updatePetHandler}>
                    <div className="form-group mb-4 col-5">
                        <label className="mb-2" htmlFor="name">Pet Name:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setName(e.target.value)} value={name} />
                        {errors.name ? <p className="text-danger mt-2">{errors.name.message}</p> : null}

                        <label className="mb-2" htmlFor="name">Pet Type:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setType(e.target.value)} value={type} />
                        {errors.type ? <p className="text-danger mt-2">{errors.type.message}</p> : null}

                        <label className="mb-2" htmlFor="name">Description:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                        {errors.description ? <p className="text-danger mt-2">{errors.description.message}</p> : null}
                        <button type="submit" className="btn btn-primary my-4"><i className="bi-pencil-fill me-3"></i>Edit Pet</button>
                    </div>
                    <div className="form-group mb-4 col-5">
                        <p className="d-block">Skills (optional):</p>
                        <label className="mb-2" htmlFor="name">Skill 1:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setSkillOne(e.target.value)} value={skillOne} />
                        {errors.skillOne ? <p className="text-danger mt-2">{errors.skillOne.message}</p> : null}

                        <label className="mb-2" htmlFor="name">Skill 2:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setSkillTwo(e.target.value)} value={skillTwo} />
                        {errors.skillTwo ? <p className="text-danger mt-2">{errors.skillTwo.message}</p> : null}

                        <label className="mb-2" htmlFor="name">Skill 3:</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setSkillThree(e.target.value)} value={skillThree} />
                        {errors.skillThree ? <p className="text-danger mt-2">{errors.skillThree.message}</p> : null}
                    </div>
                </form>
            </div>
            {/* <Link className="my-2" to={"/"}><button className="btn btn-secondary">Cancel</button></Link> */}
        </div>
    );
}

export default PetUpdate;