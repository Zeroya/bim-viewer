import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Slider,
  Stack,
  Button,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useBimStore } from '../../store/bimStore';

export default function LayersPanel() {
  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);
  const toggleLayer = useBimStore((s) => s.toggleLayer);
  const setLayerOpacity = useBimStore((s) => s.setLayerOpacity);
  const setAllLayersVisible = useBimStore((s) => s.setAllLayersVisible);
  const explodeFactor = useBimStore((s) => s.explodeFactor);
  const setExplodeFactor = useBimStore((s) => s.setExplodeFactor);

  const activeModels = models.filter((m) => activeModelIds.includes(m.id));

  return (
    <Box className="panel layers-panel">
      <Typography variant="subtitle2" className="panel__title">
        Layers
      </Typography>

      <Box className="layers-panel__explode" sx={{ mb: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Explode layers
          </Typography>
          <Typography variant="caption">{explodeFactor.toFixed(1)}</Typography>
        </Stack>
        <Slider
          size="small"
          min={0}
          max={3}
          step={0.1}
          value={explodeFactor}
          onChange={(_, v) => setExplodeFactor(v)}
        />
      </Box>

      {activeModels.map((model) => (
        <Box key={model.id} className="layers-panel__model" sx={{ mb: 1.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.25}>
            <Typography variant="caption" fontWeight={700}>
              {model.name}
            </Typography>
            <Stack direction="row" spacing={0.25}>
              <Button size="small" onClick={() => setAllLayersVisible(model.id, true)}>
                All
              </Button>
              <Button size="small" onClick={() => setAllLayersVisible(model.id, false)}>
                None
              </Button>
            </Stack>
          </Stack>

          <List dense disablePadding>
            {model.layers.map((layer) => (
              <ListItem
                key={layer.id}
                className="layer-item"
                secondaryAction={
                  <Tooltip title={layer.visible ? 'Hide' : 'Show'}>
                    <IconButton edge="end" size="small" onClick={() => toggleLayer(model.id, layer.id)}>
                      {layer.visible ? (
                        <VisibilityIcon fontSize="inherit" />
                      ) : (
                        <VisibilityOffIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemIcon sx={{ minWidth: 22 }}>
                  <span className="layer-swatch" style={{ background: layer.color }} />
                </ListItemIcon>
                <ListItemText
                  primary={layer.name}
                  primaryTypographyProps={{ variant: 'caption', fontWeight: 600 }}
                  secondary={
                    <Slider
                      size="small"
                      min={0.1}
                      max={1}
                      step={0.05}
                      value={layer.opacity}
                      onChange={(_, v) => setLayerOpacity(model.id, layer.id, v)}
                      sx={{ mt: 0.25, maxWidth: 110 }}
                    />
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
