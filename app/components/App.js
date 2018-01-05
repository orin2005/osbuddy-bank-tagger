import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, Button, FormControl } from 'react-bootstrap';
import fs from 'fs';

import Item from './Item';

import items from './constants';


export default class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      unselectedItems: [],
      selectedItems: [],
      tag: 'generatedTag',
      searchText: 'test'
    };

    this.handleClick = this.handleClick.bind(this);
    this.exportTag = this.exportTag.bind(this);
    this.searchItems = this.searchItems.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleClick(item) {
    console.log(item);
    const arr = [];
    this.state.selectedItems.forEach( d=> arr.push(d));
    arr.push(item);
    items.splice(items.indexOf(item),1);
    this.setState({selectedItems: arr});
  }

  exportTag( tagName="generatedTag" ) {

    let allIds = this.state.selectedItems.map( si => '{\\\"id\\\":' + si.id + '}');
    allIds.slice(0, allIds.length-1);

    fs.writeFile("C:/Users/developer/Desktop/" + this.state.tag + ".txt", '{\"enabled\":{\"type\":\"hidden\",\"value\":\"true\"},\"tags\":{\"type\":\"hidden\",\"value\":\"[{\\\"tag\\\":\\\"' + this.state.tag + '\\\",\\\"ids\\\":[' + allIds + ']}]\"}}', function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    });

  }


  handleTextChange(evt) {
    this.setState({ tag: evt.target.value });
    console.log(this.state.tag)
  }

  filterItems(str)
  {
    return str.name.toLowerCase().includes(this.state.searchText.toLowerCase());
  }

  searchItems() {
    this.setState({unselectedItems : items.filter((str) => str.name.toLowerCase().includes(this.state.searchText.toLowerCase()) && true)});
  }  

  handleSearchTextChange(evt) {
    this.setState({ searchText: evt.target.value });
    console.log(this.state.searchText);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <div className={'items-box'}>
              <Row>
                {this.state.unselectedItems.map(d =>
                  (<Col
                    key={d.id}
                    xs={3}
                    onClick={evt => this.handleClick(d)}>
                    <Item item={d} />
                  </Col>)
                )}
              </Row>
            </div>
          </Col>          
          <Col xs={2} />
          <Col xs={6}>
            <div className={'items-box'}>
              <Row>
                {this.state.selectedItems.map( d =>
                  (<Col
                    key={d.id}
                    xs={3}>
                  <Item item={d} />
                </Col>))}
              </Row>
            </div>
          </Col>
          <Col xs={1} />
        </Row>
        <Row>
          <Col xs={1} />
          <Col xs={5}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <FormControl type="text" placeholder="Enter text to search" onChange={(evt) => this.handleSearchTextChange(evt)} />
              </FormGroup>
              {' '}
              <Button onClick={e=>this.searchItems()}>
                Search
              </Button>
            </Form>
          </Col>
          <Col xs={1} />
          <Col xs={5}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <FormControl type="text" placeholder="Tag name" onChange={(evt) => this.handleTextChange(evt)} />
              </FormGroup>
              {' '}
              <Button onClick={e=>this.exportTag()}>
                Export tag
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>          
        </Row>
      </Grid>
    );
  }
}
