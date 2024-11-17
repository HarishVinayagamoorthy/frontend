// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function CreateStudent() {

//     const [name,setName]=useState('')
//     const [email,setEmail]=useState('')

//     const navigate= useNavigate()

//     const handelSubimit = (event)=>{
// event.preventDefault()
// axios.post('http://localhost:8081/create',{name,email})
// .then(res=>{
//     console.log(res);
// navigate('/')
// })
// .catch(err=>console.log(err))
//     }
//   return (<>


//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>

// <div className='w-50 bg-white rounded p-3'>

// <form onSubmit={handelSubimit}>

// <h2>Add Student</h2>

// <div className='mb-2'>

// <label htmlFor="">Name</label>

// <input type="text" placeholder="Enter Name" className="form-control"
// onChange={e=>setName(e.target.value)}/>

// </div>

// <div className='mb-2'>

// <label htmlFor="">Email</label>

// <input type="email" placeholder="Enter Email" className="form-control"
// onChange={e=>setEmail(e.target.value)}/>

// </div>

// <button className='btn btn-success'>Submit</button>

// </form>

// </div>

// </div>
  
// </>)
// }

// export default CreateStudent





import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [image, setImage] = useState(null); // For image upload

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Use FormData for file uploads
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('image', image); // Add the image to formData

        try {
            const res = await axios.post('http://localhost:8081/create', formData, {
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
                    <h2>Add Student</h2>

                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                            onChange={e => setName(e.target.value)}
                            required />
                            
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                            onChange={e => setEmail(e.target.value)} 
                            required/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Date of Birth</label>
                        <input type="date" className="form-control"
                            onChange={e => setDateOfBirth(e.target.value)}
                            required />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Upload Image</label>
                        <input type="file" className="form-control"
                            onChange={e => setImage(e.target.files[0])}
                            required />
                    </div>

                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
