import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${BASE_URL}/api/user/save`,inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>

                <table cellSpacing="10" style={{ margin: 'auto' }}>
                    <tbody>
                    <tr>
                        <th>
                            <label>Name: </label>
                        </th>
                        <td>
                            <input type="text" name="name" onChange={handleChange} />
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <label>Email: </label>
                        </th>
                        <td>
                            <input type="text" name="email" onChange={handleChange} />
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <label>Mobile: </label>
                        </th>
                        <td>
                            <input type="text" name="mobile" onChange={handleChange} />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" align="right">
                            <button>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </form>
        </div>
    )

}