import ModalMagnets from "./ModalMagnets";
export default function CardAtDetailPage() {
  return (
    <>
      <div className="row mb-2">
        <div
          className="row d-flex justify-content-center my-4"
          style={{ "margin-left": "0" }}
        >
          <div className="col-12 bg-dark rounded d-flex align-item-center justify-content-center py-2 text-light">
            <h1>Magnets</h1>
          </div>
          <ModalMagnets />
        </div>
        <div className="col-md-3">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                Music
              </strong>
              <h3 className="mb-0">Nama Orang</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
                iure. Fuga ex aperiam unde corporis.
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Adventure
              </strong>
              <h3 className="mb-0">Nama Orang</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
                rem aut natus vel omnis distinctio.
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Travel
              </strong>
              <h3 className="mb-0">Nama Orang</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                sapiente assumenda beatae,est recusandae!
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Museum
              </strong>
              <h3 className="mb-0">Nama Orang</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
                voluptatibus doloribus sapiente minus, quae vitae.
              </p>
              <a href="#" className="stretched-link">
                Continue reading
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
