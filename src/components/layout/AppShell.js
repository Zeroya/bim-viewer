import {
  Box,
  Drawer,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TopBar from './TopBar';
import BottomToolbar from './BottomToolbar';
import SceneCanvas from '../viewer/SceneCanvas';
import ModelsPanel from '../panels/ModelsPanel';
import LayersPanel from '../panels/LayersPanel';
import ToolsPanel from '../panels/ToolsPanel';
import PropertiesPanel from '../panels/PropertiesPanel';
import { useBimStore } from '../../store/bimStore';

const DRAWER_WIDTH = 300;

function PanelHeader({ title, onClose }) {
  return (
    <Box className="panel-header">
      <Typography variant="subtitle2" className="panel-header__title">
        {title}
      </Typography>
      <Tooltip title="Close panel">
        <IconButton size="small" onClick={onClose} aria-label={`Close ${title}`}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function LeftDesktop({ onClose }) {
  return (
    <Box className="side-panel">
      <PanelHeader title="Models & Layers" onClose={onClose} />
      <Box className="side-scroll">
        <ModelsPanel />
        <LayersPanel />
      </Box>
    </Box>
  );
}

function RightDesktop({ onClose }) {
  return (
    <Box className="side-panel">
      <PanelHeader title="Tools & Properties" onClose={onClose} />
      <Box className="side-scroll">
        <ToolsPanel />
        <PropertiesPanel />
      </Box>
    </Box>
  );
}

function MobileSheet() {
  const panels = useBimStore((s) => s.panels);
  const setMobilePanel = useBimStore((s) => s.setMobilePanel);
  const open = Boolean(panels.mobile);
  const tab = panels.mobile || 'models';

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setMobilePanel(null)}
      onOpen={() => setMobilePanel(tab)}
      disableSwipeToOpen={false}
      PaperProps={{ className: 'mobile-sheet' }}
    >
      <Box className="mobile-sheet__handle" />
      <Box className="mobile-sheet__header">
        <Tabs
          value={tab}
          onChange={(_, v) => setMobilePanel(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="models" label="Models" />
          <Tab value="layers" label="Layers" />
          <Tab value="tools" label="Tools" />
          <Tab value="properties" label="Properties" />
        </Tabs>
        <IconButton onClick={() => setMobilePanel(null)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box className="mobile-sheet__body side-scroll">
        {tab === 'models' && <ModelsPanel />}
        {tab === 'layers' && <LayersPanel />}
        {tab === 'tools' && <ToolsPanel />}
        {tab === 'properties' && <PropertiesPanel />}
      </Box>
    </SwipeableDrawer>
  );
}

export default function AppShell() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const panels = useBimStore((s) => s.panels);
  const togglePanel = useBimStore((s) => s.togglePanel);

  const drawerSx = (open, side) => ({
    width: open ? DRAWER_WIDTH : 0,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [`& .MuiDrawer-paper`]: {
      width: DRAWER_WIDTH,
      position: 'relative',
      height: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      border: 'none',
      borderLeft: side === 'right' ? '1px solid' : 'none',
      borderRight: side === 'left' ? '1px solid' : 'none',
      borderColor: 'divider',
    },
  });

  return (
    <Box className="app-shell">
      <TopBar />
      <Box className="app-shell__body">
        {!isMobile && (
          <Drawer
            variant="persistent"
            open={panels.left}
            className="side-drawer side-drawer--left"
            sx={drawerSx(panels.left, 'left')}
          >
            <LeftDesktop onClose={() => togglePanel('left')} />
          </Drawer>
        )}

        <Box className="app-shell__viewport" component="main">
          {!isMobile && !panels.left && (
            <Tooltip title="Open models panel" placement="right">
              <IconButton
                className="panel-edge-toggle panel-edge-toggle--left"
                size="small"
                onClick={() => togglePanel('left')}
                aria-label="Open left panel"
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <SceneCanvas />
          <BottomToolbar />

          {!isMobile && !panels.right && (
            <Tooltip title="Open tools panel" placement="left">
              <IconButton
                className="panel-edge-toggle panel-edge-toggle--right"
                size="small"
                onClick={() => togglePanel('right')}
                aria-label="Open right panel"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {!isMobile && (
          <Drawer
            variant="persistent"
            anchor="right"
            open={panels.right}
            className="side-drawer side-drawer--right"
            sx={drawerSx(panels.right, 'right')}
          >
            <RightDesktop onClose={() => togglePanel('right')} />
          </Drawer>
        )}
      </Box>

      {isMobile && <MobileSheet />}
    </Box>
  );
}
