
// create function to show initial plots
function init(){
  d3.json("clean_storm.json").then(d => {
      // push state names to dropdown menu
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


// create function to update plots to selected state
function updatePlots(state_choice){
  // vertical bar chart
  d3.json("bar_data.json").then(d => {
      console.log(d.data);
      var filter_array = d.data.filter(sample => sample.state == state_choice);
      console.log(filter_array);
      var months = filter_array.map(sample => sample.event_month);
      var e_count = filter_array.map(sample => sample.event_id);
      console.log(months);

      var trace1 = {
        x:months, 
        y:e_count, 
        type:"bar"
      };
      
      var data = [trace1];
      var layout = {
        title: `<b>${state_choice} Natural Disaster Count<br>by Month (Jan - Jul)</b>`,
        xaxis: { title: "Month" , tickmode: "linear" },
        yaxis: { title: "Number of Natural Disasters" }
      };

      var config = {responsive: true};
      
      Plotly.newPlot("bar", data, layout, config);
  });

  // pie chart
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
      
      var layout = {
        title:`<b>${state_choice} Proportion of Weather Events (Jan - Jul)</b>`
      };

      var config = {responsive: true};
      
      Plotly.newPlot("pie", data, layout, config);
  });

  // Horizontal bar graphs
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
        y: ["Injuries", "Deaths"],
        type: "bar",
        orientation: "h"
      };
    
      var data = [trace3];
      
      var layout = {
        title: `<b>${state_choice} Weather-Related Injuries and Fatalities (Jan - Jul)</b>`,
        xaxis: { title: "Total Count" },
      };

      var config = {responsive: true};
    
      Plotly.newPlot("barh", data, layout, config);

      var trace4 = {
        x: [damage_prop[0], damage_crop[0]],
        y: ["Property Damage (USD)", "Crop Damage (USD)"],
        type: "bar",
        orientation: "h"
      };
      
      var data = [trace4];
      var layout = {
        title: `<b>${state_choice} Weather-Related Costs (Jan - Jul)</b>`,
        xaxis: { title: "Total Damage (USD)" },
        yaxis: { automargin: true }
      };

      var config = {responsive: true};

      Plotly.newPlot("barh2", data, layout, config);

    });
};

// complete optionChanged function
function optionChanged(newID){
  updatePlots(newID);
  // updateMetadata(newID);
}

init();
