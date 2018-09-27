import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import HwttlTable from './HwttlTable.jsx';
import JzxttlTable from './JzxttlTable.jsx';
import MtkbnlTable from './MtkbnlTable.jsx';
import DckbslTable from './DckbslTable.jsx';
import BmaxttlTable from './BmaxttlTable.jsx';
import MttgnlsydTable from './MttgnlsydTable.jsx';
import CbzgpjtsTable from './CbzgpjtsTable.jsx';
import DdsrTable from './DdsrTable.jsx';
import LsgkdjTable from './LsgkdjTable.jsx';
import AqsgswrsTable from './AqsgswrsTable.jsx';
import JxztpjTable from './JxztpjTable.jsx';



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, width:600, maxWidth: 500 }}>
      {props.children}
    </Typography>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="绩效总体评价"/>
            <Tab label="港口货物吞吐量" />
            <Tab label="港口集装箱吞吐量" />
            <Tab label="码头靠泊能力" />
            <Tab label="港口连通性" />
            <Tab label="港口岸线利用率" />
            <Tab label="港口通过能力适应度" />
            <Tab label="港口作业效率" />
            <Tab label="港口经济贡献" />
            <Tab label="绿色港口等级" />
            <Tab label="港口安全生产水平" />
          </Tabs>
        </AppBar>
        {value === 0 && <JxztpjTable/> }
        {value === 1 && <HwttlTable/>}
        {value === 2 && <JzxttlTable/>}
        {value === 3 && <MtkbnlTable/>}
        {value === 4 && <DckbslTable/>}
        {value === 5 && <BmaxttlTable/>}
        {value === 6 && <MttgnlsydTable/>}
        {value === 7 && <CbzgpjtsTable/>}
        {value === 8 && <DdsrTable/>}
        {value === 9 && <LsgkdjTable/>}
        {value === 10 && <AqsgswrsTable/>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);