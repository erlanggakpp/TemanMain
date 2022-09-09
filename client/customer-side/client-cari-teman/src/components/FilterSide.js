
export default function FilterSide() {
  return (
    <div className="container">
      <div id="mobile-filter">
        <div>
          <h6 class="p-1 border-bottom">Filter -1</h6>
          <ul>
            <li>
              <a href="#">test</a>
            </li>
            <li>
              <a href="#">test</a>
            </li>
            <li>
              <a href="#">test</a>
            </li>
            <li>
              <a href="#">test</a>
            </li>
            <li>
              <a href="#">test</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="p-1 border-bottom">Filter -2</h6>
          <p class="mb-2">coba</p>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="red"></span>test
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="teal"></span>test
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="blue"></span>test
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6>Filter -3</h6>
          <form class="ml-md-2">
            <div class="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" id="boring" />
              <label for="boring" class="pl-1 pt-sm-0 pt-1">
                All Gender
              </label>
            </div>
            <div class="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" id="ugly" />
              <label for="ugly" class="pl-1 pt-sm-0 pt-1">
                Man Only
              </label>
            </div>
            <div class="form-inline border rounded p-md-2 p-sm-1">
              <input type="radio" name="type" id="notugly" />
              <label for="notugly" class="pl-1 pt-sm-0 pt-1">
                Woman Only
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
