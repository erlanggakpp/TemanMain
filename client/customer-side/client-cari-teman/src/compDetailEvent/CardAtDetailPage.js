import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailEvent, loadingSet } from "../store/action/events";
import ModalMagnets from "./ModalMagnets";

export default function CardAtDetailPage({ magnets }) {
  const [showMagnets, setShowMagnets] = useState([]);
  // const [input, setInput] = useState({
  //   age: "0",
  //   gender: "All Gender"
  // })

  // const changeInput = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   setInput({
  //     ...input,
  //     [name]: value,
  //   });
  // };
  const filterMagnet = (filt) => {
    let res = [];

    if (filt.name == "gender") {
      if (filt.filter === "All") {
        magnets.forEach((el) => {
          res.push(el);
        });
        setShowMagnets(magnets);
      } else {
        magnets.forEach((el) => {
          if (el.specialRequirement == filt.filter) {
            res.push(el);
          }
        });
      }
    }

    if (filt.name == "age") {
      magnets.forEach((el) => {
        if (
          +el.ageRequirement >= +filt.filter &&
          +el.ageRequirement <= 18 &&
          +filt.filter == 10
        ) {
          res.push(el);
        } else if (
          +el.ageRequirement >= +filt.filter &&
          +el.ageRequirement <= 25 &&
          +filt.filter == 19
        ) {
          res.push(el);
        }
        if (
          +el.ageRequirement >= +filt.filter &&
          +el.ageRequirement <= 40 &&
          +filt.filter == 26
        ) {
          res.push(el);
        }
        if (
          +el.ageRequirement >= +filt.filter &&
          +el.ageRequirement <= 70 &&
          +filt.filter == 41
        ) {
          res.push(el);
        }
      });
    }

    setShowMagnets(res);
  };
  // useEffect(() => {
  //   if (input.gender === "All Gender") {
  //     setShowMagnets(magnets)
  //   } else {
  //     const newMagnets = showMagnets.filter(el => el.specialRequirement = input.gender)
  //     setShowMagnets(newMagnets)
  //     console.log(newMagnets, "MASUK ELSE");
  //   }
  // }, [input])

  // console.log("input", input, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // const { loading, eventDetail } = useSelector((e) => e.events);
  // const params = useParams();
  // const dispatch = useDispatch();

  useEffect(() => {
    setShowMagnets(magnets);
    // dispatch(detailEvent(params.id)).finally(() => dispatch(loadingSet(false)));
  }, []);

  console.log(showMagnets);

  // useEffect(() => {
  //   console.log(magnets, "dari card detail magnet");
  // }, []);

  return (
    <>
      {/* {loading ? (
        <>
          <div className="container d-flex justify-content-center align-items-center">
            <div
              style={{ width: "200px", height: "200px", marginTop: "50px" }}
            >
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300940062790/loading.jpg"
                alt=""
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
        </>
      ) : (
      )} */}

      <div className="row mb-2 d-flex justify-content-center">
        <div
          className="row d-flex justify-content-center mb-5"
          style={{ marginLeft: "0" }}
        >
          <div className="col-12 d-flex align-item-center justify-content-center mt-5 p-0 text-light">
            <img
              src="https://cdn.discordapp.com/attachments/1015235714780246077/1019524724109361192/magnetstrips.jpg"
              alt=""
              className="w-100"
            />
          </div>

          {/* <div className="py-5 px-5">
                <div className="row">
              <div className="col-md-6">
                    <p onClick={() => filterMagnet({ name: "gender", filter: "All" })}>All</p>
                    <p onClick={() => filterMagnet({ name: "gender", filter: "All Gender" })}>All Genre</p>
                    <p onClick={() => filterMagnet({ name: "gender", filter: "Male" })}>Male</p>
                <p onClick={() => filterMagnet({ name: "gender", filter: "Female" })}>Female</p>
                  </div>
                <div className="col-md-6">
                    <label>Filter Age</label>
                <p onClick={() => filterMagnet({ name: "age", filter: "10" })}>10 yo - 18 yo</p>
                <p onClick={() => filterMagnet({ name: "age", filter: "19" })}>19 yo - 25 yo</p>
                <p onClick={() => filterMagnet({ name: "age", filter: "26" })}>26 yo - 40 yo</p>
                <p onClick={() => filterMagnet({ name: "age", filter: "41" })}>41 yo - 70 yo</p>
                  </div>
                </div>
              </div> */}
          {showMagnets.length === 0 && (
            <h1 className="mt-5">Sorry, there's no open magnet</h1>
          )}
          <ModalMagnets />
        </div>
        {showMagnets.length !== 0 &&
          showMagnets.map((el) => {
            return (
              <div className="col-md-3" key={el.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static m-2">
                    <div className=" d-flex justify-content-center">
                      <img
                        src={el.User.profilePict}
                        alt=""
                        className="img-fluid rounded-circle h-100 p-4"
                      />
                    </div>
                    <h3 className="mb-0">
                      {el.User.firstName} {el.User.lastName}
                    </h3>
                    <div className="mb-1 text-muted">{el.corfirmationDate}</div>
                    <p className="card-text mb-auto">
                      {" "}
                      participants :{" "}
                      <strong>
                        {el.vacantParticipant} / {el.participant}
                      </strong>
                    </p>
                    <strong className="d-inline-block mb-2 text-primary">
                      {el.specialRequirement}
                    </strong>
                    <Link
                      to={`magnets/${el.id}`}
                      href="#"
                      className="stretched-link"
                    ></Link>
                    <div>
                      <button
                        type="button"
                        className="btn w-100 text-white mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ backgroundColor: "#2e94d1" }}
                      >
                        <h6 style={{ color: "#white" }}>click me!</h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
