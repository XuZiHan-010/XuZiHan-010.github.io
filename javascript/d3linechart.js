/*This example is based ont he d3 sample from the practical in week4*/ 
  (function() { // Load the population data from the data directory
   d3.csv("data/apportionment.csv", function(error, data) {
    if (error) {
        console.error('Error loading the CSV data: ', error);
        return;
    }

    var stateMenu = document.getElementById("StateMenu"); 

    // Extract unique states from the data
    var states = Array.from(new Set(data.map(function(d) { return d.Name; }))); 

    // Populate the dropdown menu with states
    states.forEach(function(state) {
        var el = document.createElement("option");
        el.textContent = state;
        el.value = state;
        stateMenu.appendChild(el);
    });

    // Function to set the data for the selected state and update the chart
    function setStateData(selectedState) {
        var chartdata = data.filter(function(d) { return d.Name === selectedState; }) 
            .map(function(d) {
                var cleanPopulation = d.Population.replace(/,/g, ''); // Remove commas in the population
                var population = +cleanPopulation; // Convert to number for the population data
                return { "Year": d.Year, "Population": population }; 
            });

        // Clear any existing SVG elements
        d3.select("#chartContainer").selectAll("svg").remove();

        // Create a new SVG for the chart
        var svg = dimple.newSvg("#chartContainer", 1000, 700);
        var myChart = new dimple.chart(svg, chartdata);
        myChart.setBounds(90, 15, 900, 550);

        // Define the x and y axes and set larger font sizes
        var x = myChart.addCategoryAxis("x", "Year");
        x.title = "Year";
        x.fontSize = "14px"; 
       
        var y = myChart.addMeasureAxis("y", "Population");
        y.title = "Population";
        y.fontSize = "16px"; 
        y.titleFontSize = "14px"; 


        svg.selectAll('title_class') 
        .style('font-size', '16px')
        .style('font-weight', 'bold');



        // Add a line plot and draw the chart
        var s = myChart.addSeries(null, dimple.plot.line);
        s.lineMarkers = true;
        myChart.draw(500);
    } 

    // Dropdown onchange event listener
    stateMenu.onchange = function() {
        var selectedState = stateMenu.value;
        setStateData(selectedState);
    };

    // Initially set the data for the first state in the dropdown and update the chart
    setStateData(states[0]);

});
})();