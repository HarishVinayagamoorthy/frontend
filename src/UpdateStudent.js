// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function UpdateStudent() {

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const { id } = useParams();
//     const navigate = useNavigate();

//     // Fetch student details by ID when the component mounts
//     useEffect(() => {
//         axios.get('http://localhost:8081/')
//             .then(res => {
//                 // Find the student by ID in the array
//                 const student = res.data.find(student => student.ID === parseInt(id));
//                 if (student) {
//                     setName(student.Name);
//                     setEmail(student.Email);
//                 }
//             })
//             .catch(err => console.log(err));
//     }, [id]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.put('http://localhost:8081/update/' + id, { id, name, email })
//             .then(res => {
//                 console.log(res);
//                 navigate('/');
//             })
//             .catch(err => console.log(err));
//     }

//     return (
//         <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//             <div className='w-50 bg-white rounded p-3'>
//                 <form onSubmit={handleSubmit}>
//                     <h2>Update Student</h2>
//                     <div className='mb-2'>
//                         <label htmlFor="">Name</label>
//                         <input type="text" placeholder="Enter Name" className="form-control"
//                             value={name}
//                             onChange={e => setName(e.target.value)} />
//                     </div>
//                     <div className='mb-2'>
//                         <label htmlFor="">Email</label>
//                         <input type="email" placeholder="Enter Email" className="form-control"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)} />
//                     </div>
//                     <button className='btn btn-success'>Update</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default UpdateStudent;





import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [existingImagePath, setExistingImagePath] = useState('');
    const [image, setImage] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                const student = res.data.find(student => student.ID === parseInt(id));
                if (student) {
                    setName(student.Name);
                    setEmail(student.Email);
                    // Convert the date to the proper format (YYYY-MM-DD)
                    const formattedDate = new Date(student.DateOfBirth).toISOString().split('T')[0];
                    setDateOfBirth(formattedDate);
                    setExistingImagePath(student.ImagePath);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('dateOfBirth', dateOfBirth);
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('existingImagePath', existingImagePath); // Keep the existing image
        }

        try {
            const res = await axios.put('http://localhost:8081/update/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            required/>
                    </div>

                    <div className='mb-2'>
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className='mb-2'>
                        <label>Date of Birth</label>
                        <input type="date" className="form-control"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
                            required />
                    </div>

                    <div className='mb-2'>
                        <label>Upload New Image</label>
                        <input type="file" className="form-control"
                            onChange={e => setImage(e.target.files[0])} 
                            required/>
                    </div>

                    {existingImagePath && <img src={`http://localhost:8081${existingImagePath}`} alt="Student" width="50" />}

                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
