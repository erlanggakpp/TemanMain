// import NavBar from "../components/NavBar";

import { useEffect, useState } from "react";
import { detailEvent, fetchEvent, loadingSet } from "../store/action/events";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/action/categories";
import { addMagnets, fetchMagnet } from "../store/action/magnets";
import { addInvitation } from "../store/action/invitation";

// const styleRound = {width : 20%}

export default function FormTest() {
  const dispatch = useDispatch();
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const { categories } = useSelector((e) => e.categories);
  const { magnets } = useSelector((e) => e.magnets);
  const [dataForm, setDataForm] = useState({
    UserId: 3,
    EventId: 1,
    confirmationDate: "2022/10/03",
    status: "open",
    ageRequirement: "",
    specialRequirement: "",
    magnetDescription: "",
    participant: "",
    vacantParticipant: "",
    participantDescription: "",
  });
  const [invitationForm, setinvitationForm] = useState({
    EventId: 3,
    UserId: 3,
    MagnetId: 1,
    invitationDescription: "",
    status: "",
  });
  const changeForm = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };
  const changeInvitationForm = (e) => {
    const { name, value } = e.target;
    setinvitationForm({
      ...invitationForm,
      [name]: value,
    });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(addMagnets(dataForm));
  };
  const formInvitation = (e) => {
    e.preventDefault();
    dispatch(addInvitation(invitationForm));
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* <div id="add-food">
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "60px" }}
        >
          <div className="card shadow">
            <div className="card-body" style={{ width: "400px" }}>
              <form onSubmit={formSubmit}>
                <h3>Add Magnets</h3>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.ageRequirement}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="ageRequirement"
                  />
                  <label htmlFor="floatingInput">ageRequirement</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.specialRequirement}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="specialRequirement"
                  />
                  <label htmlFor="floatingInput">specialRequirement</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.magnetDescription}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="magnetDescription"
                  />
                  <label htmlFor="floatingInput">magnetDescription</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.participant}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="participant"
                  />
                  <label htmlFor="floatingInput">participant</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.vacantParticipant}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="vacantParticipant"
                  />
                  <label htmlFor="floatingInput">vacantParticipant</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={dataForm.participantDescription}
                    onChange={changeForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="participantDescription"
                  />
                  <label htmlFor="floatingInput">participantDescription</label>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  <button
                    className="btn btn-primary ms-2"
                    id="addFood"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "60px" }}
        >
          <div className="card shadow">
            <div className="card-body" style={{ width: "400px" }}>
              <form onSubmit={formInvitation}>
                <h3>Add Invitation</h3>
                <div className="form-floating mb-3">
                  <input
                    value={invitationForm.invitationDescription}
                    onChange={changeInvitationForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="invitationDescription"
                  />
                  <label htmlFor="floatingInput">invitationDescription</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={invitationForm.status}
                    onChange={changeInvitationForm}
                    type="text"
                    className="form-control"
                    placeholder="Food Name"
                    name="status"
                  />
                  <label htmlFor="floatingInput">status</label>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  <button
                    className="btn btn-primary ms-2"
                    id="addFood"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}