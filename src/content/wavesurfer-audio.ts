import WaveSurfer from "wavesurfer.js";
import { WaveSurferPlugin } from "wavesurfer.js/types/plugin";

import lamejs from "lamejstmp";
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone';

var ws: WaveSurfer
let recorder: MediaRecorder,
audioCunks: Blob[] = []

function loadWs() {
    ws = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#46a6d8",
      progressColor: "#FFF",
      barWidth: 3,
      barGap: 2,
      height: 20,
      cursorWidth: 1,
      cursorColor: "white",
      responsive: 1000,
      normalize: true,
      plugins: [MicrophonePlugin.create({})]
    });
  
    ws.microphone.on("deviceReady", function (stream) {
      console.log("Device ready!", stream);
  
      recorder = new MediaRecorder(stream);
  
      recorder.ondataavailable = function (e) {
        audioCunks.push(e.data);
        ws.loadBlob(new Blob(audioCunks));
      };
  
      recorder.onstop = () => {
        ws.loadBlob(new Blob(audioCunks));
      };
  
      recorder.start(250);
      //ws.load(URL.createObjectURL(stream));
    });
  
    ws.microphone.on("deviceError", function (code) {
      console.warn("Device error: " + code);
    });
  
    // Attach on ready listener to WaveSurfer
    ws.on("ready", function () {
      //console.log("ready !!");
    });
}

function startRecording() {
    try {
        audioCunks = [];
        ws && ws.destroy();
        loadWs();
        ws.microphone.start();
        // ws.microphone.play();  
    } catch (error) {
        console.log(error);
    }
    
}

function stopRecording() {
    if (!ws) {
      return 
    }
    ws.microphone.stop();
    recorder?.state !== "inactive" && recorder.stop();
}

function pauseRecording() {
    if (!ws) {
        return 
    }
    recorder?.state !== "inactive" && recorder?.state !== 'paused' && recorder.pause();
    ws.microphone.pause();
}

function resumeRecording() {
    if (!ws) {
        return 'inactive'
    }
    recorder?.state !== "inactive" && recorder.state !== "recording" && recorder.resume();
    ws.microphone.start();
}
  
export function playAudio() {
    if (!ws) {
      return;
    }
    ws.play();
    ws.setVolume(1);
}

function analyzeAudioBuffer(aBuffer: AudioBuffer) {
    let numOfChan = aBuffer.numberOfChannels,
      btwLength = aBuffer.length * numOfChan * 2 + 44,
      btwArrBuff = new ArrayBuffer(btwLength),
      btwView = new DataView(btwArrBuff),
      btwChnls = [],
      btwIndex,
      btwSample,
      btwOffset = 0,
      btwPos = 0;
    setUint32(0x46464952); // "RIFF"
    setUint32(btwLength - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(aBuffer.sampleRate);
    setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" - chunk
    setUint32(btwLength - btwPos - 4); // chunk length
  
    for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
      btwChnls.push(aBuffer.getChannelData(btwIndex));
  
    while (btwPos < btwLength) {
      for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
        // interleave btwChnls
        btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
        btwSample =
          (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
        btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
        btwPos += 2;
      }
      btwOffset++; // next source sample
    }
  
    let wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff));
  
    //Stereo
    let data = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2);
    let leftData = [];
    let rightData = [];
    for (let i = 0; i < data.length; i += 2) {
      leftData.push(data[i]);
      rightData.push(data[i + 1]);
    }
    var left = new Int16Array(leftData);
    var right = new Int16Array(rightData);
  
    //STEREO
    if (wavHdr.channels === 2)
      return bufferToMp3(wavHdr.channels, wavHdr.sampleRate, left, right);
    //MONO
    else (wavHdr.channels === 1)
      return bufferToMp3(wavHdr.channels, wavHdr.sampleRate, data);
  
    function setUint16(data: number) {
      btwView.setUint16(btwPos, data, true);
      btwPos += 2;
    }
  
    function setUint32(data: number) {
      btwView.setUint32(btwPos, data, true);
      btwPos += 4;
    }
}
  
function bufferToMp3(channels: number, sampleRate: number, left: Int16Array, right?: Int16Array | null) {
    const buffer = [];
    const samplesPerFrame = 1152;
    const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
    let remaining = left.length;
    let mp3buf = [];
  
    for (let i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
      if (!right) {
        let mono = left.subarray(i, i + samplesPerFrame);
        mp3buf = mp3enc.encodeBuffer(mono);
      } else {
        let leftChunk = left.subarray(i, i + samplesPerFrame);
        let rightChunk = right.subarray(i, i + samplesPerFrame);
        mp3buf = mp3enc.encodeBuffer(leftChunk, rightChunk);
      }
      if (mp3buf.length > 0) {
        buffer.push(mp3buf); //new Int8Array(mp3buf));
      }
      remaining -= samplesPerFrame;
    }
    const d = mp3enc.flush();
    if (d.length > 0) {
      buffer.push(new Int8Array(d));
    }
  
    var mp3Blob = new Blob(buffer, { type: "audio/mpeg" });
  
    return mp3Blob;
}

export class WAS {
    constructor() {
        
    }

    public startRecording() {
        startRecording()
    }

    public stopRecording() {
        stopRecording()
    }

    public resumeRecording() {
        resumeRecording()
    }

    public pauseRecording() {
        pauseRecording()
    }

    public state() {
        if (recorder) {
           return recorder?.state 
        }
        return 'inactive'
    }

    public buff() {
        if (!ws) {
            return
        }
        return analyzeAudioBuffer(ws?.backend?.buffer)
    }
}