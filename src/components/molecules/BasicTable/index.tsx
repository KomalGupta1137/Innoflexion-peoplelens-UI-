/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { addWeeks, addYears } from 'date-fns';

export interface BasicTableProps {
  startDate?: string;
  endDate?: string;
  activeQuarter: number;
}

const BasicTable: React.FC<BasicTableProps> = ({
  startDate,
  endDate,
  activeQuarter,
}: BasicTableProps) => {
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data1, setData] = useState<any>([]);
  const [error1, setError] = useState();
  const [persona, setPersona] = useState('');

  useEffect(() => {
    const persona = localStorage.getItem('persona');
    setPersona(persona!);
  }, [sortOrder]);

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<RepDashboardData> = useQuery(GetRepDashboardData, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
        thresholdValue: 1,
      },
    },
  });
  // To be removed later
  const getPipelineData = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API_BASE || ''}/api/getPipelineData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      }),
    })
      .then(async (res) => {
        const jsonData = await res.json();
        setData && setData(jsonData);
        setLoading(false);
      })
      .catch((err) => setError(err));
  };

  const humanize = (str: string) => {
    const frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join('');
  };

  useEffect(() => {
    if (activeQuarter != 4) void refetch();
  }, [refetch, startDate, endDate]);

  // To be removed later
  useEffect(() => {
    if (activeQuarter == 4) {
      let stDate = new Date(startDate!);
      stDate = addYears(stDate, 1);
      stDate = addWeeks(stDate, 4);
      startDate = stDate.toISOString();
      let enDate = new Date(endDate!);
      enDate = addYears(enDate, 1);
      enDate = addWeeks(enDate, 4);
      endDate = enDate.toISOString();
      void getPipelineData();
    }
  }, [startDate, endDate]);

  // let rows = data?.RepDashboardData?.pipeline;
  let rows = activeQuarter == 4 ? data1 : data?.RepDashboardData?.pipeline;
  const [pipelineData, setPipelineData] = useState(rows);
  useEffect(() => {
    setPipelineData(rows);
  }, [rows]);

  if (isLoading || loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) return <>`Error! ${error.message}` </>;

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
                  minWidth: '12.36vw',
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
                  minWidth: '0.9vw',
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
                  minWidth: '12.8vw',
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  borderSpacing: 0,
                }}
              >
                <TableSortLabel
                  active={true}
                  direction={sortOrder ? 'desc' : 'asc'}
                  onClick={() => {
                    setSortOrder(!sortOrder);
                    rows =
                      rows &&
                      rows.slice().sort((a: any, b: any) => {
                        return sortOrder
                          ? a?.opportunity - b?.opportunity
                          : b?.opportunity - a?.oppurtunity;
                      });

                    setPipelineData(rows);
                  }}
                  IconComponent={ArrowDropDownIcon}
                  style={{ borderSpacing: 0 }}
                >
                  {_t_('Opportunity')}
                  {' ($)'}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  minWidth: '11.63vw',
                }}
              >
                {persona == 'SDR' ? (
                  <>{_t_('Contact')}</>
                ) : (
                  <> {_t_('Decision Maker')}</>
                )}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  minWidth: '2vw',
                }}
              >
                <TableSortLabel
                  aria-sort={sortOrder1 ? 'ascending' : 'descending'}
                  active={true}
                  direction={sortOrder1 ? 'desc' : 'asc'}
                  onClick={() => {
                    setSortOrder1(!sortOrder1);

                    rows =
                      rows &&
                      rows.slice().sort((a: any, b: any) => {
                        const f = new Date(
                          moment(a?.closedDate).utc().format('YYYY-MM-DD'),
                        );
                        const s = new Date(
                          moment(b?.closedDate).utc().format('YYYY-MM-DD'),
                        );

                        return sortOrder1
                          ? f.getTime() - s.getTime()
                          : s.getTime() - f.getTime();
                      });

                    setPipelineData(rows);
                  }}
                  IconComponent={ArrowDropDownIcon}
                  style={{ minWidth: '8.2vw' }}
                >
                  {_t_('Closing Date')}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                }}
              >
                {_t_('Stage')}
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '10vw',
                }}
              >
                {_t_('My Next Step')}
              </TableCell>
              <TableCell
                align="left"
                size="small"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: '24px',
                  minWidth: '5vw',
                }}
              >
                {_t_('Deal Info')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pipelineData &&
              pipelineData.map((row: any) => (
                <StyledTableRow key={row?.customer}>
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
                    {_t_(row?.customer ? row?.customer : '')}
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
                    {_t_(row?.relationship ? row?.relationship : '')}
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
                    $
                    {_t_(
                      row?.opportunity
                        ? row?.opportunity
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '',
                    )}
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
                    {_t_(row?.decisionMaker ? row?.decisionMaker : '')}
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
                    {_t_(
                      row?.closedDate
                        ? moment(row?.closedDate).utc().format('MMM DD YYYY')
                        : '',
                    )}
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
                    {_t_(row?.status ? humanize(row?.status) : '')}
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
                    {row?.myNextStep ? row?.myNextStep.toLocaleString() : ''}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: '20px',
                      letterSpacing: '0em',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      component={InfoOutlinedIcon}
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

export default BasicTable;
