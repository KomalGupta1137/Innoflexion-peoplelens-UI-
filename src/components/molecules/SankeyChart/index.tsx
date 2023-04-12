/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartSankey from 'highcharts/modules/sankey';
import { COLORS, plTheme } from '../../../plTheme';
highchartSankey(Highcharts);

const Sankey: React.FC<any> = () => {
  const options = {
    title: {
      text: '',
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          '{index}. {point.from} to {point.to}, {point.weight}.',
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      spacingRight: 120,
      width: 1180,
      height: 500,
    },
    tooltip: {
      enabled: false,
    },
    dataLabelsOverflowValue: 'allow',
    plotOptions: {
      crop: false,
      series: {
        nodeWidth: 90,
        crop: false,
      },
      column: {
        padding: 90,
      },
      sankey: {
        crop: false,
        minLinkHeight: 100,
        nodeWidth: 8,
        nodeHeight: 250,
        lineHeight: 100,
        opacity: 1,
        linkOpacity: 1,
        states: {
          inactive: {
            enabled: false,
          },
          hover: {
            enabled: false,
          },
        },
        dataLabels: {
          overflow: 'visible',
          crop: false,
          align: 'left',
          allowOverlap: true,
          // useHTML: true,
          x: 10,
          y: 2,
          paddingTop: 50,

          nodeFormatter: function (point: any) {
            point = this;

            let Cortext = String(point.key).toLowerCase();
            Cortext = Cortext.charAt(0).toUpperCase() + Cortext.slice(1);
            if (Cortext === 'Okr') {
              Cortext = 'OKR';
            }
            if (Cortext === 'M&a') {
              Cortext = 'M&A';
            }
            if (
              Cortext.includes(':') &&
              (Cortext.includes('Product') || Cortext.includes('product'))
            ) {
              const array = Cortext.split(':');
              const first = array[0].toLowerCase();
              const second = array[1].toLowerCase();
              Cortext =
                first.charAt(0).toUpperCase() +
                first.slice(1) +
                ':' +
                ' ' +
                second.charAt(1).toUpperCase() +
                second.slice(2);
            }

            return (
              '<span style="width: 125px;font-size: 12px; font-family: Rubik; font-weight: 400;letter-spacing: 0.01em;color: #171F46" >' +
              Cortext +
              '</span>'
            );
          },

          color: 'black',
          // textTransform: 'uppercase',
          style: {
            marginLeft: '50px',
            fontFamily: 'Rubik',
            fontSize: '10px',
            fontWeight: 400,
            textOutline: 'none',

            color: '#171F46',
            width: 200,
          },
        },
      },
    },

    series: [
      {
        dragDrop: {
          draggableY: true,
        },
        point: {
          events: {
            click: function (point: any) {
              point = this;
              if (
                point.id == 'Deal size' ||
                point.id == 'Win rate' ||
                point.id == 'Sales cycle'
              )
                return;
              if (!point.linksHidden && point.linksFrom) {
                point.linksHidden = true;

                point.linksFrom.forEach(function (link: any) {
                  link.graphic.hide();
                });
              } else {
                point.linksHidden = false;

                if (point.linksFrom !== undefined) {
                  point.linksFrom.forEach(function (link: any) {
                    link.graphic.show();
                  });
                }
              }
            },
          },
        },
        nodePadding: 25,
        minLinkWidth: 5,
        keys: ['from', 'to', 'weight'],
        colors: ['#D9D9D9'],
        data: [
          {
            from: 'Deal size',
            to: 'Organization',
            weight: 500,
            visible: false,
          },
          {
            from: 'Deal size',
            to: 'People',
            weight: 80,
            visible: false,
          },
          {
            from: 'Deal size',
            to: 'Customer',
            weight: 90,
            visible: false,
          },
          {
            from: 'Win rate',
            to: 'Organization',
            weight: 20,
            visible: false,
          },
          {
            from: 'Win rate',
            to: 'People',
            weight: 800,
            visible: false,
          },
          {
            from: 'Win rate',
            to: 'Customer',
            weight: 80,
            visible: false,
          },
          // {
          //   from: 'Quota attainment',
          //   to: 'Organization',
          //   weight: 20,
          //   visible: false,
          // },
          {
            from: 'Quota attainment',
            to: 'People',
            weight: 180,
            visible: false,
          },
          {
            from: 'Quota attainment',
            to: 'Customer',
            weight: 130,
            visible: false,
          },
          {
            from: 'Sales cycle',
            to: 'Customer',
            weight: 130,
            visible: false,
          },
          {
            from: 'Sales cycle',
            to: 'People',
            weight: 130,
            visible: false,
          },
          {
            from: 'Sales cycle',
            to: 'Organization',
            weight: 120,
            visible: false,
          },
          { from: 'People', to: 'orgnetworks', weight: 40, visible: false },
          { from: 'People', to: 'OKR', weight: 30, visible: false },
          { from: 'People', to: 'competencies', weight: 10, visible: false },
          { from: 'People', to: 'Recruiting', weight: 10, visible: false },
          { from: 'People', to: 'Ramp time', weight: 10, visible: false },
          {
            from: 'People',
            to: 'learning & enablment',
            weight: 25,
            visible: false,
          },
          {
            from: 'People',
            to: 'Rewards',
            weight: 25,
            visible: false,
          },
          { from: 'People', to: 'performance', weight: 15, visible: false },
          { from: 'People', to: 'time allocation', weight: 25, visible: false },

          { from: 'People', to: 'diversity', weight: 5, visible: false },
          { from: 'People', to: 'Attrition', weight: 15, visible: false },
          {
            from: 'People',
            to: 'Activity Score',
            weight: 20,
            visible: false,
          },
          {
            from: 'Customer',
            to: 'Activity Score',
            weight: 20,
            visible: false,
          },

          {
            from: 'Customer',
            to: 'BuyerReadlines',
            weight: 20,
            visible: false,
          },
          { from: 'Customer', to: 'Coverage', weight: 20, visible: false },
          {
            from: 'Customer',
            to: 'Pipeline quality',
            weight: 20,
            visible: false,
          },
          {
            from: 'Customer',
            to: 'portfolio Presented',
            weight: 40,
            visible: false,
          },
          /** */
          { from: 'OKR', to: 'new products', weight: 25, visible: false },
          { from: 'OKR', to: 'M&A', weight: 18, visible: false },
          { from: 'OKR', to: 'GEO Expansion', weight: 18, visible: false },
          {
            from: 'OKR',
            to: 'Organic sales Growth skills ',
            weight: 25,
            visible: false,
          },

          {
            from: 'learning & enablment',
            to: 'strategy',
            weight: 15,
            visible: false,
          },
          {
            from: 'learning & enablment',
            to: 'communication skills',
            weight: 40,
            visible: false,
          },

          {
            from: 'learning & enablment',
            to: 'product Knowledge',
            weight: 40,
            visible: false,
          },

          {
            from: 'learning & enablment',
            to: 'technical skills',
            weight: 15,
            visible: false,
          },
          {
            from: 'learning & enablment',
            to: 'solution skills',
            weight: 15,
            visible: false,
          },

          {
            from: 'time allocation',
            to: 'With product teams',
            weight: 15,
            visible: false,
          },
          {
            from: 'time allocation',
            to: 'With customers',
            weight: 15,
            visible: false,
          },
          {
            from: 'time allocation',
            to: 'With Systems or admin',
            weight: 15,
            visible: false,
          },
          {
            from: 'time allocation',
            to: 'Prospect calls',
            weight: 15,
            visible: false,
          },

          {
            from: 'time allocation',
            to: 'Emails or meetings',
            weight: 15,
            visible: false,
          },
          {
            from: 'time allocation',
            to: 'Demos',
            weight: 15,
            visible: false,
          },

          {
            from: 'time allocation',
            to: 'Followup Ratio',
            weight: 15,
            visible: false,
          },

          {
            from: 'product Knowledge',
            to: 'Strata',
            weight: 40,
            visible: false,
          },
          {
            from: 'product Knowledge',
            to: 'Prisma',
            weight: 40,
            visible: false,
          },
          {
            from: 'product Knowledge',
            to: 'Cortex',
            weight: 40,
            visible: false,
          },
          {
            from: 'portfolio Presented',
            to: 'Cortex',
            weight: 40,
            visible: false,
          },
          {
            from: 'With product teams',
            to: 'Cortex',
            weight: 40,
            visible: false,
          },
        ],

        nodes: [
          {
            id: 'Quota attainment',
            name: 'Quota attainment',
            color: 'rgb(159,183,245)',
          },

          {
            id: 'People',
            name: 'People',
            color: '#47C257',
          },
          {
            id: 'Organization',
            name: 'Organization',
            color: '#D9D9D9',
          },
          {
            id: 'Customer',
            name: 'Customer',
            color: '#21B8C7',
          },
          {
            id: 'Customer',
            name: 'Customer',
            color: '#FDDE69',
          },
          {
            id: 'orgnetworks',
            name: 'Org networks',

            color: '#D9D9D9',
          },
          {
            id: 'OKR',
            name: 'OKR',
            color: '#FCB017',
          },
          {
            id: 'Recruiting',
            name: 'Recruiting',
            color: '#D9D9D9',
          },
          {
            id: 'competencies',
            name: 'Competencies',
            color: '#D9D9D9',
          },
          {
            id: 'Ramp time',
            name: 'Ramp time',
            color: '#D9D9D9',
          },
          {
            id: 'learning & enablment',
            name: 'Learning & enablement',
            color: '#73AEBB',
          },
          {
            id: 'Rewards',
            name: 'Rewards',
            color: '#D9D9D9',
          },
          {
            id: 'Rewards',
            name: 'Rewards',
            color: '#D9D9D9',
          },
          {
            id: 'Rewards',
            name: 'Rewards',
            color: '#3E3BC7',
          },
          {
            id: 'performance',
            name: 'Performance',
            color: '#D9D9D9',
          },
          {
            id: 'diversity',
            name: 'Diversity',
            color: '#D9D9D9',
          },
          {
            id: 'Attrition',
            name: 'Attrition',
            color: '#D9D9D9',
          },
          {
            id: 'Activity Score',
            name: 'Activity Score',
            color: '#D9D9D9',
          },
          {
            id: 'BuyerReadlines',
            name: 'Buyer readiness',
            color: '#D9D9D9',
          },
          {
            id: 'Coverage',
            name: 'Coverage',
            color: '#D9D9D9',
          },
          {
            id: 'Pipeline quality',
            name: 'Pipeline quality',
            color: '#D9D9D9',
          },
          {
            id: 'portfolio Presented',
            name: 'Portfolio presented',
            color: '#9C70E2',
          },
          {
            id: 'M&A',
            name: 'M&A',
            color: '#D9D9D9',
          },
          {
            id: 'new products',
            name: 'New products',
            color: '#D9D9D9',
          },
          {
            id: 'GEO Expansion',
            name: 'GEO expansion',
            color: '#D9D9D9',
          },
          {
            id: 'Organic sales Growth skills ',
            name: 'Organic sales growth ',
            color: '#D9D9D9',
          },
          {
            id: 'strategy',
            name: 'Strategy',
            color: '#D9D9D9',
          },
          {
            id: 'communication skills',
            name: 'Communication skills',
            color: '#D9D9D9',
          },
          {
            id: 'product Knowledge',
            name: 'Product knowledge',
            color: '#DF7D09',
          },
          {
            id: 'technical skills',
            name: 'Technical skills',
            color: '#D9D9D9',
          },
          {
            id: 'Strata',
            name: 'Product : Strata',
            color: '#E3D76B',
          },
          {
            id: 'Prisma',
            name: 'Product : Prisma',
            color: '#DF5609',
          },
          {
            id: 'Cortex',
            name: 'Product : Cortex',
            color: '#BE8848',
          },
          {
            id: 'solution skills',
            name: 'Solution skills',
            color: '#D9D9D9',
          },
          {
            id: 'time allocation',
            name: 'Time allocation',
            color: '#BF7EFF',
          },
          {
            id: 'With product teams',
            name: 'With product teams',
            color: '#FC439C',
          },
          {
            id: 'With customers',
            name: 'With customers',
            color: '#D9D9D9',
          },
          {
            id: 'With Systems or admin',
            name: 'With Systems / admin',
            color: '#D9D9D9',
          },
          {
            id: 'Emails or meetings',
            name: 'Emails / meetings',
            color: '#D9D9D9',
          },
          {
            id: 'Followup Ratio',
            name: 'Followup Ratio',
            color: '#D9D9D9',
          },
          {
            id: 'Prospect',
            name: 'Prospect calls',
            color: '#D9D9D9',
          },
          {
            id: 'Demos',
            name: 'Demos',
            color: '#D9D9D9',
          },
        ],
        type: 'sankey',
        name: 'Sankey',
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />{' '}
    </div>
  );
};

export default Sankey;
