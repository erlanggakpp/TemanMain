export default function FilterSide({ categoryFiltering, magnetFiltering, categories }) {
  return (
    <>
        <div className="container">
          <div id="mobile-filter">
            <div>
              <h6 className="p-1 border-bottom"></h6>
              {/* //CATEGORY */}
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1019511451301449808/category.jpg"
                alt=""
                className="w-100"
              />
              <ul className="list-group" style={{ textAlign: "left" }}>
                <li
                  className="list-group-item list-group-item-action mb-2 rounded"
                  onClick={() => categoryFiltering(0)}
                  style={{ border: 0, fontWeight: "bold" }}
                >
                  <span className="fa fa-circle pr-1" id="red">
                    Show All
                  </span>
                </li>
                {categories.map((e) => {
                  return (
                    <li
                      key={e.id}
                      className="list-group-item list-group-item-action mb-2 rounded"
                      onClick={() => categoryFiltering(e.id)}
                      style={{ border: 0, fontWeight: "bold" }}
                    >
                      <span className="fa fa-circle pr-1" id="red">
                        {e.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              {/* <h6 className="p-1 border-bottom"></h6> */}
              <hr />
              {/* //AGE */}
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1019511451737669653/ageCat.jpg"
                alt=""
                className="w-100"
              />
              <ul className="list-group mt-3" style={{ textAlign: "left" }}>
                <li
                  onClick={() => magnetFiltering({ name: "age", filter: 10 })}
                  className="list-group-item list-group-item-action mb-2 rounded"
                  style={{ border: 0, fontWeight: "bold" }}
                >
                  <a>
                    <span className="fa fa-circle pr-1" id="red"></span>
                    <p>10 yo - 18 yo</p>
                  </a>
                </li>
                <li
                  onClick={() => magnetFiltering({ name: "age", filter: 19 })}
                  className="list-group-item list-group-item-action mb-2 rounded"
                  style={{ border: 0, fontWeight: "bold" }}
                >
                  <a>
                    <span className="fa fa-circle pr-1" id="teal"></span>
                    <p>19 yo - 25 yo</p>
                  </a>
                </li>
                <li
                  onClick={() => magnetFiltering({ name: "age", filter: 26 })}
                  className="list-group-item list-group-item-action mb-2 rounded"
                  style={{ border: 0, fontWeight: "bold" }}
                >
                  <a>
                    <span className="fa fa-circle pr-1" id="blue"></span>
                    <p>26 yo - 40 yo</p>
                  </a>
                </li>
                <li
                  onClick={() => magnetFiltering({ name: "age", filter: 41 })}
                  className="list-group-item list-group-item-action mb-2 rounded"
                  style={{ border: 0, fontWeight: "bold" }}
                >
                  <a>
                    <span className="fa fa-circle pr-1" id="blue"></span>
                    <p>41 yo - 70 yo</p>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {/* <h4 className="p-1 border-bottom"></h4> */}
              <hr />
              {/* <h4>Gender</h4> */}
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1019511451519557662/gender.jpg"
                alt=""
                className="w-100"
              />
              <form className="ml-md-2" style={{ textAlign: "left" }}>
                <div
                  className="form-inline rounded p-sm-2 my-2"
                  onClick={() =>
                    magnetFiltering({ name: "gender", filter: "All Gender" })
                  }
                >
                  <input type="radio" name="type" />
                  <label
                    className="pl-1 pt-sm-0 pt-1"
                    style={{ border: 0, fontWeight: "bold" }}
                  >
                    All Gender
                  </label>
                </div>
                <div
                  onClick={() =>
                    magnetFiltering({ name: "gender", filter: "Man Only" })
                  }
                  className="form-inline rounded p-sm-2 my-2"
                >
                  <input type="radio" name="type" id="ugly" />
                  <label
                    htmlFor="ugly"
                    className="pl-1 pt-sm-0 pt-1"
                    style={{ border: 0, fontWeight: "bold" }}
                  >
                    Man Only
                  </label>
                </div>
                <div
                  onClick={() =>
                    magnetFiltering({ name: "gender", filter: "Woman Only" })
                  }
                  className="form-inline rounded p-md-2 p-sm-1"
                >
                  <input type="radio" name="type" id="notugly" />
                  <label
                    htmlFor="notugly"
                    className="pl-1 pt-sm-0 pt-1"
                    style={{ border: 0, fontWeight: "bold" }}
                  >
                    Woman Only
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}
