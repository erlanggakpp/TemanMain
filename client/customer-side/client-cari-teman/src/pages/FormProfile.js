export default function FormProfile() {
  return (
    <>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                src="https://media-exp1.licdn.com/dms/image/C4E03AQEA2hq7k-y8iQ/profile-displayphoto-shrink_200_200/0/1625029397449?e=2147483647&v=beta&t=ZFojw_cAobe7-gi_NJ-gMOoheyV85ucCW6PQWwOVxbc"
                width="90"
              />
              <span className="font-weight-bold">Erlangga Kencana</span>
              <span className="text-black-50">kencanaerlangga@gmail.com</span>
              <span>jalan-jalan</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back">
                  <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>Edit Profile</h6>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value="Erlangga"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    value="Kencana"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value="kencanaerlangga@gmail.com"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    value="123123123"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="address"
                    value="jalan-jalan"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value=""
                    placeholder="date of birth"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="instagram"
                    value="erlanggakencana"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    value="@erlanggakencana"
                    placeholder="tiwtter"
                  />
                </div>
              </div>
              <div className="mt-5 text-right">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
