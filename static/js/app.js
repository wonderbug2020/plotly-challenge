// d3.json('data/samples.json').then(function(data) {
//   console.log(data.otu_ids)
// })

var data;
function init() {
  d3.json("data/samples.json").then(dataInit => {
    data = dataInit;
    var selection = dataInit.names;
    var selector = d3.select("#selDataset");
    selection.forEach(value => {
      selector
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
  var selectValue = d3.select("#selDataset").node().value;
    panelUpdate(selectValue);
    barChart(selectValue);
    bubbleChart(selectValue);
    gaugeChart(selectValue);
}
function panelUpdate(selectValue) {
  var filterData = data.metadata.filter(value => value.id == selectValue);
  var panel = d3.select(".panel-body");
  panel.html("");
  panel.append("p").text(`id: ${filterData[0].id}`);
  panel.append("p").text(`ethnicity: ${filterData[0].ethnicity}`);
  panel.append("p").text(`gender: ${filterData[0].gender}`);
  panel.append("p").text(`age: ${filterData[0].age}`);
  panel.append("p").text(`location: ${filterData[0].location}`);
  panel.append("p").text(`bbtype: ${filterData[0].bbtype}`);
  panel.append("p").text(`wfreq: ${filterData[0].wfreq}`);
}

function barChart(selectValue){
  var filterBar = data.samples.filter(value => value.id == selectValue);
  var sampleValues = filterBar.map(value => value.sample_values);
  var otuId = filterBar.map(value => value.otu_ids);
  var otuIdText = otuId[0].map(value => 'OTD ' + value);
  var otuLabels = filterBar.map(value => value.otu_labels);
  var trace = {
    x:sampleValues[0].slice(0,10).reverse(),
    y:otuIdText.slice(0,10).reverse(),
    text:otuLabels[0].slice(0,10).reverse(),
    type: "bar",
    orientation: "h"
  }
  var layout = {
    width: 400,
    height: 450,
    margin: {
      t: 0,
      b: 15,
      l: 200,
      r: 30,
    },
  }
  var barData = [trace]
  Plotly.newPlot("bar",barData,layout);
}

function bubbleChart(selectValue){
  var filterBar = data.samples.filter(value => value.id == selectValue);
  var sampleValues = filterBar.map(value => value.sample_values);
  var otuId = filterBar.map(value => value.otu_ids);
  var otuLabels = filterBar.map(value => value.otu_labels);
  var trace = {
    x:otuId[0],
    y:sampleValues[0],
    text:otuLabels[0],
    mode: 'markers',
    marker: {
      size: sampleValues[0],
      colorscale: 'Earth',
      color: otuId[0]
      }
  }

  var bubbleData = [trace]
  Plotly.newPlot("bubble",bubbleData)
}

function gaugeChart(selectValue) {
  var filterData = data.metadata.filter(value => value.id == selectValue);
  var wfreq = filterData[0].wfreq;
  var gaugeTrace = {
      type: 'pie',
      showlegend: false,
      hole: 0.5,
      rotation: 90,
      values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
          colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
          hoverinfo: "label"
        },
        hoverinfo: "skip"
      }
      var dot = {
          type: 'scatter',
          x: [0],
          y: [0],
          marker: {
            size: 14,
            color:'39ff14'
          },
          showlegend: false,
          hoverinfo: "skip",
          line: {
            color: '080808'
          }
      }
      var degrees = 180-(20 * wfreq);
      var radius = .4;
      var radians = degrees * Math.PI / 180;
      var aX = 0.025 * Math.cos((radians) * Math.PI / 180);
      var aY = 0.025 * Math.sin((radians) * Math.PI / 180);
      var bX = -0.025 * Math.cos((radians) * Math.PI / 180);
      var bY = -0.025 * Math.sin((radians) * Math.PI / 180);
      var cX = radius * Math.cos(radians);
      var cY = radius * Math.sin(radians);
      var    aXpath = String(aX);
      var    aYpath = String(aY);
      var    bXpath = String(bX);
      var    bYpath = String(bY);
      var    cXpath = String(cX);
      var    cYpath = String(cY);
      var path = 'M ' + aXpath + ' ' + aYpath + ' L ' +
                        bXpath + ' ' + bYpath + ' L ' +
                        cXpath + ' ' + cYpath + ' Z';
          //console.log(path);
      var gaugeLayout = {
          title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
          width: 600,
          height: 500,
          margin: {
            t: 100,
            b: 0,
            l: 0,
            r: 0,
          },
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '39ff14',
              line: {
                color: '080808'
              }
            }],
          xaxis: {zeroline:false,
                  showticklabels:false,
                  showgrid: false,
                  range: [-1, 1],
                  fixedrange: true
                },
          yaxis: {zeroline:false,
                  showticklabels:false,
                  showgrid: false,
                  range: [-1, 1],
                  fixedrange: true
                }
        };
        Plotly.newPlot("gauge", [gaugeTrace, dot], gaugeLayout);
  }

init();
