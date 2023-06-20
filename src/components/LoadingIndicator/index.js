import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

const LoadingIndicator = () => (
  <Grid
    container
    sx={{
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.5)',
      zIndex: 999,
    }}
  >
    <Grid
      item
      sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
      }}
    >
      <CircularProgress size={60} />
    </Grid>
  </Grid>
);

export default LoadingIndicator;
