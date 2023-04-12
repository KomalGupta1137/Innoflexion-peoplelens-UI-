import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import OKRStat from '../../molecules/OKRStat';
import SummaryStat from '../../molecules/SummaryStat';
import { RepDashboardData_RepDashboardData_okrSummary as summaryData } from '../../../gql/types';
interface PerformanceSummaryProps {
  okrPerformance: summaryData | null | undefined;
}

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  okrPerformance,
}: PerformanceSummaryProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: 560,
    },
    mainDiv: {
      //  marginTop: '1.6rem',
      borderBottom: '0.125rem solid ' + COLORS.BORDER_PRIMARY,
      paddingBottom: '0.2rem',
    },
    rating: {
      fontWeight: 500,
      color: COLORS.PL_PRIMARY,
      margin: '0.4rem 0',
    },
    value: {
      backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      lineHeight: '28px',
      padding: '0 16px',
      width: 92,
    },
    insideDiv: {
      marginTop: '1.2rem',
      background: '#D9D9D9',
      opacity: 0.6,
      padding: 13
    },
    stats: {
      marginTop: '0.4rem',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <WidgetCard>
        <Grid className={classes.root}>
          <Typography
            className={globalClasses.body1WidgetTitle}
            style={{ paddingBottom: 2.5 }}
          >
            {_t_('Summary - Performance Review')}
          </Typography>
          <Typography
            color="textPrimary"
            className={`${globalClasses.body1Light} ${classes.rating}`}
          >
            Rating: Exceeds Expectation ({okrPerformance?.rating})
          </Typography>
          {okrPerformance?.competency &&
            okrPerformance?.competency.map((element, id) => (
              <>
                {id === 0 ? (
                  <div style={{ padding: 13 }}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                      className={classes.mainDiv}
                      key={element?.name}
                    >
                      <Grid item style={{ flex: 50 }} key={'Competency1'}>
                        <Typography
                          className={globalClasses.h5Bold}
                          color="textPrimary"
                        >
                          {element?.name}
                        </Typography>
                      </Grid>
                      <Grid item style={{ flex: 25 }} key={'ManagerScore'}>
                        <Typography
                          className={globalClasses.h5Bold}
                          color="textPrimary"
                        >
                          Manager Score
                        </Typography>
                      </Grid>
                      <Grid item style={{ flex: 25 }} key={'selfScore'}>
                        <Typography
                          className={globalClasses.h5Bold}
                          color="textPrimary"
                        >
                          Self Score
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      spacing={2}
                      className={classes.stats}
                    >
                      {element &&
                        element.values &&
                        element.values?.map((innerElement, index) => (
                          <Grid item key={innerElement?.title}>
                            <SummaryStat
                              title={
                                String(index + 1) +
                                '. ' +
                                String(innerElement?.title)
                              }
                              managerScore={innerElement?.managerScore}
                              selfScore={innerElement?.selfScore}
                            demoMode={false}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                ) : (
                  <div className={classes.insideDiv}>
                    <Typography
                      color="textPrimary"
                      className={globalClasses.h5Bold}
                    >
                      {element?.name}
                    </Typography>
                    <Grid
                      container
                      direction="column"
                      spacing={2}
                      className={classes.stats}
                      key={'developmentneedss'}
                    >
                      {element?.values?.map((innerElement, index) => (
                        <Grid item key={'dvelopmentneeds' + String(index)}>
                          <SummaryStat
                            title={
                              String(index + 1) +
                              '. ' +
                              String(innerElement?.title)
                            }
                            managerScore={innerElement?.managerScore}
                            selfScore={innerElement?.selfScore}
                            demoMode={true}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
              </>
            ))}
        </Grid>
      </WidgetCard>
    </>
  );
};

export default PerformanceSummary;
