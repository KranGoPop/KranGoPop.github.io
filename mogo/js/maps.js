ymaps.ready(function() {
  map = new ymaps.Map("map", {
    center: [55.823250809107755,37.6104515498001],
    zoom: 9,
  });

  let coords = [
    [55.682293892647124,37.76151306151981],
    [55.78148179135037,37.4099505615198],
    [55.607736779298456,37.43741638183226],
  ];  

  for( let i = 0; i < coords.length; i+=1 ) {
    map.geoObjects.add(new ymaps.Placemark( coords[i], {
      iconContent: i+1,
      hintContent: "Hint " + (i+1),
      balloonContentHeader: "<div class='map-ballon-header'>Hello I'm Balloon #" + (i+1) + "</div>",
      balloonContentBody: "<div class='map-ballon-body'>It's time to become acquainted. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque atnulla culpa cum ducimus quam quo nesciunt praesentium corrupti et mollitia sapiente.</div>",
    }, {
      preset: "islands#95e1d3Icon",
    }));
  }
});