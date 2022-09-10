export default function SideMenu({ toSide }) {
  console.log(toSide);
  return (
    <>
      <div className="col-md-4">
        <div className="position-sticky" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">WhEn UwHerre ?!</h4>
            <p className="mb-0">{toSide.location}</p>
            <p className="mb-0">{toSide.eventDate}</p>
            <p className="mb-0">{toSide.eventDuration}</p>
          </div>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">Maps</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.683728838511!2d107.6198273144352!3d-6.928355569741015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e87ffb3736a5%3A0x1fa0782bad367c26!2sWebhozz+Bandung!5e0!3m2!1sid!2sid!4v1512984270823"
              style={{
                width: "100%",
                height: "auto",
                frameborder: 0,
                border: 0,
                objectFit: "cover",
              }}
            ></iframe>
          </div>

          <div className="p-4">
            <h4 className="fst-italic">Archives</h4>
            <ol className="list-unstyled mb-0">
              <li>
                <a href="#">March 2021</a>
              </li>
              <li>
                <a href="#">February 2021</a>
              </li>
              <li>
                <a href="#">January 2021</a>
              </li>
              <li>
                <a href="#">December 2020</a>
              </li>
              <li>
                <a href="#">November 2020</a>
              </li>
              <li>
                <a href="#">October 2020</a>
              </li>
              <li>
                <a href="#">September 2020</a>
              </li>
              <li>
                <a href="#">August 2020</a>
              </li>
              <li>
                <a href="#">July 2020</a>
              </li>
              <li>
                <a href="#">June 2020</a>
              </li>
              <li>
                <a href="#">May 2020</a>
              </li>
              <li>
                <a href="#">April 2020</a>
              </li>
            </ol>
          </div>

          <div className="p-4">
            <h4 className="fst-italic">Elsewhere</h4>
            <ol className="list-unstyled">
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
