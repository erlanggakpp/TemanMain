export default function Footer(){
    return (
      <>
        <div class="container" style={{ marginTop: "100px" }}>
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-5 border-top">
            <p class="col-md-4 mb-0 text-muted">copyright © 2022 - TemanMain</p>

            <a
              href="/"
              class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164301342720091/bannerTemanMain.jpg"
                alt=""
                style={{ width: "150px", height: "auto" }}
                className="rounded"
              />
            </a>

            <ul class="nav col-md-4 justify-content-end">
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">
                  FAQs
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link px-2 text-muted">
                  About
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </>
    );
}