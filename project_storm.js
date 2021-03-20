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
        // push state names to dropdown menu
        // console.log(d.data);
        var state_array = [];
        var state_names = d.data.map(item => item.state).filter((value, index, self) => self.indexOf(value) === index).sort()

        for (var i=0; i <= state_names.length; i++){
          var dropdownMenu = d3.select("#selDataset");
          var options = dropdownMenu.append("option");
          options.text(state_names[i]);
        };

        // create inital plots
        var first_state = state_names[0];
        updatePlots(first_state);
        // updateMetadata(first_state);
  });
};

function updatePlots(state_choice){
  d3.json("bar_data.json").then(d => {
      console.log(d.data);
      var filter_array = d.data.filter(sample => sample.state==state_choice);
      console.log(filter_array);
      var months = filter_array.map(sample => sample.event_month);
      var e_count = filter_array.map(sample => sample.event_id);
      console.log(months);

      var trace1 = {
        x:months, y:e_count, type:"bar",
      };
      var data = [trace1];
      var layout = {
        title: `${state_choice} Natural Disaster Count<br>by Month (Jan - Jul)`,
        xaxis: { title: "Month" },
        yaxis: { title: "Number of Natural Disasters" }
      };
      Plotly.newPlot("bar", data, layout);
  });

  d3.json("pie_data.json").then(d => {
      console.log(d.data);
      var filter_array = d.data.filter(sample => sample.state==state_choice);
      var e_type = filter_array.map(sample => sample.event_type);
      console.log(e_type);
      var e_count = filter_array.map(sample => sample.event_id);
    
      var trace2 = {
        values:e_count, labels:e_type, type:"pie"
      };
      var data = [trace2];
      var layout = {title:`${state_choice} Proportion of Events (Jan - Jul)`};
      Plotly.newPlot("pie", data, layout);
  });

  d3.json("bubble_data.json").then(d => {
    console.log(d.data);
    var filter_array = d.data.filter(sample => sample.state==state_choice);
    var e_injuries = filter_array.map(sample => sample.total_injuries);
    var e_deaths = filter_array.map(sample => sample.total_deaths);
    var damage_prop = filter_array.map(sample => sample.damage_property);
    var damage_crop = filter_array.map(sample => sample.damage_crops);
    console.log(e_injuries);
    var trace3 = {
      x: [e_injuries[0], e_deaths[0]],
      y: ["Total Injuries", "Total Deaths"],
      type: "bar",
      orientation: "h"
    };
  var data = [trace3];
  var layout = {
      title: `${state_choice} Inuries and Fatalities (Jan - Jul)`
  };
  Plotly.newPlot("barh", data, layout);

  var trace4 = {
    x: [damage_prop[0], damage_crop[0]],
    y: ["Property Damage (USD)", "Property Crops (USD)"],
    type: "bar",
    orientation: "h"
  };
var data = [trace4];
var layout = {
    title: `${state_choice} Property Costs (Jan - Jul)`,
    yaxis: {
      automargin: true
    }
};
Plotly.newPlot("barh2", data, layout);

  });
};

// complete optionChanged function
function optionChanged(newID){
  updatePlots(newID);
  // updateMetadata(newID);
}

init();
