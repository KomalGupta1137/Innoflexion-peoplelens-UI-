/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { Icon, makeStyles, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { _t_ } from '../../../utils/translation/translation';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import moment from 'moment';
import { QueryResult, useQuery } from '@apollo/client';

import { GetRepDashboardData } from '../../../gql/queries/repDashboard';

import { repDashboardData as RepDashboardData } from '../../../gql/types';
import Loader from '../../atoms/Loader';
import { SendOutlined } from '@material-ui/icons';

export interface RepCustomerMeetingTableProps {
  startDate?: string;
  endDate?: string;
}

const RepCustomerMeetingTable: React.FC<RepCustomerMeetingTableProps> = ({
  startDate,
  endDate,
}: RepCustomerMeetingTableProps) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 150,
      maxWidth: '100%',
    },
    tableRow: {
      height: 30,
      width: 20,
    },
  });
  const classes = useStyles();
  const StyledTableRow = withStyles((theme) => ({}))(TableRow);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortOrder1, setSortOrder1] = useState(true);

  useEffect(() => {}, [sortOrder]);


  const humanize = (str: string) => {
    const frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join('');
  };


  // let rows = data?.RepDashboardData?.pipeline;
  let rows = [{
    Customer: 'Splunk',
    Relationship: 'New',
    Agenda: 'Demo to Decision Maker',
    Deliverable: 'Jack Bush, VP Sales',
    Meeting: 'Yes',
    Date: 'Jul 6 2021',
    Stage: 'Proposal'
  },
  {
    Customer: 'Confluent',
    Relationship: 'New',
    Agenda: 'Mtg. w/ sponsor to address CFO objections',
    Deliverable: 'Jack Smith, VP Sales',
    Meeting: 'Yes',
    Date: 'Jul 7 2021',
    Stage: 'Meetings (Demo)'
  },
  {
    Customer: 'Twilio',
    Relationship: 'Existing',
    Agenda: 'Portfolio value prop workshop w/ sponsors',
    Deliverable: 'Susan Collins, VP Sales Operations',
    Meeting: 'Yes',
    Date: 'Jul 6 2021',
    Stage: 'Meetings (Discovery)'
  },
  {
    Customer: 'Asana',
    Relationship: 'Existing',
    Agenda: 'Discovery workshop w/ sponsor',
    Deliverable: 'Chris Timber, VP Sales',
    Meeting: 'No',
    Date: 'Jul 7 2021',
    Stage: 'Meetings (Discovery)'
  }];

  const [pipelineData, setPipelineData] = useState(rows);
  useEffect(() => {
    setPipelineData(rows);
  }, [rows]);

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  minWidth: '115px',
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  borderSpacing: 0,
                }}
              >
                {_t_('Customer')}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  minWidth: '93px',
                }}
              >
                {_t_('Relationship')}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  minWidth: '259px',
                }}
              >
                {_t_('Agenda')}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  minWidth: '150px',
                }}
              >
                {_t_('Prep/ Deliverable')}
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '106px',

                }}
              >
                {_t_('Meeting set up')}
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '106px'
                }}
              >
                {_t_('Date')}
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '146px'
                }}
              >
                {_t_('Stage')}
              </TableCell>
              <TableCell
                align="left"
                size="small"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '0vw',
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pipelineData &&
              pipelineData.map((row) => (
                <StyledTableRow key={row?.Customer}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Customer ? row?.Customer : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Relationship ? row?.Relationship : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Agenda ? row?.Agenda : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Deliverable ? row?.Deliverable : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Meeting ? row?.Meeting : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {_t_(row?.Date ? humanize(row?.Date) : '')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {row?.Stage ? row?.Stage.toLocaleString() : ''}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                      letterSpacing: '0em',
                    }}
                  >
                    <Icon
                      component={SendOutlined}
                      style={{ color: '#65789B' }}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RepCustomerMeetingTable;
