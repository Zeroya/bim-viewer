import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useBimStore } from '../../store/bimStore';
import UploadPanel from './UploadPanel';

const THUMB = {
  villa: 'linear-gradient(135deg, #3a4a5a 0%, #8ab4c8 45%, #e8dcc8 100%)',
  townhouse: 'linear-gradient(135deg, #4a3030 0%, #c45e3a 50%, #d4cfc6 100%)',
  pavilion: 'linear-gradient(135deg, #1a3040 0%, #3aa0d0 40%, #5a8a68 100%)',
  upload: 'linear-gradient(135deg, #2a3340 0%, #5b9fd4 100%)',
};

export default function ModelsPanel() {
  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);
  const toggleActiveModel = useBimStore((s) => s.toggleActiveModel);
  const setActiveModels = useBimStore((s) => s.setActiveModels);
  const mergeActiveModels = useBimStore((s) => s.mergeActiveModels);
  const duplicateActiveModel = useBimStore((s) => s.duplicateActiveModel);
  const removeModel = useBimStore((s) => s.removeModel);

  return (
    <Box className="panel models-panel">
      <Typography variant="subtitle2" className="panel__title">
        Models
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Select one or more models. Merge multiple active models into one scene.
      </Typography>

      <Stack spacing={1} className="models-panel__list">
        {models.map((model) => {
          const active = activeModelIds.includes(model.id);
          return (
            <Card
              key={model.id}
              variant="outlined"
              className={`model-card ${active ? 'is-active' : ''}`}
            >
              <CardActionArea onClick={() => setActiveModels([model.id])}>
                <div
                  className="model-card__thumb"
                  style={{ background: THUMB[model.thumbnail] || THUMB.upload }}
                />
                <CardContent sx={{ py: 1, px: 1.25, '&:last-child': { pb: 1 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={0.5}>
                    <Box minWidth={0}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {model.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" className="model-card__desc">
                        {model.description}
                      </Typography>
                    </Box>
                    <Chip size="small" label={model.type === 'gltf' ? 'GLTF' : 'BIM'} variant="outlined" />
                  </Stack>
                </CardContent>
              </CardActionArea>
              <Stack direction="row" spacing={0.25} className="model-card__actions" px={0.75} pb={0.75}>
                <Tooltip title={active ? 'Hide from scene' : 'Add to scene'}>
                  <IconButton
                    size="small"
                    onClick={() => toggleActiveModel(model.id)}
                    color={active ? 'primary' : 'default'}
                  >
                    {active ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete model">
                  <IconButton
                    size="small"
                    onClick={() => removeModel(model.id)}
                    disabled={models.length <= 1}
                  >
                    <DeleteOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        <Button
          size="small"
          variant="outlined"
          startIcon={<MergeTypeIcon />}
          disabled={activeModelIds.length < 2}
          onClick={mergeActiveModels}
        >
          Merge
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={duplicateActiveModel}
        >
          Duplicate
        </Button>
      </Stack>

      <Divider sx={{ my: 1.5 }} />
      <UploadPanel />
    </Box>
  );
}
