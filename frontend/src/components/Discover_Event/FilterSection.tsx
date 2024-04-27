import "./FilterSection.css"; // Make sure to create the corresponding CSS file

const FilterSection = () => {
  return (
    <aside className="filter-section">
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          <input type="checkbox" id="business" />
          <label htmlFor="business">Business</label>
        </div>
        <div>
          <input type="checkbox" id="food-drink" />
          <label htmlFor="food-drink">Food & Drink</label>
        </div>
        <div>
          <input type="checkbox" id="health" />
          <label htmlFor="health">Health</label>
        </div>
        <div>
          <input type="checkbox" id="music" />
          <label htmlFor="music">Music</label>
        </div>
        <button>View more</button>
      </div>
      <div className="filter-date">
        <h3>Date</h3>
        <div>
          <input type="radio" name="date" id="today" />
          <label htmlFor="today">Today</label>
        </div>
        <div>
          <input type="radio" name="date" id="tomorrow" />
          <label htmlFor="tomorrow">Tomorrow</label>
        </div>
        <div>
          <input type="radio" name="date" id="this-weekend" />
          <label htmlFor="this-weekend">This weekend</label>
        </div>
        <div>
          <input type="radio" name="date" id="pick-date" />
          <label htmlFor="pick-date">Pick a date...</label>
        </div>
        <button>View more</button>
      </div>
      <div className="filter-price">
        <h3>Price</h3>
        <div>
          <input type="radio" name="price" id="free" />
          <label htmlFor="free">Free</label>
        </div>
        <div>
          <input type="radio" name="price" id="paid" />
          <label htmlFor="paid">Paid</label>
        </div>
      </div>
      <div className="filter-format">
        <h3>Format</h3>
        <div>
          <input type="radio" name="format" id="class" />
          <label htmlFor="class">Class</label>
        </div>
        <div>
          <input type="radio" name="format" id="conference" />
          <label htmlFor="conference">Conference</label>
        </div>
        <div>
          <input type="radio" name="format" id="festival" />
          <label htmlFor="festival">Festival</label>
        </div>
        <div>
          <input type="radio" name="format" id="party" />
          <label htmlFor="party">Party</label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSection;
