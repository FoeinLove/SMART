import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import {Button, ButtonToolbar, Tooltip, OverlayTrigger} from "react-bootstrap";

class RecycleBinTable extends React.Component {

  componentWillMount() {
      this.props.getDiscarded();
  }

  render() {
  const {discarded_data, restoreData} = this.props;

  if(discarded_data && discarded_data.length > 0)
  {
    var table_data = discarded_data[0];
  }
  else {
    table_data = [];
  }

  const columns = [
    {
      Header: "id",
      accessor: "id",
      show: false
    },
    {
      Header: "Discarded Data",
      accessor: "data",
      filterMethod: (filter, row) => {
        if(String(row["data"]).toLowerCase().includes(filter.value.toLowerCase()))
        {
          return true;
        }
        else {
          return false;
        }
      }
    }
  ];

  return (
    <div>
    <h3>Instructions</h3>
    <p>This page displays all data that has been discarded by an admin.</p>
    <p>All data in this table has been removed from the set of unlabeled data to be predicted, and will not be assigned to anyone for labeling.</p>
    <p>To add a datum back into the project, click the Restore button next to the datum.</p>
    <ReactTable
      data={table_data}
      columns={columns}
      pageSizeOptions={[1,5,10,20,30,50,100]}
      defaultPageSize={1}
      filterable={true}
      SubComponent={row => {
        return (
          <div className="sub-row">
            <p id="disc_text">{row.row.data}</p>
            <div id="disc_buttons">
              <ButtonToolbar bsClass="btn-toolbar pull-right">
              <OverlayTrigger
                placement = "top"
                overlay={
                  <Tooltip id="discard_tooltip">
                    This will add this data back into the project active data.
                  </Tooltip>
                }>
                <Button onClick = {() => restoreData(row.row.id)}
                bsStyle="primary">Restore</Button>
              </OverlayTrigger>
              </ButtonToolbar>
            </div>
          </div>
        );
      }}
    />
    </div>
  );
  }
}

RecycleBinTable.propTypes = {
  getDiscarded: PropTypes.func.isRequired,
  discarded_data: PropTypes.arrayOf(PropTypes.object),
  restoreData: PropTypes.func.isRequired
};

export default RecycleBinTable;
