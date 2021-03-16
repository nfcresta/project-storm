storm_data = 'clean_storm.json'

// Fetch the JSON data and console log it
d3.json(storm_data).then(function(d) {
  console.log(d.schema)
  console.log(d.data);
  console.log(d.data.length)
  
  var test_arr = [];

  for (var i=0; i < d.data.length; i++){
    var event_type = d.data[i].event_type
    var state = d.data[i].state
    var event_id = d.data[i].event_id
    test_arr.push([event_type, state, event_id])
  }

  console.log(test_arr)

});


