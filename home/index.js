import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
let net;
const webcamElement = document.getElementById('webcam');

// JavaScript

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  //net = await mobilenet.load();
  const model = await tf.loadLayersModel('selective_data_model/model.json');
  //net = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

app();