export default function ModalMagnets() {
  return (
    <>
      {" "}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Form Create Magnets
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <form>
                        <fieldset>
                          {/* <legend>Disabled fieldset example</legend> */}
                          <div>
                            <label for="disabledTextInput" class="form-label">
                              Age Requirement
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="input number, ex :18"
                            />
                          </div>
                          <div>
                            <label for="disabledSelect" class="form-label">
                              Gender Requirement
                            </label>
                            <select id="disabledSelect" class="form-select">
                              <option disabled selected>
                                -- Select --
                              </option>
                              <option>Man Only</option>
                              <option>Female Only</option>
                              <option>All Gender</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <label
                              for="exampleFormControlTextarea1"
                              class="form-label"
                            >
                              Magnet Description
                            </label>
                            <textarea
                              class="form-control"
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
                                  for="disabledTextInput"
                                  class="form-label"
                                >
                                  Available Slot
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="input number, ex :8"
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              {" "}
                              <div>
                                <label
                                  for="disabledTextInput"
                                  class="form-label"
                                >
                                  Total Participant
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="input number, ex :10"
                                />
                              </div>
                            </div>
                          </div>
                          <br />

                          <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary"
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
