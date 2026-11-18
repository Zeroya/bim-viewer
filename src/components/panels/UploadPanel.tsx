import { useRef, useState } from 'react';
import { Box, Typography, Button, Alert, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useBimStore } from '../../store/bimStore';
import { createModelFromUpload } from '../../data/presetModels';

type UploadStatus = { type: 'error' | 'success'; text: string } | null;

export default function UploadPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addUploadedModel = useBimStore((s) => s.addUploadedModel);
  const [status, setStatus] = useState<UploadStatus>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setLoading(true);
    setStatus(null);

    try {
      for (const file of Array.from(files)) {
        const lower = file.name.toLowerCase();
        if (!lower.endsWith('.glb') && !lower.endsWith('.gltf')) {
          setStatus({ type: 'error', text: 'Only .glb / .gltf files are supported' });
          continue;
        }
        const url = URL.createObjectURL(file);
        const model = createModelFromUpload(file.name.replace(/\.(glb|gltf)$/i, ''), url, {
          description: `Uploaded: ${file.name}`,
        });
        addUploadedModel(model);
        setStatus({ type: 'success', text: `Model “${model.name}” added to the scene` });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Upload failed';
      setStatus({ type: 'error', text: message });
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <Box className="upload-panel">
      <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
        Upload model
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Drop a GLB/GLTF file or browse. It will appear in the list and on the scene.
      </Typography>

      <div
        className="upload-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <CloudUploadIcon color="primary" fontSize="small" />
        <Typography variant="caption">.glb / .gltf</Typography>
        <Button size="small" variant="contained" sx={{ mt: 0.75 }} component="span">
          Choose file
        </Button>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
          multiple
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {loading && <LinearProgress sx={{ mt: 1 }} />}
      {status && (
        <Alert severity={status.type} sx={{ mt: 1 }} onClose={() => setStatus(null)}>
          {status.text}
        </Alert>
      )}
    </Box>
  );
}
