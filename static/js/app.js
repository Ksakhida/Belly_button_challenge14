// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Log the entire data to see its structure
    console.log("Metadata fetched:", data);

    // get the metadata field
let metadata = data.metadata;

    // Log the entire data to see its structure
console.log("Metadata field:", metadata);

    // Filter the metadata for the object with the desired sample number
let resultArray = metadata.filter(metaObj => metaObj.id == sample);
    let result = resultArray[0];

    // Log the entire data to see its structure
    console.log("Filtered metadata for sample:", result);


    // Use d3 to select the panel with id of `#sample-metadata`
let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
PANEL.html("");


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
 Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
   });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Log the entire data to see its structure
    console.log("Data fetched:", data);

    // Get the samples field
     let samples = data.samples;

     // Log the entire data to see its structure
     console.log("Samples field:", samples);


    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Log the entire data to see its structure
    console.log("Filtered sample data for sample:", result);


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Log the data to see its structure
    console.log("otu_ids:", otu_ids);
    console.log("otu_labels:", otu_labels);
    console.log("sample_values:", sample_values);


    // Build a Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria"},
      margin: { t: 30 }
    };


    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Log the data to see its structure
     console.log("yticks for bar chart:", yticks);


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" },
      margin: { t: 30, l: 150 }
    };


    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // Log the entire data to see its structure
    console.log("Data fetched on init:", data);


    // Get the names field
     let sampleNames = data.names;

     // Log the entire data to see its structure
     console.log("Sample names:", sampleNames);


    // Use d3 to select the dropdown with id of `#selDataset`
      let selector = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
     sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  

    // Get the first sample from the list
      let firstSample = sampleNames[0];

    //Log the first sample to see its structure
    console.log("First sample:", firstSample); 


    // Build charts and metadata panel with the first sample
       buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


// Function for event listener
function optionChanged(newSample) {

// Log the entire data to see its structure
  console.log("New sample selected:", newSample); 


  // Build charts and metadata panel each time a new sample is selected
   buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
