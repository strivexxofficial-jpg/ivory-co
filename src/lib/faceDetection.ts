import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

let faceLandmarker: FaceLandmarker;

export async function initFaceLandmarker() {
  if (faceLandmarker) return;
  
  // Suppress TFLite/MediaPipe logging
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;

  const isSuppressed = (args: any[]) => 
    args.some(arg => typeof arg === 'string' && (arg.includes('TensorFlow Lite') || arg.includes('TFLite') || arg.includes('XNNPACK')));

  console.log = (...args) => { if (!isSuppressed(args)) originalLog(...args); };
  console.info = (...args) => { if (!isSuppressed(args)) originalInfo(...args); };
  console.warn = (...args) => { if (!isSuppressed(args)) originalWarn(...args); };
  console.error = (...args) => { if (!isSuppressed(args)) originalError(...args); };

  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    faceLandmarker = await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },
        runningMode: "IMAGE",
        numFaces: 1,
      }
    );
  } finally {
    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;
  }
}

export async function detectMouth(image: HTMLImageElement) {
  if (!faceLandmarker) await initFaceLandmarker();
  
  const result = faceLandmarker.detect(image);

  if (!result.faceLandmarks?.length) return null;

  const landmarks = result.faceLandmarks[0];

  // Full lip contours
  const upperLipIndices = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
  const lowerLipIndices = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

  return {
    upperLip: upperLipIndices.map(i => landmarks[i]),
    lowerLip: lowerLipIndices.map(i => landmarks[i]),
  };
}
