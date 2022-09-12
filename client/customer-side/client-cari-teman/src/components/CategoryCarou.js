import { useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { loadingSet } from "../store/action/events";
import { fetchCategory } from "../store/action/categories";

export default function CategoryCarou({categoryFiltering}) {
  const dispatch = useDispatch()

  const { categories } = useSelector((e) => e.categories);
  console.log(categories);
  useEffect(() => {
    dispatch(fetchCategory()).finally(() => {
      dispatch(loadingSet(false));
    })
  }, []);

  return (
    <>
    
      <div className="container" style={{ padding: 0 }}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center" style={{"flexWrap" : "wrap", margin : "40px 0"}}>
          <div className="col-2">
                  <div onClick={() => categoryFiltering(0)}>
                   
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pornhub-logo.svg/800px-Pornhub-logo.svg.png"
                    alt=""
                    className="img-fluid rounded-circle"
                    style={{width : "150px", height : "150px", objectFit : "cover"}}
                  />
                  </div>
                </div>
            
            { categories.map( el => {
              return (
                <div className="col-2">
                  <div onClick={() => categoryFiltering(el.id)}>
                   
                    <img
                    src={el.image}
                    alt=""
                    className="img-fluid rounded-circle"
                    style={{width : "150px", height : "150px", objectFit : "cover"}}
                  />
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
      </div>
    </>
 
  );
}
