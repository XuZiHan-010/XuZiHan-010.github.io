/*This example is based on the echarts sample from https://echarts.apache.org/examples/en/editor.html?c=map-usa*/ 
(function(){
  var myChart = echarts.init(document.getElementById('usmap'));


myChart.showLoading();

// Load the geojson of the USA
$.get('../data/USA.json', function (usaJson) {
  myChart.hideLoading();
  echarts.registerMap('USA', usaJson, {
    //set the location of the alaska, hawaii, and puerto rico on the map
    Alaska: { left: -121, top: 25, width: 15 },
    Hawaii: { left: -125, top: 28, width: 5 },
    'Puerto Rico': { left: -76, top: 26, width: 2 }
  });



  window.addEventListener('resize', function () {
     mychart.resize();
  });



  // Fetch the converted json file for the population data from census 2020
  fetch('../data/uscensus_data.json') 
    .then(response => response.json())
    .then(data => {
      var option = {
        title: {
          text: 'USA Population Visualization (2020 Census)',
          subtext: 'Data from www.census.gov',
          sublink: 'https://www.census.gov/data/tables/time-series/dec/popchange-data-text.html',
          left: 'right'
        },
        tooltip: { trigger: 'item', showDelay: 0, transitionDuration: 0.2 },
        visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
          inRange: { color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: { dataView: { readOnly: false }, restore: {}, saveAsImage: {} }
        },
        series: [
          {
            name: 'USA Populations 2020 Census',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: { label: { show: true } },
            data: data // Use the loaded census data for the series data
          }
        ]
        
      };
// Media query adjustments for responsiveness
if (window.innerWidth <= 500) {
  option.series[0].emphasis.label.show = false; // Hide labels to prevent overlap
  // Other adjustments can be done here as per requirements
}

      // Set the loaded option
      myChart.setOption(option);
    })
    .catch(error => console.error('Error fetching data:', error));
});
})();