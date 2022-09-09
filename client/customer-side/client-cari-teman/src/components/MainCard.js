export default function MainCard() {
  const arr = ["a","a","a","a","a","a","a","a","a"]
    return (
      <main>
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              { arr.map( e => {
                return (
              <div class="col">
                <div class="card shadow-sm">
                  <svg
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Event Img
                    </text>
                  </svg>

                  <div class="card-body">
                    <p class="card-text">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsa modi placeat porro fugit quas temporibus consequatur animi, quod ullam aliquam!

                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          Wistlist
                        </button>
                      </div>
                      <small class="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
                )
              })}
              
            </div>
          </div>
        </div>
      </main>
    );
}