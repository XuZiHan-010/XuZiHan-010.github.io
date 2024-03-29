/* this linechart race is modified from the example on the echarts smaple https://echarts.apache.org/examples/en/editor.html?c=line-race */
(function() {
  var myChart = echarts.init(document.getElementById('southgrowth'));
var option;
function replayAnimation() {
  // Reset the chart to its initial state
  myChart.clear();
  // Set the option to replay the animation
  myChart.setOption(option, true);
}

// Attach the event listener to the replay button
document.getElementById("replaysouth").addEventListener('click', replayAnimation);


var jsonDataPath = '../data/apportionment.json';

$.get(jsonDataPath, function (_rawData) {
    run(_rawData);
});
  function run(_rawData) {
    const countries = [
      'Alabama',
      'Arkansas',
      'Florida',
      'Georgia',
      'Kentucky',
      'Louisiana',
      'Mississippi',
      'North Carolina',
      'Oklahoma',
      'South Carolina',
      'Tennessee',
      'Texas',
      'Virginia',
      'West Virginia',
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (region) {
      var datasetId = 'dataset_' + region;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1910 },
              { dimension: 'Name', '=': region }
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: region,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[0] + ': ' + params.value[3];
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Year',
          y: 'Population',
          label: ['Name', 'Population'],
          itemName: 'Year',
          tooltip: ['Population']
        }
      });
    });
    option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData
        },
        ...datasetWithFilters
      ],
     
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: function (index, value) {
              return (value % 10 === 0) && (value >= 1910) && (value <= 2020);
          }
      },
        nameLocation: 'middle',
        name: 'Year',
        nameGap: 30,
        nameTextStyle: {
          fontWeight: 'bold', 
          fontSize: 18, 
         
      },
      axisLabel: {
        fontWeight: 'bold'
    }
    },
    yAxis: {
        name: 'Population',
        nameTextStyle: {
            fontWeight: 'bold', 
            fontSize: 18, 
           
        },
        axisLabel: {
            fontWeight: 'bold'
        }
    },
       grid: {
      left: '5%', 
      right: '20%',
      bottom: '20%',
      top:'10%',
      width: 'auto',
      height: '75%',
      containLabel: true // This option ensures that the labels are contained within the grid
  },
  
      series: 
       seriesList
    };


 
   
    myChart.setOption(option);
  }


  
})();
