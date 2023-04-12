import React from 'react';
import Sankey from '../../molecules/SankeyChart/index';
import WidgetCard from '../../atoms/WidgetCard';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DeeperInsights from '../DeeperInsights/index';
import { deeperInsight_deeperInsight as DashboardData } from '../../../gql/types';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

import { COLORS } from '../../../plTheme';

import { _t_ } from '../../../utils/translation/translation';

interface ManagerInsightsProps {
  data: DashboardData | null | undefined;
}

const ManagerInsights: React.FC<ManagerInsightsProps> = ({
  data,
}: ManagerInsightsProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    root: {
      paddingLeft: 0,
    },
    outCome: {
      paddingRight: 200,
    },
    Drivers: {
      flexGrow: 1,
    },
    headings: {
      paddintTop: 7,
      fontSize: 16,
    },
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      paddingTop: 30,
      paddingBottom: 20,
    },
    outcomeDiv: {
      padding: '25px 0px',
      height: 641,
    },
    optionsFont: {
      fontFamily: 'Rubik',
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '0em',
    },
    dialog: {
      position: 'absolute',
      top: '7vh',
      left: width > 1500 ? 400 : 150,
      width: 1025,
    },
    buttonFont: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: 14,
      textTransform: 'none',
      height: 40,
      width: 154,
    },
    DeeperInsights: {
      paddingRight: 15,
    },
    sankey: {
      width: '90%',
      height: 560,
    },
  });

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('Select outcome & drivers to view insights')}
      </Typography>
      <WidgetCard>
        <Grid container direction="row" className={classes.outcomeDiv}>
          <Grid item xs={12} className={classes.root}>
            <Grid container direction="column">
              <Grid item style={{ paddingLeft: 16 }}>
                <Grid container direction="row">
                  <Grid item className={classes.outCome}>
                    <Typography variant="h2" className={classes.headings}>
                      {_t_('Outcome')}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.Drivers}>
                    <Typography variant="h2" className={classes.headings}>
                      {_t_('Drivers')}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.DeeperInsights}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleClickOpen}
                      classes={{ containedPrimary: classes.buttonFont }}
                    >
                      {_t_('Deeper insights')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ paddingTop: 25 }}>
                <Grid container direction="row">
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item></Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.sankey}>
                    <Sankey />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WidgetCard>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={open}
        onClose={handleClose}
        fullWidth
        style={{
          height: 900,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          alignContent: 'center',
        }}
        maxWidth="lg"
      >
        <DialogContent style={{ overflow: 'hidden' }}>
          <DeeperInsights onclose={handleClose} data={data} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManagerInsights;
