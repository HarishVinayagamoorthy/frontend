// import React, { useEffect, useState } from 'react'

// import axios from'axios'
// import { Link } from 'react-router-dom'
// function Student() {

//     const [student,setStudent]=useState([])

//     useEffect(()=>{
//         axios.get('http://localhost:8081/').then(res=>setStudent(res.data)).catch(err=>console.log(err))

//     },
    
//     [])
    

//     const handleDelete  = async(id)=>{
//         try {
//             await axios.delete('http://localhost:8081/student/'+id)
//             window.location.reload()
//         } catch (err) {
//             console.log(err)
//         }
//     }


//   return (
//     <>

//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>

// <div className='w-50 bg-white rounded p-3'>

// <Link  to='/create'className='btn btn-success'>Add +</Link>

// <table className='table'>

// <thead>



// <tr>

// <th>Name</th>

// <th>Email</th>
// <th>Action</th>


// </tr>

// </thead>

// <tbody>
//     {
//         student.map((data,i)=>(
//             <tr key={i}>
//                 <td>{data.Name}</td>
//                 <td>{data.Email}</td>
//                 <td>
//                     <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
//                     <button className='btn btn-danger' onClick={e=>handleDelete(data.ID)}>Delete</button>


//                 </td>


//             </tr>
//         ))
//     }

// </tbody>

// </table>

// </div>

// </div>
 
// </> )
// }

// export default Student















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                // Ensure the response is an array; if not, set an empty array as default
                setStudents(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8081/student/' + id);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success'>Add +</Link>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(students) && students.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{formatDate(data.DateOfBirth)}</td>
                                <td>
                                    {data.ImagePath && (
                                        <img 
                                            src={`http://localhost:8081${data.ImagePath}`} 
                                            alt="Student" 
                                            width="50" 
                                            height="50" 
                                        />
                                    )}
                                </td>
                                <td>
                                    <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => handleDelete(data.ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;



