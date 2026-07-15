import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Upload, X, Crop, Check } from 'lucide-react';
import { motion } from 'framer-motion';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropperStep({ image, onImageUpdate, onComplete, onBack }) {
  const [imgSrc, setImgSrc] = useState(image || '');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    if (1) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, 1));
    }
  };

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // Set canvas to actual cropped size
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = 'high';

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Get the cropped image data
    const base64Image = canvas.toDataURL('image/jpeg', 1.0);
    onImageUpdate(base64Image);
    onComplete();
  }, [completedCrop, onImageUpdate, onComplete]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Profile Picture</h2>
        <p className="text-slate-500">Upload and crop a professional headshot for your resume.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
        {!imgSrc ? (
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-4 text-slate-400" />
                <p className="mb-2 text-sm text-slate-500 font-semibold">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400">SVG, PNG, JPG or WebP</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
            </label>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="max-h-[400px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 w-full flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-[400px] w-auto"
                />
              </ReactCrop>
            </div>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setImgSrc('')}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                <X size={20} /> Choose Different Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
        >
          Back
        </button>
        
        <button
          onClick={() => {
            if (imgSrc && completedCrop) {
              getCroppedImg();
            } else {
              onComplete(); // Skip if no image uploaded
            }
          }}
          className={`flex items-center gap-2 px-8 py-3 font-bold rounded-xl shadow-premium-orange transition-all ${
            (imgSrc && completedCrop) || !imgSrc 
              ? 'bg-gradient-to-r from-orange-burnt to-orange-warm text-white hover:scale-105' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {imgSrc ? 'Crop & Continue' : 'Skip & Continue'} <Check size={20} />
        </button>
      </div>
    </div>
  );
}
