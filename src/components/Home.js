import React, { useEffect, useState } from 'react'


export default function Home() {
  const [userData, setuserData] = useState({})

  const [showName, setshowName] = useState(false)


  let fetchHomePageData = async () => {
    console.log("first")
    try {
      console.log("enter in about us froned section")
      let res = await fetch("https://backend-check-gamma.vercel.app/getData", {
        method: "GET",
        headers: {
          Accept: "applications/json",
          "Content-Type": "applications/json"

        },
        credentials: "include"
      })


      console.log("response  = " + res)

      const data = await res.json();
      // now this data have all data formn database

      setuserData(data)

      console.log(data)
      if (res.status === 401) {
        // means erro in authirization
        console.log("error in authior")
        setshowName(false)
        let err = new Error("Not Auth")
        throw err;

      } else {
        setshowName(true)
      }


    } catch (error) {
      console.log("error in about frontend = " + error)

    }


  }
  useEffect(() => {
    fetchHomePageData();
  }, [])

  return (

    <>
    <h1>Hello</h1>
    <h2>
      {/* {showName : } */}
    </h2>
      <h2>

        {
          showName ? ( <div className="box">

          <h1>Welcome</h1>



          <h1>hi , I am {userData.name}</h1>
        </div>) : ( <div className="box">

          <h1>Welcome</h1>



          <h1>Login to get full exprericence</h1>
        </div>)
     }

      </h2>
    </>
  )
}
