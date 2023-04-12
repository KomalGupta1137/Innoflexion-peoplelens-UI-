import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import LogoWithText from '../../../assets/logoWithText.png';
import AltLogo from '../../../assets/HeaderIcons/PeopleLens_Logo.svg';

import { COLORS } from '../../../plTheme';

import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import { dates } from '../ManagerDashboard';
import { format, utcToZonedTime } from 'date-fns-tz';

const useStyles = makeStyles(() => ({
  footer: {
    padding: '5mm 0mm',
    alignItems: 'center',
  },
  footerImage: {
    height: 33,
    width: 116,
  },
  altFooterImage: {
    height: 45,
    width: 116,
  },
  mainTitle: {
    color: COLORS.TEXT_LOW_EMPHASIS,
    textAlign: 'center',
  },
}));

export interface FooterProps {
  useAltLogo?: boolean;
  activeQuarter: number;
}

const Footer: React.FC<FooterProps> = ({
  useAltLogo,
  activeQuarter,
}: FooterProps) => {
  const datesTemp = [
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-03-31T23:59:59.999Z',
    },
    {
      startDate: '2021-04-01T00:00:00.000Z',
      endDate: '2021-06-30T23:59:59.999Z',
    },
    {
      startDate: '2021-07-01T00:00:00.000Z',
      endDate: '2021-09-30T23:59:59.999Z',
    },
    {
      startDate: '2021-10-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-06-30T23:59:59.999Z',
    },
    {
      startDate: '2021-07-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
  ];
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const year = new Date().getFullYear();
  const prevMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const prevMonth2 = new Date(new Date().setMonth(new Date().getMonth() - 2));

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        spacing={1}
        className={`${classes.footer}`}
      >
        <Grid item>
          <Typography
            className={`${globalClasses.body1WidgetTitle} ${classes.mainTitle}`}
          >
            {activeQuarter == 0 ? (
              new Date().getDate() >= 15 ? (
                <>
                  {prevMonth
                    .toLocaleString('default', { month: 'short' })
                    .toUpperCase()}{' '}
                </>
              ) : (
                <>
                  {prevMonth2
                    .toLocaleString('default', { month: 'short' })
                    .toUpperCase()}{' '}
                </>
              )
            ) : (
              <>
                {format(
                  utcToZonedTime(
                    new Date(datesTemp[activeQuarter].startDate),
                    'UTC',
                  ),
                  'MMM',
                ).toUpperCase()}{' '}
                -{' '}
                {format(
                  utcToZonedTime(
                    new Date(datesTemp[activeQuarter].endDate),
                    'UTC',
                  ),
                  'MMM',
                ).toUpperCase()}{' '}
              </>
            )}
            {format(
              utcToZonedTime(new Date(datesTemp[activeQuarter].endDate), 'UTC'),
              'yyyy',
            )}{' '}
            {activeQuarter == 0 ? (
              <></>
            ) : activeQuarter == 5 ? (
              <>(H1)</>
            ) : activeQuarter == 6 ? (
              <>(H2)</>
            ) : (
              <>
                (Q
                {activeQuarter})
              </>
            )}
          </Typography>
        </Grid>
        <Grid item>
          <img
            src={useAltLogo ? AltLogo : LogoWithText}
            alt="People Lens"
            className={
              useAltLogo
                ? `${classes.altFooterImage}`
                : `${classes.footerImage}`
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={`${globalClasses.roboto400px9px16px} ${classes.mainTitle}`}
          >
            {_t_(`@${year} PeopleLens inc. Confidential and proprietary.`)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
