import { useNavigate, Link } from "react-router-dom";


export default function TopBanner({ eventDetail }) {
  const navigate = useNavigate()
  function move(url){
    navigate(url)
  }
  return (
    <>
      <div
        className="p-4 p-md-5 text-white mt-4"
        style={{ backgroundColor: "#EAF6F6", borderRadius: "30px" }}
      >
        <div className="row">
          <div
            className="col-md-6 px-0 d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <h1 className="display-5  text-dark">
              <strong>{eventDetail.name}</strong>
            </h1>
            <h3 className="text-dark">- {eventDetail.Category.name} -</h3>
            <div class="d-grid gap-2 mt-4">
              {/* <p>{eventDetail.eventHomePageLink}</p> */}
              <button
                class="btn pt-3 px-5"
                type="button"
                style={{ backgroundColor: "#2e94d1", borderRadius : "25px" }}
                // onClick={() => move(eventDetail.eventHomepageLink)}
              >
                <a
                  href={eventDetail.eventHomepageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "text-decoration": "none" }}
                  className="text-dark"
                >
                  <p style={{fontSize : "18px"}} className="text-white">go to offcial website...</p>
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
                className=" h-75 img-fluid"
                style={{ borderRadius: "30px" }}
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
