import EventBanner from "../../images/diversity_inclusion1.jpg";

function Events() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div
        style={{
          backgroundImage: `url("${EventBanner}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col h-[400px]"
      >
        {" "}
      </div>
    </div>
  );
}

export default Events;
