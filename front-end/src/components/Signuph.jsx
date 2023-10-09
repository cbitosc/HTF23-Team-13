import React from 'react'

export default function Signuph() {
  return (
    <div className='d-flex justify-content-around' style={{marginTop:"12rem"}}>
            <div className="card" style={{maxWidth:"24rem"}}>
                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMvR7zQIa5GxtO0aST5Rg2g7TuZs2dBLeuw&usqp=CAU" alt="Card image cap"/>
                <div className="card-body">
                    <a href="signupo" className="btn btn-primary">Sign Up as Organization</a>
                </div>
            </div>
            <div className="card" style={{maxWidth:"24rem"}}>
                <img className="card-img-top" style={{minWidth:"18rem", maxHeight:"12rem"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRog6epfJWr_aK4Q5m5o6OYOGoJAHZMpky4mA&usqp=CAU" alt="Card image cap"/>
                <div className="card-body">
                    <a href="signupu" className="btn btn-primary">Sign Up as User</a>
                </div>
            </div>
    </div>
  )
}
