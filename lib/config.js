module.exports = {
  DEEPCUBE: {
    RESNET_50: 50.0,
    MOBILENET_V2: 20.0,
    BERT: 500.0,
    VGG_11: 150.0,
    DLRM: 0.05
  },
  OPENVINO: {
    RESNET_50: 100.0,
    MOBILENET_V2: 30.0,
    BERT: 1500.0,
    VGG_11: 350.0,
    DLRM: 0.5
  },
  ONNX_RT: {
    RESNET_50: 150.0,
    MOBILENET_V2: 40.0,
    BERT: 1500.0,
    VGG_11: 750.0,
    DLRM: 0.6
  }
}
