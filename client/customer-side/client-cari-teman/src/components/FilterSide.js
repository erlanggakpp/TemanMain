import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSet } from "../store/action/events";
import { fetchCategory } from "../store/action/categories";

// const { categories } = useSelector((e) => e.categories);
// console.log(categories);
// useEffect(() => {
//   dispatch(fetchCategory()).finally(() => {
//     dispatch(loadingSet(false));
//   });
// }, []);

export default function FilterSide() {
  const dispatch = useDispatch()
  const { categories } = useSelector((e) => e.categories);
  // console.log(categories);
  useEffect(() => {
    dispatch(fetchCategory()).finally(() => {
      dispatch(loadingSet(false));
    });
  }, []);
  return (
    <div className="container">
      <div id="mobile-filter">
        <div>
          <h6 className="p-1 border-bottom"></h6>
          <h4>Category</h4>
          <ul className="list-group">
            {categories.map( e => {
              return (
                <li className="list-group-item list-group-item-action mb-2 rounded">
                  <a>
                    <span className="fa fa-circle pr-1" id="red">
                      {e.name}
                    </span>
                  </a>
                </li>
              );
            })}

          </ul>
        </div>
        <div>
          {/* <h6 className="p-1 border-bottom"></h6> */}
          <hr/>
          <h4>Age</h4>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a>
                <span className="fa fa-circle pr-1" id="red"></span>
                <p>10 - 18</p>
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a>
                <span className="fa fa-circle pr-1" id="teal"></span>
                <p>19 - 25</p>
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a>
                <span className="fa fa-circle pr-1" id="blue"></span>
                <p>26 - 40</p>
              </a>
            </li>
            <li className="list-group-item list-group-item-action mb-2 rounded">
              <a>
                <span className="fa fa-circle pr-1" id="blue"></span>
                <p>41 - 70</p>
              </a>
            </li>
          </ul>
        </div>
        <div>
          {/* <h4 className="p-1 border-bottom"></h4> */}
          <hr/>
          <h4>Gender</h4>
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
