/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import BattleCards from '../../molecules/BattleCards';
import WidgetCard from '../../atoms/WidgetCard';
import {
  battleCard_battleCard_battleCardData as InputBattleCardData,
  battleCard_battleCard_battleCardActions as InputBattleCardActions,
} from '../../../gql/types';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Nudge from '../Nudge/index';

interface KeyInputDriverBattleCardsProps {
  battleCardData?: (InputBattleCardData | null)[] | null | undefined;
  battleCardActions?: (InputBattleCardActions | null)[] | null | undefined;
  name?: string | null | undefined;
  userId: string;
  image?: any;
  heading?: string;
  trainingName?: string | null | undefined;
  battleCardType?: string | null | undefined;
}

const KeyInputDriverBattleCards: React.FC<KeyInputDriverBattleCardsProps> = ({
  battleCardData,
  battleCardActions,
  name,
  userId,
  image,
  heading,
  trainingName,
  battleCardType,
}: KeyInputDriverBattleCardsProps) => {
  const [width] = useWindowSize();

  const returnWidth = () => {
    if (width < 1500) {
      return '510px';
    } else if (width > 1500) {
      return '600px';
    }
  };
  const action = battleCardActions && battleCardActions[0]?.actionName;
  const header = battleCardActions && battleCardActions[0]?.header;
  const courseName = battleCardActions && battleCardActions[0]?.course;
  const recId = battleCardActions && battleCardActions[0]?.rec_id;
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  date.setFullYear(2021);

  const useStyles = makeStyles({
    root: {
      height: '628px',
      width: returnWidth,
    },
    topHeading: {
      paddingTop: '37px',
      lineHeight: '20px',
      paddingLeft: '40px',
    },
    dialog: {
      position: 'absolute',
      width: 700,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    dividerDiv: {},
    divider: {
      backgroundColor: COLORS.BATTLECARD_DIVIDER_COLOR,
      borderRadius: '4px',
    },
    nameDiv: {
      paddingTop: '33.39px',
      paddingRight: '20px',
      paddingLeft: '18px',
      lineHeight: '20px',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    secondHeading: {
      paddingTop: '20.39px',
      paddingLeft: '36px',
    },
    avatar: {
      width: 45,
      height: 45,
    },
    thirdHeading: {
      lineHeight: '20px',
    },
    footer: {
      paddingBottom: '25.94px',
      paddingLeft: width < 1500 ? '35.92px' : '80px',
    },
    firstFooterElement: {},
    footerDiv: {
      // overflowY:
      //   // battleCardData && battleCardData?.length > 3 ? 'scroll' : 'hidden',
      // '&::-webkit-scrollbar': {
      //   width: 10,
      //   borderRadius: 10,
      //   marginRight: '10px',
      // },
      // '&::-webkit-scrollbar-track': {
      //   borderRadius: '10px',
      //   marginTop: '10px',
      // },
      // '&::-webkit-scrollbar-thumb': {
      //   maxHeight: 30,
      //   backgroundColor: COLORS.GREY_4,
      //   borderRadius: '10px',
      // },
    },
    buttonStyles: {
      width: '140px',
      height: '40px',
      fontStyle: plTheme.typography.subtitle2.fontStyle,
      fontWeight: plTheme.typography.subtitle2.fontWeight,
      fontSize: plTheme.typography.subtitle2.fontSize,
      lineHeight: '20px',
      textTransform: 'none',
    },
    rightHeading: {
      marginRight:
        battleCardActions && battleCardActions?.length > 0 ? '30px' : '18px',
    },
    rightAction: {
      fontSize: '16px',
      paddingBottom: '10px',
      color: COLORS.GENERAL_DARK_BLUE_32,
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
      <WidgetCard>
        <Grid
          container
          direction="column"
          justify="space-between"
          className={classes.root}
        >
          <Grid item>
            <Typography
              variant="h2"
              className={classes.topHeading}
              color="textSecondary"
            >
              {heading}
            </Typography>
          </Grid>
          <Grid item className={classes.dividerDiv}>
            <Divider className={classes.divider}></Divider>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-end"
            >
              <Grid item>
                <Grid container direction="row" justify="space-between">
                  <Grid item className={classes.secondHeading}>
                    <Avatar
                      src={image}
                      className={classes.avatar}
                      alt={'avatar'}
                      children={name && name.charAt(0)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" className={classes.nameDiv}>
                      {name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.rightHeading}>
                {battleCardActions && battleCardActions?.length > 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonStyles}
                    onClick={handleClickOpen}
                  >
                    {battleCardActions && battleCardActions?.length + ' Action'}
                  </Button>
                ) : (
                  <Typography
                    variant="subtitle2"
                    className={classes.rightAction}
                    color="textSecondary"
                  >
                    No Action Required
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.dividerDiv}>
            <Divider className={classes.divider}></Divider>
          </Grid>

          <Grid item className={classes.footerDiv}>
            <Grid container direction="column" justify="space-between">
              {battleCardData?.map((item: any | null, index: number) => (
                <Grid key={index} item>
                  <Grid>
                    <Typography
                      variant="subtitle2"
                      className={classes.thirdHeading}
                      align="center"
                      color="textSecondary"
                    >
                      {item?.title}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.dividerDiv}>
                    <Divider className={classes.divider}></Divider>
                  </Grid>
                  <Grid item className={classes.footerDiv}>
                    <Grid container direction="column" justify="space-between">
                      <Grid
                        className={
                          index === 0
                            ? `${classes.footer} ${classes.firstFooterElement}`
                            : classes.footer
                        }
                      >
                        <BattleCards data={item} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
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
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          alignContent: 'center',
        }}
        maxWidth="lg"
      >
        <DialogContent style={{ paddingTop: 0, overflow: 'hidden' }}>
          <Nudge
            onclose={handleClose}
            data={{
              title: 'Actions Required!',
              header: header,
              message: action,
              recId: recId,
              course: {
                name: courseName,
                compleDate: date,
              },
              name: name,
              userId: userId,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KeyInputDriverBattleCards;
