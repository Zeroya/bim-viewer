import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Button,
  FormControlLabel,
  Switch,
  Slider,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import NearMeIcon from '@mui/icons-material/NearMe';
import StraightenIcon from '@mui/icons-material/Straighten';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useBimStore } from '../../store/bimStore';

export default function ToolsPanel() {
  const tool = useBimStore((s) => s.tool);
  const setTool = useBimStore((s) => s.setTool);
  const sectionEnabled = useBimStore((s) => s.sectionEnabled);
  const setSectionEnabled = useBimStore((s) => s.setSectionEnabled);
  const sectionAxis = useBimStore((s) => s.sectionAxis);
  const setSectionAxis = useBimStore((s) => s.setSectionAxis);
  const sectionValue = useBimStore((s) => s.sectionValue);
  const setSectionValue = useBimStore((s) => s.setSectionValue);
  const showEdges = useBimStore((s) => s.showEdges);
  const setShowEdges = useBimStore((s) => s.setShowEdges);
  const wireframe = useBimStore((s) => s.wireframe);
  const setWireframe = useBimStore((s) => s.setWireframe);
  const clearMeasurements = useBimStore((s) => s.clearMeasurements);
  const measurements = useBimStore((s) => s.measurements);
  const resetView = useBimStore((s) => s.resetView);
  const setCameraPreset = useBimStore((s) => s.setCameraPreset);

  return (
    <Box className="panel tools-panel">
      <Typography variant="subtitle2" className="panel__title">
        Tools
      </Typography>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={tool}
        onChange={(_, v) => v && setTool(v)}
        className="tools-panel__group"
        fullWidth
      >
        <ToggleButton value="orbit" aria-label="Orbit">
          <ThreeDRotationIcon fontSize="small" sx={{ mr: 0.5 }} />
          Orbit
        </ToggleButton>
        <ToggleButton value="select" aria-label="Select">
          <NearMeIcon fontSize="small" sx={{ mr: 0.5 }} />
          Select
        </ToggleButton>
        <ToggleButton value="measure" aria-label="Measure">
          <StraightenIcon fontSize="small" sx={{ mr: 0.5 }} />
          Measure
        </ToggleButton>
        <ToggleButton value="move" aria-label="Move">
          <OpenWithIcon fontSize="small" sx={{ mr: 0.5 }} />
          Move
        </ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1, mb: 1.5 }}>
        {tool === 'measure' && 'Click two points on the model to measure distance.'}
        {tool === 'select' && 'Click an element to inspect properties and actions.'}
        {tool === 'move' && 'Select an element, then drag the gizmo axes.'}
        {tool === 'orbit' && 'Orbit the scene with mouse or touch gestures.'}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" color="text.secondary">
        Camera
      </Typography>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 0.75, mb: 1.5 }}>
        <Button size="small" variant="outlined" onClick={() => setCameraPreset('iso')}>
          ISO
        </Button>
        <Button size="small" variant="outlined" onClick={() => setCameraPreset('top')}>
          Top
        </Button>
        <Button size="small" variant="outlined" onClick={() => setCameraPreset('front')}>
          Front
        </Button>
        <Button size="small" variant="outlined" onClick={() => setCameraPreset('side')}>
          Side
        </Button>
      </Stack>

      <FormControlLabel
        control={<Switch checked={showEdges} onChange={(e) => setShowEdges(e.target.checked)} size="small" />}
        label="Edges"
      />
      <FormControlLabel
        control={<Switch checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} size="small" />}
        label="Wireframe"
      />

      <Box className="tools-panel__section" sx={{ mt: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={sectionEnabled}
              onChange={(e) => setSectionEnabled(e.target.checked)}
              size="small"
            />
          }
          label="Section cut"
        />
        {sectionEnabled && (
          <Stack spacing={1.25} sx={{ mt: 1 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Axis</InputLabel>
              <Select label="Axis" value={sectionAxis} onChange={(e) => setSectionAxis(e.target.value)}>
                <MenuItem value="y">Horizontal (Y)</MenuItem>
                <MenuItem value="x">Vertical X</MenuItem>
                <MenuItem value="z">Vertical Z</MenuItem>
              </Select>
            </FormControl>
            <Slider
              size="small"
              min={0}
              max={1}
              step={0.01}
              value={sectionValue}
              onChange={(_, v) => setSectionValue(v)}
            />
          </Stack>
        )}
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Stack spacing={0.75}>
        <Button
          size="small"
          variant="outlined"
          disabled={!measurements.length}
          onClick={clearMeasurements}
        >
          Clear measures ({measurements.length})
        </Button>
        <Button size="small" variant="contained" startIcon={<RestartAltIcon />} onClick={resetView}>
          Reset view
        </Button>
      </Stack>
    </Box>
  );
}
