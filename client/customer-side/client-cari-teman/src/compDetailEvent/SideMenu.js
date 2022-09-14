import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailEvent, loadingSet } from "../store/action/events";
import { getLocation } from "../store/action/events";

export default function SideMenu({ toSide }) {
  const [mapAttr, setMapAttr] = useState();
  const dispatch = useDispatch();
  const { loading } = useSelector((e) => e.events);
  // const dispatch = useDispatch();
  // const params = useParams();
  // useEffect(() => {
  //   console.log(params.id);
  //   dispatch(detailEvent(params.id)).finally(() => {
  //     dispatch(loadingSet(false));
  //   });
  // }, []);
  useEffect(() => {
    dispatch(getLocation(toSide.location)).then((data) => {
      setMapAttr(
        `https://maps.google.com/maps?q=${data.data.latitude},${data.data.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`
      );
    });
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div className="p-4  rounded" style={{ marginTop: "68px" }}>
              {/* <h5 className="">Create Magnets</h5> */}
              <div className="div">
                <img
                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1019544347768786944/createMagnets.jpg"
                  alt=""
                  className="w-100"
                />
              </div>

              <button
                type="button"
                className="btn text-white w-100 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ backgroundColor: "#F8C456" }}
              >
                <h3>+ magnets</h3>
              </button>
              {/* form nya ditaro di bawah tulisan magnets di halaman sebelah*/}
            </div>

            <div
              className="p-4 mb-3 rounded"
              style={{
                overflow: "hidden",
                background: "none",
                height: "auto",
                width: "100%",
              }}
            >
              <h4 className="mb-3">Maps</h4>
              <iframe
                src={mapAttr}
                style={{
                  width: "100%",
                  height: "auto",
                  frameborder: 0,
                  border: 0,
                  objectFit: "cover",
                }}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
            <div className="p-4 mb-3 rounded">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Date</td>
                    <th
                      className="text-white"
                      style={{ backgroundColor: "#23496D" }}
                    >
                      {toSide.eventDate.toLocaleString().slice(0, 10)}
                    </th>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <th
                      className=" text-white"
                      style={{ backgroundColor: "#23496D" }}
                    >
                      {toSide.eventDuration}
                    </th>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <th
                      className=" text-white"
                      style={{ backgroundColor: "#23496D" }}
                    >
                      {toSide.price}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
