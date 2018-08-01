import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Clearfix,
   Well, Tooltip, OverlayTrigger,
   ProgressBar, Tabs, Tab, Modal, Glyphicon  } from "react-bootstrap";
import Card from '../Card';
import HistoryTable from '../HistoryTable';
import Skew from '../Skew';
import AdminTable from '../AdminTable';
import RecycleBinTable from '../RecycleBinTable';
const ADMIN = window.ADMIN;
import LabelInfo from '../LabelInfo';
const CODEBOOK_URL = window.CODEBOOK_URL;
class Smart extends React.Component {

  constructor(props){
    super(props);
    this.getPDF = this.getPDF.bind(this);
    this.toggleCodebook = this.toggleCodebook.bind(this);
    this.state = {
      codebook_open: false
    }
  }

  //This opens/closes the codebook module
  toggleCodebook(){
    this.setState({codebook_open: !this.state.codebook_open});
  }


  //This renders the PDF in the modal if one exists for the project
  getPDF()
  {
    if(CODEBOOK_URL != "")
    {
      return (
        <div className="codebook-div">
          <Button onClick={this.toggleCodebook} className="codebook-btn">Codebook</Button>
          <Modal show={this.state.codebook_open} onHide={this.toggleCodebook}>
            <Modal.Header closeButton>
              <Modal.Title>Codebook</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <embed
                type="application/pdf"
                src={CODEBOOK_URL}
                id="pdf_document"
                width="100%"
                height="100%"
            />
            </Modal.Body>
          </Modal>
        </div>
      );
    }
    else {
      return null;
    }
  }

  componentWillMount() {
    this.props.fetchCards();
  }

  render(){
    const { message, cards, passCard, annotateCard,
    history_data, getHistory, changeLabel,
    changeToSkip, getUnlabeled, unlabeled_data,
    skewLabel, getLabelCounts, label_counts, getAdmin, admin_data,
    adminLabel, discardData, getDiscarded, discarded_data,
    restoreData} = this.props;

    var labels = [];
    var progress = 100;
    var start_card = 0;
    var num_cards = 0;
    var label = "Complete";
    if(!(cards === undefined) && cards.length > 0)
    {
        num_cards = cards[cards.length-1].id + 1;
        start_card = cards[0].id + 1;
        progress = (cards[0].id/cards[cards.length-1].id) * 100;
        label = start_card.toString()+" of "+num_cards.toString();
    }
    if (!(cards === undefined) && cards.length > 0) {
      //just get the labels from the cards
      labels = cards[0].options;

      var card = (
      <Card className="full" key={cards[0].id}>
          <h2>Card {cards[0].id + 1}</h2>
          <p>
              { cards[0].text['text'] }
          </p>
          <ButtonToolbar bsClass="btn-toolbar pull-right">
              {cards[0].options.map( (opt) => (
                <OverlayTrigger
                key={opt['pk']+"__"+cards[0].id+"__tooltip"}
                placement = "top"
                overlay={
                  <Tooltip id="skip_tooltip">
                    {opt['description']}
                  </Tooltip>
                }>
                <Button onClick={() => annotateCard(cards[0], opt['pk'])}
                bsStyle="primary"
                key={`deck-button-${opt['name']}`}>{opt['name']}</Button>
                </OverlayTrigger>
              ))}
              <OverlayTrigger
              placement = "top"
              overlay={
                <Tooltip id="skip_tooltip">
                  Clicking this button will send this document to an administrator for review
                </Tooltip>
              }>
                <Button onClick={() => passCard(cards[0])}
                bsStyle="info">Skip</Button>
              </OverlayTrigger>
          </ButtonToolbar>
          <Clearfix />
      </Card>);
    }
    else {
        let blankDeckMessage = (message) ? message : "No more data to label at this time. Please check back later";
        card = (
            <Well bsSize="large">
                { blankDeckMessage }
            </Well>
        );
    }

    return (
      <Tabs defaultActiveKey={1} id="data_tabs" >
        <Tab eventKey={1} title="Annotate Data" className="full card">
        <div className="cardContent">
          {this.getPDF()}
          <ProgressBar>
            <ProgressBar
            style={{minWidth: 60}}
            label={label}
            now={progress}/>
          </ProgressBar>
          <LabelInfo
            labels={labels}
          />
          {card}
        </div>
        </Tab>
        <Tab eventKey={2} title="History" className="full card">
          <div className="cardContent">
            <HistoryTable
              getHistory={getHistory}
              history_data={history_data}
              labels={labels}
              changeLabel={changeLabel}
              changeToSkip={changeToSkip}
            />
          </div>
        </Tab>
        <Tab eventKey={3} disabled={!ADMIN} title="Fix Skew" className="full card">
          <div className="cardContent">
            <Skew
            getUnlabeled={getUnlabeled}
            unlabeled_data={unlabeled_data}
            labels={labels}
            skewLabel={skewLabel}
            getLabelCounts={getLabelCounts}
            label_counts={label_counts}
            />
          </div>
        </Tab>
        <Tab eventKey={4} disabled={!ADMIN} title="Skipped Cards" className="full card">
          <div className="cardContent">
            <AdminTable
            getAdmin={getAdmin}
            admin_data={admin_data}
            labels={labels}
            adminLabel={adminLabel}
            discardData={discardData}
            />
          </div>
        </Tab>
        <Tab eventKey={5} disabled={!ADMIN} title={<Glyphicon glyph="trash"/>} className="full card">
          <div className="cardContent">
            <RecycleBinTable
            getDiscarded = {getDiscarded}
            discarded_data = {discarded_data}
            restoreData = {restoreData}
            />
          </div>
        </Tab>
      </Tabs>
    );

  };
}
Smart.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    message: PropTypes.string,
    history_data: PropTypes.arrayOf(PropTypes.object),
    getHistory: PropTypes.func.isRequired,
    labels: PropTypes.arrayOf(PropTypes.object),
    changeLabel: PropTypes.func.isRequired,
    changeToSkip: PropTypes.func.isRequired,
    getUnlabeled: PropTypes.func.isRequired,
    unlabeled_data: PropTypes.arrayOf(PropTypes.object),
    label_counts: PropTypes.arrayOf(PropTypes.object),
    skewLabel: PropTypes.func.isRequired,
    getLabelCounts: PropTypes.func.isRequired,
    getAdmin: PropTypes.func.isRequired,
    admin_data: PropTypes.arrayOf(PropTypes.object),
    adminLabel: PropTypes.func.isRequired,
    discardData: PropTypes.func.isRequired,
    restoreData: PropTypes.func.isRequired,
    getDiscarded: PropTypes.func.isRequired,
    discarded_data: PropTypes.arrayOf(PropTypes.object),
    fetchCards: PropTypes.func.isRequired,
    annotateCard: PropTypes.func.isRequired,
    passCard: PropTypes.func.isRequired,
    popCard: PropTypes.func.isRequired,
};

export default Smart;
