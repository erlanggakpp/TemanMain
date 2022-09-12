export default function FilterSide() {
  return (
    <div className="container">
      <div id="mobile-filter">
        <div>
          <h6 className="p-1 border-bottom">Age</h6>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span className="fa fa-circle pr-1" id="red"></span>10-18
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span className="fa fa-circle pr-1" id="teal"></span>19-25
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span className="fa fa-circle pr-1" id="blue"></span>26-40
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span className="fa fa-circle pr-1" id="blue"></span>41-70
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6>Gender</h6>
          <form className="ml-md-2">
            <div className="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" id="boring" />
              <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">
                All Gender
              </label>
            </div>
            <div className="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" id="ugly" />
              <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">
                Man Only
              </label>
            </div>
            <div className="form-inline border rounded p-md-2 p-sm-1">
              <input type="radio" name="type" id="notugly" />
              <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">
                Woman Only
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
