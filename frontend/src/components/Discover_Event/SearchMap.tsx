const SearchMap = () => {
  // Initialize and add the map
  let map;
  async function initMap(): Promise<void> {
    const position = { lat: -25.344, lng: 131.031 };

    // Request needed libraries.
    //@ts-ignore
    const { Map } = (await google.maps.importLibrary(
      "maps",
    )) as google.maps.MapsLibrary;
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // The map, centered at Uluru
    map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 4,
      center: position,
      mapId: "DEMO_MAP_ID",
    });

    // const marker = new AdvancedMarkerElement({
    //     map: map,
    //     position: position,
    //     title: 'Uluru'
    // });
  }
  initMap();

  return (
    <div className="fixed">
      <div id="map" className="h-96 w-96 -z-20">
        {map}
      </div>
    </div>
  );
};

export default SearchMap;
