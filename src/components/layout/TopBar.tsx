import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LayersIcon from '@mui/icons-material/Layers';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BuildIcon from '@mui/icons-material/Build';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import NearMeIcon from '@mui/icons-material/NearMe';
import StraightenIcon from '@mui/icons-material/Straighten';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import GestureIcon from '@mui/icons-material/Gesture';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useBimStore } from '../../store/bimStore';

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'));

  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);
  const themeMode = useBimStore((s) => s.themeMode);
  const showGrid = useBimStore((s) => s.showGrid);
  const showEdges = useBimStore((s) => s.showEdges);
  const wireframe = useBimStore((s) => s.wireframe);
  const sectionEnabled = useBimStore((s) => s.sectionEnabled);
  const isolateMode = useBimStore((s) => s.isolateMode);
  const tool = useBimStore((s) => s.tool);
  const panels = useBimStore((s) => s.panels);
  const selectedElementId = useBimStore((s) => s.selectedElementId);

  const setTool = useBimStore((s) => s.setTool);
  const togglePanel = useBimStore((s) => s.togglePanel);
  const setMobilePanel = useBimStore((s) => s.setMobilePanel);
  const setThemeMode = useBimStore((s) => s.setThemeMode);
  const setShowGrid = useBimStore((s) => s.setShowGrid);
  const setShowEdges = useBimStore((s) => s.setShowEdges);
  const setWireframe = useBimStore((s) => s.setWireframe);
  const setSectionEnabled = useBimStore((s) => s.setSectionEnabled);
  const setCameraPreset = useBimStore((s) => s.setCameraPreset);
  const requestFitView = useBimStore((s) => s.requestFitView);
  const requestScreenshot = useBimStore((s) => s.requestScreenshot);
  const isolateSelection = useBimStore((s) => s.isolateSelection);
  const showAllElements = useBimStore((s) => s.showAllElements);
  const resetView = useBimStore((s) => s.resetView);
  const mergeActiveModels = useBimStore((s) => s.mergeActiveModels);
  const duplicateActiveModel = useBimStore((s) => s.duplicateActiveModel);

  const activeNames = models
    .filter((m) => activeModelIds.includes(m.id))
    .map((m) => m.name)
    .join(', ');

  return (
    <AppBar position="static" elevation={0} className="top-bar" color="transparent">
      <Toolbar className="top-bar__toolbar" variant="dense">
        <Stack direction="row" spacing={1} className="top-bar__brand" sx={{ alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              size="small"
              edge="start"
              onClick={() => setMobilePanel(panels.mobile ? null : 'models')}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}
          <div className="brand-mark" aria-hidden />
          <div>
            <Typography variant="subtitle1" className="brand-title">
              BIM Viewer
            </Typography>
            {!isCompact && (
              <Typography variant="caption" color="text.secondary" className="brand-sub">
                Building Information Modeling
              </Typography>
            )}
          </div>
        </Stack>

        {!isMobile && (
          <Stack direction="row" spacing={0.75} className="top-bar__commands" sx={{ alignItems: 'center' }}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={tool}
              onChange={(_, v) => v && setTool(v as 'orbit' | 'select' | 'measure' | 'move')}
              className="top-bar__tool-group"
            >
              <ToggleButton value="orbit" aria-label="Orbit">
                <Tooltip title="Orbit">
                  <ThreeDRotationIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="select" aria-label="Select">
                <Tooltip title="Select">
                  <NearMeIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="measure" aria-label="Measure">
                <Tooltip title="Measure">
                  <StraightenIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="move" aria-label="Move">
                <Tooltip title="Move">
                  <OpenWithIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            <Divider orientation="vertical" flexItem className="top-bar__divider" />

            <Tooltip title="Section cut">
              <IconButton
                size="small"
                color={sectionEnabled ? 'primary' : 'default'}
                onClick={() => setSectionEnabled(!sectionEnabled)}
              >
                <ContentCutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edges">
              <IconButton
                size="small"
                color={showEdges ? 'primary' : 'default'}
                onClick={() => setShowEdges(!showEdges)}
              >
                <BorderStyleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Wireframe">
              <IconButton
                size="small"
                color={wireframe ? 'primary' : 'default'}
                onClick={() => setWireframe(!wireframe)}
              >
                <GestureIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isolateMode ? 'Show all' : 'Isolate selection'}>
              <span>
                <IconButton
                  size="small"
                  color={isolateMode ? 'primary' : 'default'}
                  disabled={!selectedElementId && !isolateMode}
                  onClick={() => (isolateMode ? showAllElements() : isolateSelection())}
                >
                  {isolateMode ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <FilterCenterFocusIcon fontSize="small" />
                  )}
                </IconButton>
              </span>
            </Tooltip>

            <Divider orientation="vertical" flexItem className="top-bar__divider" />

            <Tooltip title="Fit / ISO">
              <IconButton size="small" onClick={requestFitView}>
                <CenterFocusStrongIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {!isCompact && (
              <>
                <Chip size="small" label="Top" variant="outlined" onClick={() => setCameraPreset('top')} className="top-bar__cam-chip" />
                <Chip size="small" label="Front" variant="outlined" onClick={() => setCameraPreset('front')} className="top-bar__cam-chip" />
                <Chip size="small" label="Side" variant="outlined" onClick={() => setCameraPreset('side')} className="top-bar__cam-chip" />
              </>
            )}

            <Divider orientation="vertical" flexItem className="top-bar__divider" />

            <Tooltip title="Merge active models">
              <span>
                <IconButton
                  size="small"
                  disabled={activeModelIds.length < 2}
                  onClick={mergeActiveModels}
                >
                  <MergeTypeIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Duplicate active model">
              <IconButton size="small" onClick={duplicateActiveModel}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Screenshot">
              <IconButton size="small" onClick={requestScreenshot}>
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset view">
              <IconButton size="small" onClick={resetView}>
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {!isMobile && !isCompact && (
          <Chip
            size="small"
            label={activeNames || 'No model'}
            className="top-bar__model-chip"
            variant="outlined"
          />
        )}

        <Stack direction="row" spacing={0.25} className="top-bar__actions">
          {!isMobile && (
            <>
              <Tooltip title={panels.left ? 'Close left panel' : 'Open left panel'}>
                <IconButton size="small" onClick={() => togglePanel('left')} color={panels.left ? 'primary' : 'default'}>
                  <AccountTreeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={panels.right ? 'Close right panel' : 'Open right panel'}>
                <IconButton size="small" onClick={() => togglePanel('right')} color={panels.right ? 'primary' : 'default'}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          {isMobile && (
            <>
              <IconButton
                size="small"
                onClick={() => setMobilePanel('layers')}
                color={panels.mobile === 'layers' ? 'primary' : 'default'}
              >
                <LayersIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setMobilePanel('tools')}
                color={panels.mobile === 'tools' ? 'primary' : 'default'}
              >
                <BuildIcon fontSize="small" />
              </IconButton>
            </>
          )}
          <Tooltip title={showGrid ? 'Hide grid' : 'Show grid'}>
            <IconButton size="small" onClick={() => setShowGrid(!showGrid)}>
              {showGrid ? <GridOnIcon fontSize="small" /> : <GridOffIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Theme">
            <IconButton
              size="small"
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            >
              {themeMode === 'dark' ? (
                <LightModeOutlinedIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
