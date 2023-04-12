import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import React, { useState } from 'react';
import icon1 from '../../../assets/SidebarIcons/image1.png';
import icon2 from '../../../assets/SidebarIcons/image2.png';
import icon3 from '../../../assets/SidebarIcons/image3.png';
import Icon from '../../atoms/Icon';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '80px',
    height: 'auto',
  },
  flex: {
    width: '1%',
    display: 'flex',
    marginTop: theme.spacing(6),
    paddingRight: theme.spacing(2),
  },
  listItemBorder: {
    width: '100%',
    borderLeft: '3px solid black',
    paddingLeft: '-3px',
  },
  defaultBorder: {
    width: '100%',
    borderLeft: '3px solid white',
  },
  paperSize: {
    width: '80px',
  },
  listItem: {
    padding: '10% 20% 10% 20%',
  },
}));

const SidebarImages = [
  {
    id: 0,
    icon: icon1,
  },
  {
    id: 1,
    icon: icon2,
  },
  {
    id: 2,
    icon: icon3,
  },
];

const Sidebar = () => {
  const classes = useStyles();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.paperSize }}
    >
      <Toolbar />
      <div className={classes.flex} />
      <List>
        {SidebarImages.map((val, key) => (
          <ListItem
            button
            key={key}
            onClick={(event) => handleListItemClick(event, key)}
            className={
              selectedIndex === key
                ? classes.listItemBorder
                : classes.defaultBorder
            }
            classes={{ gutters: classes.listItem }}
          >
            <ListItemIcon>
              <IconButton>
                <Icon imageSrc={val.icon} imageSize="smallMedium" title="" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
