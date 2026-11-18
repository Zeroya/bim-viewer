import { Paper, ToggleButton, ToggleButtonGroup, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import NearMeIcon from '@mui/icons-material/NearMe';
import StraightenIcon from '@mui/icons-material/Straighten';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useBimStore } from '../../store/bimStore';

const TOOLS = [
  { id: 'orbit', icon: <ThreeDRotationIcon fontSize="small" />, label: 'Orbit' },
  { id: 'select', icon: <NearMeIcon fontSize="small" />, label: 'Select' },
  { id: 'measure', icon: <StraightenIcon fontSize="small" />, label: 'Measure' },
  { id: 'move', icon: <OpenWithIcon fontSize="small" />, label: 'Move' },
];

export default function BottomToolbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const tool = useBimStore((s) => s.tool);
  const setTool = useBimStore((s) => s.setTool);
  const sectionEnabled = useBimStore((s) => s.sectionEnabled);
  const setSectionEnabled = useBimStore((s) => s.setSectionEnabled);

  return (
    <Paper elevation={0} className={`bottom-toolbar ${isMobile ? 'is-mobile' : ''}`}>
      <ToggleButtonGroup exclusive size="small" value={tool} onChange={(_, v) => v && setTool(v)}>
        {TOOLS.map((t) => (
          <ToggleButton key={t.id} value={t.id} aria-label={t.label}>
            <Tooltip title={t.label}>
              <span className="bottom-toolbar__btn">
                {t.icon}
                {isMobile && <span className="bottom-toolbar__label">{t.label}</span>}
              </span>
            </Tooltip>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Tooltip title="Section">
        <ToggleButton
          value="section"
          selected={sectionEnabled}
          onChange={() => setSectionEnabled(!sectionEnabled)}
          size="small"
          className="bottom-toolbar__section"
        >
          <ContentCutIcon fontSize="small" />
          {isMobile && <span className="bottom-toolbar__label">Section</span>}
        </ToggleButton>
      </Tooltip>
    </Paper>
  );
}
