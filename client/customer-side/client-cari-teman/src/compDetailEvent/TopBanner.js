import { useNavigate, Link } from "react-router-dom";


export default function TopBanner({ eventDetail }) {
  const navigate = useNavigate()
  function move(url){
    navigate(url)
  }
  return (
    <>
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="row">
          <div
            className="col-md-6 px-0 d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <h1 className="display-4 fst-italic">{eventDetail.name}</h1>
            <h6 className="lead my-3">{eventDetail.Category.name}</h6>
            <div class="d-grid gap-2">
              {/* <p>{eventDetail.eventHomePageLink}</p> */}
              <button
                class="btn btn-warning"
                type="button"
                // onClick={() => move(eventDetail.eventHomepageLink)}
              >
                <a
                  href={eventDetail.eventHomepageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{"text-decoration" : "none"}}
                  className="text-dark"
                >
                  <strong>go to offcial website...</strong>
                </a>
              </button>
            </div>
          </div>
          <div
            className="col-md-6 px-0 d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={eventDetail.image}
                alt=""
                className="rounded h-75 img-fluid"
              />
            </div>
          </div>
        </div>
        <p className="lead my-3">
          {/* {JSON.stringify(eventDetail.eventHomepageLink)} */}
          {/* <navLink to={eventDetail.eventHomepageLink}></navLink> */}
        </p>
      </div>
    </>
  );
}
