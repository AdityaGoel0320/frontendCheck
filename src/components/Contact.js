import React, { useEffect, useState } from 'react'

export default function Contact() {
  const [userData, setuserData] = useState({ name: "", email: "", phone: "", msg: "" })

  let callContactFnc = async () => {
    console.log("contact fnc called")

    let res = await fetch("https://backend-check-gamma.vercel.app/getData", {
      method: "GET",
      headers: {
        Accept: "applications/json",
        "Content-Type": "applications/json"

      },
      credentials: "include"
    })
    // all data get in this obj
    let data = await res.json();

    // as it will save whole data if user but we only need name , email, phone
    setuserData(data)
    // setuserData({ ...userData, name: data.name, email: data.email, phone: data.phone })


    console.log("userD"  +  userData.name)
  }
  useEffect(() => {
    callContactFnc();
  }, [])


  let handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setuserData({ ...userData, [name]: value })
  }


  let sendContactData = async (e) => {
    e.preventDefault();

    console.log("btn clciked")
    let { name, email, phone, msg } = userData;

    console.log(userData)
    try {
      let res = await fetch("https://backend-check-gamma.vercel.app/contact", {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, msg }),
      })


      let data = await res.json();
      console.log("data" + data)
      if (!data) {
        alert('msg not send');
      } else {
        alert('msg is send succesfully');
        // setuserData({ ...userData, msg: "" })
      }

    } catch (error) {
      console.error(error);
      window.alert('Network Error: Unable to reach the server.');
    }



    console.log("first")
  }
  return (
    <>

      <div className="box">
        <div className="small_box" >
          <h1>name</h1>
          <h3>{userData.name}</h3>
        </div>
        <div className="phone small_box" >
          <h1>phone</h1>
          <h3>{userData.phone}</h3>
        </div>
        <div className="small_box" >
          <h1>email</h1>
          <h3>{userData.email}</h3>
        </div>
        <div className="small_box" >
          <h1>work</h1>
          <h3>{userData.work}</h3>
        </div>
      </div>



      {/* contact us form  */}

      <form method='POST'>
        <h1>Get in Touch</h1>
        <input type="text" placeholder='name' name='name' required="true" value={userData.name} onChange={handleInputs} />
        <input type="text" placeholder='email' name='email' required="true" value={userData.email} onChange={handleInputs} />
        <input type="text" placeholder='phone number' name='phone' required="true" value={userData.phone} onChange={handleInputs} />


        <textarea rows="10" cols="30" placeholder='type your msg' name='msg' required="true" value={userData.msg} onChange={handleInputs}></textarea>


        <button type='submit' onClick={sendContactData}>Submit contact form</button>

      </form>




    </>
  )
}
