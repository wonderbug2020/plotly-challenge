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
}

function barChart(selectValue){
  var filterBar = data.samples.filter(value => value.id == selectValue);
  var sampleValues = filterBar.map(value => value.sample_values);
  var otuId = filterBar.map(value => value.otu_ids);
  var otuLabels = filterBar.map(value => value.otu_labels);

  var trace = {
    // x:sampleValues[0].slice(0,10),
    // y:otuId[0].slice(0,10),
    x:sampleValues[0].slice(0,10),
    //y:sampleValues[0].slice(0,10),
    //text:otuLabels[0].slice(0,10),
    type: "bar",
    orientations: "h"
  }

  var layout = {
    xaxis: {
      autorange: "ascending"
    },

    yaxis: {
      side: "left"
    }
  }

  var barData = [trace]

  Plotly.newPlot("bar",barData,layout);



  // console.log(otuId)
}

function bubbleChart(selectValue){

}

function gaugeChart(selectValue){

}

init();