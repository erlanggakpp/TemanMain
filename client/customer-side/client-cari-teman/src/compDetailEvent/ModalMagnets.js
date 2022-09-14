import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { detailEvent, loadingSet } from "../store/action/events";
import { addMagnets } from "../store/action/magnets";
const Swal = require("sweetalert2");
export default function ModalMagnets() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    UserId: 3,
    EventId: params.id,
    confirmationDate: "2022/10/03",
    ageRequirement: "",
    specialRequirement: "",
    magnetDescription: "",
    participant: "",
    vacantParticipant: "",
    participantDescription: "",
  });
  const changeForm = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addMagnets(dataForm))
          .then((data) => {
            dispatch(detailEvent(params.id));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: data.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
          })
          .finally(() => {
            dispatch(loadingSet(false));
            navigate(`/events/${params.id}`);
          });
      }
    });
  };

  return (
    <>
      {" "}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Form Create Magnets
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <form onSubmit={formSubmit}>
                        <fieldset>
                          {/* <legend>Disabled fieldset example</legend> */}
                          <div>
                            <label
                              htmlFor="disabledTextInput"
                              className="form-label"
                            >
                              Age Requirement
                            </label>
                            <input
                              value={dataForm.ageRequirement}
                              onChange={changeForm}
                              name="ageRequirement"
                              type="number"
                              className="form-control"
                              placeholder="input number, ex :18"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="disabledSelect"
                              className="form-label"
                            >
                              Gender Requirement
                            </label>
                            <select
                              value={dataForm.specialRequirement}
                              onChange={changeForm}
                              name="specialRequirement"
                              id="disabledSelect"
                              className="form-select"
                            >
                              <option hidden defaultValue>
                                -- Select --
                              </option>
                              <option value={"All gender"}>All Gender</option>
                              <option value={"Male"}>Man Only</option>
                              <option value={"Female"}>Female Only</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Magnet Description
                            </label>
                            <textarea
                              value={dataForm.magnetDescription}
                              onChange={changeForm}
                              name="magnetDescription"
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              placeholder="description"
                              rows="3"
                            ></textarea>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              {" "}
                              <div>
                                <label
                                  htmlFor="disabledTextInput"
                                  className="form-label"
                                >
                                  Available Slot
                                </label>
                                <input
                                  value={dataForm.vacantParticipant}
                                  onChange={changeForm}
                                  name="vacantParticipant"
                                  type="number"
                                  className="form-control"
                                  placeholder="input number, ex :8"
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              {" "}
                              <div>
                                <label
                                  htmlFor="disabledTextInput"
                                  className="form-label"
                                >
                                  Total Participant
                                </label>
                                <input
                                  value={dataForm.participant}
                                  onChange={changeForm}
                                  name="participant"
                                  type="number"
                                  className="form-control"
                                  placeholder="input number, ex :10"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea4"
                              className="form-label"
                            >
                              Participant Description
                            </label>
                            <textarea
                              value={dataForm.participantDescription}
                              onChange={changeForm}
                              name="participantDescription"
                              className="form-control"
                              id="exampleFormControlTextarea4"
                              placeholder="description"
                              rows="3"
                            ></textarea>
                          </div>
                          <br />

                          <div className="modal-footer">
                            <button
                              data-bs-dismiss="modal"
                              type="submit"
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
