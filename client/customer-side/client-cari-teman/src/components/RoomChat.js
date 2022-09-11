export default function RoomChat() {
  return (
    <>
      {/* <div class="container">
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class="card chat-app">
              <div class="chat">
                <div class="chat-header clearfix">
                  <div class="row">
                    <div class="col-lg-6">
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#view_info"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                      </a>
                      <div class="chat-about">
                        <h6 class="m-b-0">Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div class="col-lg-6 hidden-sm text-right">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-secondary"
                      >
                        <i class="fa fa-camera"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-primary"
                      >
                        <i class="fa fa-image"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-info"
                      >
                        <i class="fa fa-cogs"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-warning"
                      >
                        <i class="fa fa-question"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="chat-history">
                  <ul class="m-b-0">
                    <li class="clearfix">
                      <div class="message-data text-right">
                        <span class="message-data-time">10:10 AM, Today</span>
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="message other-message float-right">
                        {" "}
                        Hi Aiden, how are you? How is the project coming along?{" "}
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message-data">
                        <span class="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message-data">
                        <span class="message-data-time">10:15 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="chat-message clearfix">
                  <div class="input-group mb-0">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-send"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter text here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section style={{ "background-color": "white" }}>
        <div class="col-12">
          <div class="card" id="chat1" style={{ "border-radius": "15px" }}>
            <div
              class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                "border-top-left-radius": "15px",
                "border-top-right-radius": "15px",
              }}
            >
              <i class="fas fa-angle-left"></i>
              <p class="mb-0 fw-bold">Live chat</p>
              <i class="fas fa-times"></i>
            </div>
            <div class="card-body">
              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    "border-radius": "15px",
                    "background-color": "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">
                    Hello and thank you for intiving, bro lu tau erlangga ga?
                  </p>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-end mb-4">
                <div
                  class="p-3 me-3 border"
                  style={{
                    "border-radius": "15px",
                    "background-color": "#fbfbfb",
                  }}
                >
                  <p class="small mb-0">kaya pernah denger, yang mana sih?</p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div class="ms-3" style={{ "border-radius": "15px" }}>
                  <div class="bg-image">
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C4E03AQEA2hq7k-y8iQ/profile-displayphoto-shrink_200_200/0/1625029397449?e=2147483647&v=beta&t=ZFojw_cAobe7-gi_NJ-gMOoheyV85ucCW6PQWwOVxbc"
                      style={{ "border-radius": "15px" }}
                      alt="video"
                    />
                    <a href="#!">
                      <div class="mask"></div>
                    </a>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    "border-radius": "15px",
                    "background-color": "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">yang teacher itu loohhh...</p>
                </div>
              </div>

              <form action="">
                <div class="flex-grow-0 py-3 px-4 border-top">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type your message"
                    />
                    <button class="btn btn-primary">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
