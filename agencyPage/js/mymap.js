"strict mode"

let map;

ymaps.ready(function() {
  map = new ymaps.Map("map", {
    center: [55.823250809107755,37.6104515498001],
    zoom: 9,
  });

  let coords = [
    [55.682293892647124,37.76151306151981],
    [55.78148179135037,37.4099505615198],
    [55.607736779298456,37.43741638183226],
    [55.880416775170815,38.365761108394764],
    [55.88967897584833,37.20670349120727],
  ];  

  for( let i = 0; i < coords.length; i+=1 ) {
    map.geoObjects.add(new ymaps.Placemark( coords[i], {
      iconContent: i+1,
      hintContent: "Hint " + (i+1),
      balloonContentHeader: "<h1>Hello I'm Balloon #" + (i+1) + "</h1>",
      balloonContentBody: "<br><span>It's time to become acquainted.</span><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque atnulla culpa cum ducimus quam quo nesciunt praesentium corrupti et mollitia sapiente.",
    }, {
      preset: "islands#redIcon",
    }));
  }
});