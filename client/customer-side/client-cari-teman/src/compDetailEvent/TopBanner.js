export default function TopBanner({ name }) {
  return (
    <>
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">{name}</h1>
          <p className="lead my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus
            quaerat quibusdam maxime consequatur beatae facere harum sit iusto
            ullam asperiores officiis, odit nam voluptatum illum quo vero
            numquam, modi non!
          </p>
          <p className="lead mb-0">
            <a href="#" className="text-white fw-bold">
              Continue reading...
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
