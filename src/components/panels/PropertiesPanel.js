import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { useBimStore } from '../../store/bimStore';

function Row({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" className="prop-row">
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function PropertiesPanel() {
  const selectedElementId = useBimStore((s) => s.selectedElementId);
  const findElement = useBimStore((s) => s.findElement);
  const hideElement = useBimStore((s) => s.hideElement);
  const deleteElement = useBimStore((s) => s.deleteElement);
  const setTool = useBimStore((s) => s.setTool);
  const measurements = useBimStore((s) => s.measurements);
  const removeMeasurement = useBimStore((s) => s.removeMeasurement);
  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);

  const found = selectedElementId ? findElement(selectedElementId) : null;
  const active = models.filter((m) => activeModelIds.includes(m.id));

  return (
    <Box className="panel properties-panel">
      <Typography variant="subtitle2" className="panel__title">
        Properties
      </Typography>

      {!found && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
          Select an element with the Select tool to inspect parameters and actions.
        </Typography>
      )}

      {found && (
        <Box className="properties-panel__card">
          <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
            <span
              className="layer-swatch"
              style={{ background: found.element.color || found.layer.color }}
            />
            <Typography variant="body2" fontWeight={600}>
              {found.element.name}
            </Typography>
          </Stack>
          <Chip size="small" label={found.layer.name} sx={{ mb: 1 }} />
          <Row label="Model" value={found.model.name} />
          <Row label="Type" value={found.element.kind} />
          <Row label="Position" value={found.element.position.map((n) => n.toFixed(2)).join(', ')} />
          <Row label="Size" value={found.element.size.map((n) => n.toFixed(2)).join(', ')} />

          <Stack direction="row" spacing={0.75} sx={{ mt: 1.5 }} flexWrap="wrap" useFlexGap>
            <Button size="small" variant="outlined" startIcon={<OpenWithIcon />} onClick={() => setTool('move')}>
              Move
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<VisibilityOffIcon />}
              onClick={() => hideElement(found.element.id)}
            >
              Hide
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => deleteElement(found.element.id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="caption" color="text.secondary">
        Active models
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.75, mb: 1.5 }}>
        {active.map((m) => (
          <Chip key={m.id} size="small" label={m.name} variant="outlined" />
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
        Measurements
      </Typography>
      {!measurements.length && (
        <Typography variant="caption" color="text.secondary">
          No measurements yet. Enable the Measure tool.
        </Typography>
      )}
      <List dense disablePadding>
        {measurements.map((m, i) => (
          <ListItem
            key={m.id}
            disableGutters
            secondaryAction={
              <Button size="small" onClick={() => removeMeasurement(m.id)}>
                ×
              </Button>
            }
          >
            <ListItemText
              primary={`#${i + 1} — ${m.distance.toFixed(2)} m`}
              secondary={`${m.points[0].map((n) => n.toFixed(1)).join(', ')} → ${m.points[1]
                .map((n) => n.toFixed(1))
                .join(', ')}`}
              primaryTypographyProps={{ variant: 'caption', fontWeight: 600 }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
