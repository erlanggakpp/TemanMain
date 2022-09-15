export default function Footer() {
  return (
    <>
      <div
        className="container "
        style={{
          marginTop: "100px",
          marginBottom: "50px",
          backgroundColor: "#F8C456",
          height: "150px",
        }}
      >
        <footer
          className="d-flex flex-wrap justify-content-between align-items-center  my-5 border-top"
          style={{ paddingTop: "50px" }}
        >
          <p className="col-md-4 mb-0 text-light">
            <strong>copyright © 2022 - TemanMain</strong>
          </p>

          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            <img
              src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164301342720091/bannerTemanMain.jpg"
              alt=""
              style={{ width: "150px", height: "auto" }}
              className="rounded"
            />
          </a>

          <ul
            className="nav col-md-4 justify-content-end"
            style={{ paddingRight: "20px" }}
          >
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                <strong>Home</strong>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                <strong>Features</strong>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                <strong>Features</strong>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                <strong>FAQs</strong>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                <strong>Features</strong>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
