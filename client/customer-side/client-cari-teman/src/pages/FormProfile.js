export default function FormProfile() {
  return (
    <>
      <div class="container rounded bg-white mt-5">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                src="https://media-exp1.licdn.com/dms/image/C4E03AQEA2hq7k-y8iQ/profile-displayphoto-shrink_200_200/0/1625029397449?e=2147483647&v=beta&t=ZFojw_cAobe7-gi_NJ-gMOoheyV85ucCW6PQWwOVxbc"
                width="90"
              />
              <span class="font-weight-bold">Erlangga Kencana</span>
              <span class="text-black-50">kencanaerlangga@gmail.com</span>
              <span>jalan-jalan</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex flex-row align-items-center back">
                  <i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>Edit Profile</h6>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    value="Erlangga"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value="Kencana"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value="kencanaerlangga@gmail.com"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    value="123123123"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="address"
                    value="jalan-jalan"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="date"
                    class="form-control"
                    value=""
                    placeholder="date of birth"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="instagram"
                    value="erlanggakencana"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value="@erlanggakencana"
                    placeholder="tiwtter"
                  />
                </div>
              </div>
              <div class="mt-5 text-right">
                <button class="btn btn-primary profile-button" type="button">
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
