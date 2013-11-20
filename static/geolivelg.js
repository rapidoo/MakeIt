
var delay = 60;

default_series = [
	{ name: "B2B", data: [0] },
	{ name: "COMMERCE", data: [0] },
	{ name: "MAISON", data: [0] },
	{ name: "PUBLIC", data: [0] },
	{ name: "SERVICE", data: [0] }
];

var layers = [];
var requests = [ { label: "", service: 1 },
		 { label: "", service: 1 },
		 { label: "", service: 1 },
		 { label: "", service: 1 } ];

function formatNumber(number)
{
    x = number+'';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x)) {
        x = x.replace(rgx, '$1' + ' ' + '$2');
    }
    return x;
};

function update_compteur() {
        $.get("/api/compteur", function(data) {
                $('.compteur').text(formatNumber(data.total));
        });
};

function update_verticale() {
        var chart = $('#vertical').highcharts();
        $.get("/api/vertical", function(data) {
		// reset empty id
                // $.each(default_series, function(j, series_item) { chart.series[j].data[0].update([ 0 ]); });
                $.each(data.result, function(i, data_item) {
                        $.each(default_series, function(j, series_item) {
                                if (data_item._id == series_item.name) {
                                        chart.series[j].data[0].update([ data.result[i].count ]);
                                }
                        });
                });
        });
};

function update_map() {
        var features = [];
	var geojsonMarkerOptions = {
		radius: 3,
		fillColor: "#FF0000",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 1
	};

        $.get("/api/marker", function(data) {
		// update last request
		if (data.requete[0].ou=="") ou="France"; else ou=data.requete[0].ou;
		requests.unshift({ label: data.requete[0].quiquoi + " / " + ou, service: data.requete[0].service });
		requests.pop();
                $.each(data.requete, function(i, item) {
                    features.push({
                        "type" : "Feature",
                        "properties" : {
                                "time": item.date_ts },
                        "geometry" : {
                                "type" : "Point",
                                "coordinates" : [ item.longitude, item.latitude, 1 ] }
                        });
                });
                var layer = L.geoJson(
			{ "type" : "FeatureCollection", "features": features },
			{ pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, geojsonMarkerOptions);
			}});
                layers.push(layer);
                layer.addTo(map);
	}, "json" );
};

function update_request() {
	$("li").each( function( index, element ) {
		$(this).text(requests[index].label);
		if (requests[index].service==14)
			$(this).attr("class", "jaunes");
		else
			$(this).attr("class", "blanc");
	});
};

function removeLayer() {
	while (layers.length>delay) {
                var layer = layers.shift();
                map.removeLayer(layer);
                layers[0].setStyle({ "opacity": 0.15 });
        }
};

function getData() {
	update_compteur();
	update_verticale();
	update_map();
	update_request();
	removeLayer();
};

