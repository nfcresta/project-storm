// Testing to ensure our app is pulling in json file correctly

// d3.json("clean_storm.json").then(function(d) {
//   console.log(d.schema)
//   console.log(d.data);
//   console.log(d.data.length)
  
//   var test_arr = [];

//   for (var i=0; i < d.data.length; i++){
//     var event_type = d.data[i].event_type
//     var state = d.data[i].state
//     var event_id = d.data[i].event_id
//     test_arr.push([event_type, state, event_id])
//   }

//   console.log(test_arr)

function init(){
  d3.json("clean_storm.json").then(d => {
    var state_names = d.state;
        // push state names to dropdown menu
        for (var i=0; i <= state_names.length; i++){
            var dropdownMenu = d3.select("#selDataset");
            var options = dropdownMenu.append("option");
            options.text(state_names[i]);
        };

  });

};

init();

