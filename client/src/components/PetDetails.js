import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const PetDetails = (props) => {

    const { id } = useParams();
    console.log(id);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const navigate = useNavigate();

    // If pet is not found, display a page with link to go back to dashboard
    const [petNotFoundError, setPetNotFoundError] = useState("");

    const [likes, setLikes] = useState(0);

    // Include a button to like a pet, disable it when clicked until the component reloads
    const handleLikes = (e) => {
        setLikes(likes + 1);
        e.currentTarget.disabled = true;
    };

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
                setPetNotFoundError(`Pet not found using that ID`);
            });
    }, []);

    const handleDeletePet = (id) => {
        axios.delete(`http://localhost:8000/api/pet/${id}`)
            .then((response) => {
                console.log("Pet Deleted");
                console.log(response);
                navigate("/");
                // const filteredPets = allPets.filter((pet) => {
                //     return pet._id !== id;
                // });
                // setAllPets(filteredPets); don't need to do this since we will immediately forward them back to home page
            })
            .catch((err) => {
                console.log("Error Deleting Pet", err.response);
            });
    };

    return(
        <div className="col-8 mx-auto">
            <div className=" col-12 d-flex justify-content-between my-4 align-items-center">
                <h1 className="mt-4">Pet Shelter</h1>
                <Link className="mt-4" to={"/"}>back to home</Link>
            </div>
            <div className=" col-12 d-flex justify-content-between my-4">
                <h3>Detals about: {name}</h3>
                <button className="btn btn-danger" onClick={() => handleDeletePet(id)}><i className="bi-house-door-fill me-3"></i>Adopt {name}</button>
            </div>
            {petNotFoundError ? (
                    <h2>
                        {petNotFoundError} <Link to="/"><p className="text-warning">Click here to go back</p></Link>
                    </h2>
                ) : null}
            
            <div className="col-12 card p-2 my-4 d-flex justify-content-around">
                <table className="col-12 mx-auto table-borderless text-start mt-4">
                    <thead className="col-12">
                    </thead>
                    <tbody className="text-start col-12">
                        <tr className="text-start col-12">
                            <td className="col-3 py-2">Pet Type:</td>
                            <td className="col-9 py-2">{type}</td>
                        </tr>
                        <tr className="text-start col-12">
                            <td className="col-3 py-2">Description:</td>
                            <td className="col-9 py-2">{description}</td>
                        </tr>
                        <tr className="text-start col-12">
                            <td className="col-3 py-2">Skills:</td>
                            <td className="col-9 py-2">{skillOne} {skillTwo} {skillThree}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>{name} has {likes} Likes(s)</p>

            <Link className="my-2 mx-2" to={"/"}><button className="btn btn-secondary">Back</button></Link>

            <Link className="my-2" to={`/${id}/edit`}><button className="btn btn-warning mx-2">Edit</button></Link>

            <button className="btn btn-success mx-2" onClick={handleLikes}><i className="bi-hand-thumbs-up-fill me-3"></i>Like {name}</button>

        </div>
    )
}

export default PetDetails;