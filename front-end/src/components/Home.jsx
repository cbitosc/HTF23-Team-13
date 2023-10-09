import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import UserService from "../services/userServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [events, setEvents] = useState([
    { id: "1", name: "srg" },
    { id: "2", name: "SG" },
  ]);
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userId = user.user.userId;
      axios.post("http://127.0.0.1:3000/userEvents", { userId }).then((res) => {
        setUserEvents(res.data);
      });
    }
    var eventDetails = [];

    UserService.getGloabalEvents().then((res) => {
      res.map((obj) => {
        eventDetails.push(obj);
      });

      if (res.length !== 0) setEvents(eventDetails);
    });
    // console.log(eventDetails)
  }, []);
  console.log(events);
  console.log(currentUser);
  const search = (id) => {
    if (currentUser) {
      console.log(currentUser);
      for (let i = 0; i < userEvents.length; i++) {
        if (userEvents[i] == id) return true;
      }
      return false;
    }
    return false;
  };

  const handleRegister = (obj) => {
    // console.log(obj);
    if (!currentUser) {
      navigate("/login");
    //   window.location.reload();
    } 
    else {
      const flag = search(obj.eventId);
      console.log(obj);
      if (flag) {
        if (obj.started) {
            console.log(obj.eventId)
          navigate(`/meet/${obj.eventId}`);
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        var currentEvent;
        for (let i = 0; i < events.length; i++) {
          if (events[i].eventId === obj.eventId) {
            currentEvent = events[i];
          }
        }
        if (currentEvent.contentType == false) {
          // console.log("hi")
          UserService.registerEvent(currentUser.user.userId, obj.eventId);
        //   window.location.reload();
        } else {
          //payement gateway
          navigate("/payment/"+`${currentEvent.eventId}`);
        }
      }
    }
  };
  const handleLogOut = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };
  const getMyevents=()=>{
        // const myEvents= UserService.getMyEvents(currentUser.user.userId,"user");
        navigate("/myEvents")

  } 
  return (
    <div>
    {currentUser!= undefined && currentUser.type=="host"?(<div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <a className="navbar-brand" href="#">
            <strong>Host - It !!!</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {currentUser ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/createEvent">
                    Create-Event
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/myEvents">
                    My-Events
                  </a>
                </li>

                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/signinh">
                    LoginIN
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signuph">
                    Signup
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div>
          <h1 className="m-5" style={{ textAlign: "center" }}>
            UpComming Events
          </h1>
          {events.map((obj) => (
            <div
              key="1"
              className="container-fluid mt-5"
              style={{ maxWidth: "56rem" }}
            >
              <div className="row">
                <div className="col-12 mt-3">
                  <div className="card">
                    <div className="card-horizontal">
                      <div className="img-square-wrapper">
                        <img
                          className=""
                          src="http://via.placeholder.com/300x180"
                          alt="Card image cap"
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{obj.title} </h4>
                        <p className="card-text">{obj.description}</p>
                        <div className="d-flex flex-row-reverse">
                          <button
                            type="button"
                            onClick={() => {
                              handleRegister(obj);
                            }}
                            className="btn btn-success"
                          >
                            {search(obj.eventId) ? "Start" : "Register"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>):(<div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <a className="navbar-brand" href="#">
            <strong>Host - It !!!</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {currentUser ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={getMyevents}>
                    MyEvents
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/signinh">
                    LoginIN
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signuph">
                    Signup
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div>
          <h1 className="m-5" style={{ textAlign: "center" }}>
            UpComming Events
          </h1>
          {events.map((obj) => (
            <div
              key={obj.eventId}
              className="container-fluid mt-5"
              style={{ maxWidth: "56rem" }}
            >
              <div className="row">
                <div className="col-12 mt-3">
                  <div className="card">
                    <div className="card-horizontal">
                      <div className="img-square-wrapper">
                        <img
                          className=""
                          src="http://via.placeholder.com/300x180"
                          alt="Card image cap"
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{obj.title} </h4>
                        <p className="card-text">{obj.description}</p>
                        <div className="d-flex flex-row-reverse">
                          <button
                            type="button"
                            onClick={() => {
                              handleRegister(obj);
                            }}
                            className="btn btn-success"
                          >
                            {search(obj.eventId) ? "Join" : "Register"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>)}
      
    </div>
  );
}
